import { useState, useEffect } from 'react';

import CodeEditor from './Code-editor';
import Preview from './Preview';
import Resizable from './Resizable';

import bundler from '../bundler';''

const CodeCellStyles: React.CSSProperties = {
    height: '100%',
    display: 'flex',
    flexDirection: 'row'
}

const BUNDLER_DELAY = 1500;

function CodeCell() {
    const [code, setCode] = useState<string>('');
    const [input, setInput] = useState<string>('')

    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundler(input);
            setCode(output);
        }, BUNDLER_DELAY);

        return () => {
            clearTimeout(timer);
        }
    }, [input, code]);

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
