import { useState, useEffect, useRef } from 'react';
import esbuild from 'esbuild-wasm';

import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

import CodeEditor from './components/Code-editor';
import Preview from './components/Preview';

import 'bulmaswatch/united/bulmaswatch.min.css';

function App() {

  const serviceInitialized = useRef(false);

  const [code, setCode] = useState<string>('');
  const [input, setInput] = useState<string>('')

  const startService = async () => {
    await esbuild.initialize({
      wasmURL: 'https://unpkg.com/esbuild-wasm/esbuild.wasm'
    })
  }

  useEffect(() => {
    if(!serviceInitialized.current) {
      startService();
      serviceInitialized.current = true;
    }
  }, []);

  const onSubmit = async () => {
    if(!serviceInitialized.current) {
      return;
    }

    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [
        unpkgPathPlugin(),
        fetchPlugin(input)
      ],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      }
    });  
    setCode(result.outputFiles[0].text);
  }

  return (
    <div>
      <CodeEditor onChange={(value) => setInput(value)}/>
        <div>
          <button onClick={onSubmit}>Submit</button>
        </div>
      <Preview code={code}/>
    </div>

  )
}

export default App
