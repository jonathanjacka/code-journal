import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
    name: 'filecache'
});
 
export const unpkgPathPlugin = (input: string) => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
        //handle root entry file of index.js
        build.onResolve({ filter: /(^index\.js$)/ }, () => {
            return { path: 'index.js', namespace: 'a' };
        });
        //handle relative paths in a module
        build.onResolve({ filter: /^\.+\// }, (args: esbuild.OnResolveArgs) => {
            return {
                namespace: 'a',
                path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
            };
        });
        //handle main file of a module
        build.onResolve({ filter: /.*/ }, async (args: esbuild.OnResolveArgs) => {
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
            contents: input,
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