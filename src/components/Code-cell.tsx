import { useState } from 'react';

import CodeEditor from './Code-editor';
import Preview from './Preview';
import Resizable from './Resizable';

import bundler from '../bundler';

function CodeCell() {
    const [code, setCode] = useState<string>('');
    const [input, setInput] = useState<string>('')

    const onSubmit = async () => {
        const output = await bundler(input);
        setCode(output);
    }

    return (
        <Resizable direction='vertical'>
            <div>
            <CodeEditor onChange={(value) => setInput(value)}/>
                <div>
                <button onClick={onSubmit}>Submit</button>
                </div>
            <Preview code={code}/>
            </div>
        </Resizable>
  )
}

export default CodeCell;
