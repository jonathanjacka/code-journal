import { useState } from 'react';

import CodeEditor from './components/Code-editor';
import Preview from './components/Preview';

import bundler from './bundler';

import 'bulmaswatch/united/bulmaswatch.min.css';

function App() {

  const [code, setCode] = useState<string>('');
  const [input, setInput] = useState<string>('')

  const onSubmit = async () => {
    const output = await bundler(input);
    setCode(output);
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
