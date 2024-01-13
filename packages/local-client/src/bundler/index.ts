import esbuild from 'esbuild-wasm';

import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';


//Solution to the problem of multiple initializations of esbuild - https://kristiansigston.medium.com/initializing-esbuild-wasm-84a26b405f12
let waiting: Promise<void>;

export const setupBundler = async () => {
  if(!waiting) {
    waiting = esbuild.initialize({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm/esbuild.wasm',
    })
  }
  return waiting;
};


const bundler = async (inputCode: string) => {

      try{
        await waiting;
      }catch(error){
        if(error instanceof Error) {
          console.log(error.message)
        }
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