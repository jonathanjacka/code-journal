import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
    name: 'filecache'
});

export const fetchPlugin = (input: string) => {
    return {

        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild) {
            build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
 
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
        }
    }
}