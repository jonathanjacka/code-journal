import { useState, useEffect, useRef } from 'react';
import esbuild from 'esbuild-wasm';

import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

function App() {

  const serviceInitialized = useRef(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

    if(iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(result.outputFiles[0].text, '*')
    }    //setCode(result.outputFiles[0].text);
  }

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try{
              eval(event.data);
            }catch(err){
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
              console.error(err);
            }
          }, false);
        </script>
    </html>
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
      {/* <pre>{code}</pre> */}
      <iframe ref={iframeRef} sandbox='allow-scripts' srcDoc={html}></iframe>
    </div>

  )
}

export default App
