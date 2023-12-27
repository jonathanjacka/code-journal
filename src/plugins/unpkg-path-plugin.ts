import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
 
export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: esbuild.OnResolveArgs) => {
        console.log('onResolve', args);

        if(args.path === 'index.js') {
            return { path: args.path, namespace: 'a' };
        } else if (args.path === 'tiny-test-pkg') {
            return {
                namespace: 'a',
                path: 'https://unpkg.com/tiny-test-pkg@1.0.0/index.js'
            }

        }
        
      });
 
      build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
        console.log('onLoad', args);
 
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              const message = require('tiny-test-pkg');
              console.log(message);
            `,
          };
        } 

        const result = await axios.get(args.path);
        return {
            loader: 'jsx',
            contents: result.data
        }
        
      });
    },
  };
};