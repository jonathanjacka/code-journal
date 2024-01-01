import { useState } from 'react';

import CodeEditor from './Code-editor';
import Preview from './Preview';
import Resizable from './Resizable';

import bundler from '../bundler';''

const CodeCellStyles: React.CSSProperties = {
    height: '100%',
    display: 'flex',
    flexDirection: 'row'
}

function CodeCell() {
    const [code, setCode] = useState<string>('');
    const [input, setInput] = useState<string>('')

    const onSubmit = async () => {
        const output = await bundler(input);
        setCode(output);
    }

    return (
        <Resizable direction='vertical'>
            <div style={CodeCellStyles}>
                <Resizable direction='horizontal'>
                    <CodeEditor onChange={(value) => setInput(value)}/>
                </Resizable>
                <Preview code={code}/>
            </div>
        </Resizable>
  )
}

export default CodeCell;
