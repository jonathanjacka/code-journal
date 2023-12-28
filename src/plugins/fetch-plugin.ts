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
            build.onLoad({ filter: /^index\.js$/ }, () => {
                return {
                    loader: 'jsx',
                    contents: input,
                };
            });

            build.onLoad( { filter: /.*/}, async (args: esbuild.OnLoadArgs) => {
                const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path); 

                if(cachedResult) {
                    return cachedResult;
                }
            }); 

            build.onLoad({ filter: /.css$/ }, async (args: esbuild.OnLoadArgs) => {

                const response = await axios.get(args.path);

                const formattedData = response.data
                    .replace(/\n/g, '')
                    .replace(/"/g, '\\"')
                    .replace(/'/g, "\\'");

                const contents =  
                    `
                        const style = document.createElement('style');
                        style.innerText = '${formattedData}';
                        document.head.appendChild(style);
                    `;

                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents,
                    resolveDir: new URL('./', response.request.responseURL).pathname
                }
        
                await fileCache.setItem(args.path, result);
                return result;

            });

            build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
    
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