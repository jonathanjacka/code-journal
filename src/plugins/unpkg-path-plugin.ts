import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
    name: 'filecache'
});
 
export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: esbuild.OnResolveArgs) => {
        console.log('onResolve', args);

        if(args.path === 'index.js') {
            return { path: args.path, namespace: 'a' };
        } 

        //handles relative and nested paths in a module
        if(args.path.includes('./') || args.path.includes('../')) {
            return {
                namespace: 'a',
                path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
            };
        }
        
        return {
            namespace: 'a',
            path: `https://unpkg.com/${args.path}`
        };
        
      });
 
      build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
        console.log('onLoad', args);
 
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              const message = require('nested-test-pkg');
              console.log(message);
            `,
          };
        } 

        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path); 

        if(cachedResult) {
            return cachedResult;
        }

        const response = await axios.get(args.path);
        const result: esbuild.OnLoadResult = {
            loader: 'jsx',
            contents: response.data,
            resolveDir: new URL('./', response.request.responseURL).pathname
        }

        await fileCache.setItem(args.path, result);
        return result;
        
      });
    },
  };
};