import { useState, useEffect, useRef } from 'react';
import esbuild from 'esbuild-wasm';

function App() {

  const serviceInitialized = useRef(false);

  const [input, setInput] = useState<string>('')
  const [code, setCode] = useState<string>('')

  const startService = async () => {
    await esbuild.initialize({
      wasmURL: '/esbuild.wasm'
    })
    console.log('esbuild initialized');
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
    console.log(input);

    const result = await esbuild.transform(input, {
      loader: 'jsx',
      target: 'es2015'
    });
    
    setCode(result.code);
  }

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
    </div>

  )
}

export default App
