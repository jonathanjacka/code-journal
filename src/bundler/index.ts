import esbuild from 'esbuild-wasm';

import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

let startService: boolean = false;

const bundler = async (inputCode: string) => {
    if(!startService){
        await esbuild.initialize({
            wasmURL: 'https://unpkg.com/esbuild-wasm/esbuild.wasm'
          })
        startService = true;
    }

    const result = await esbuild.build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [
          unpkgPathPlugin(),
          fetchPlugin(inputCode)
        ],
        define: {
          'process.env.NODE_ENV': '"production"',
          global: 'window'
        }
      }); 

      return result.outputFiles[0].text;
}

export default bundler;