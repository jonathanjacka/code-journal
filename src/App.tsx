import { useState, useEffect, useRef } from 'react';
import esbuild from 'esbuild-wasm';

import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

function App() {

  const serviceInitialized = useRef(false);

  const [input, setInput] = useState<string>('')
  const [code, setCode] = useState<string>('')

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    serviceInitialized.current && setCode(input);

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

  const html = `
    <script>
      ${code}
    </script>
  `;

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="text-area">Input:</label>
        </div>
        <textarea name="text-area" id="text-area" value={input} onChange={e => setInput(e.target.value)}/>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <pre>{code}</pre>
      <iframe sandbox='allow-scripts' srcDoc={html}></iframe>
    </div>

  )
}

export default App
