import { useState, useEffect } from 'react';
import { useActions } from '../hooks/useActions';
import CodeEditor from './Code-editor';
import Preview from './Preview';
import Resizable from './Resizable';
import { Cell } from '../state';

import bundler from '../bundler';''

const CodeCellStyles: React.CSSProperties = {
    height: '100%',
    display: 'flex',
    flexDirection: 'row'
}

interface CodeCellProps {
    cell: Cell
}

const BUNDLER_DELAY = 1500;

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {

    const { updateCell } = useActions();

    const [code, setCode] = useState<string>('');
    const [bundleStatus, setBundleStatus] = useState<string>('');

    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundler(cell.content);
            setCode(output.code);
            setBundleStatus(output.error);
        }, BUNDLER_DELAY);

        return () => {
            clearTimeout(timer);
        }
    }, [cell.content]);

    return (
        <Resizable direction='vertical'>
            <div style={CodeCellStyles}>
                <Resizable direction='horizontal'>
                    <CodeEditor defaultValue={cell.content} onChange={(value) => updateCell(cell.id, value)}/>
                </Resizable>
                <Preview code={code} bundleStatus={bundleStatus}/>
            </div>
        </Resizable>
  )
}

export default CodeCell;
