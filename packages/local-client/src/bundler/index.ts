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

    try {
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
        },
        jsxFactory: '_React.createElement',
        jsxFragment: '_React.Fragment'
      }); 

      return {
        code: result.outputFiles[0].text,
        error: ''
      };
    } catch (error) {
      if(error instanceof Error) {
        return {
          code: '',
          error: error.message
        }
      } else {
        throw error;
      }
      
    }
    
    
}

export default bundler;