import { useEffect } from 'react';
import { useActions } from '../hooks/useActions';
import CodeEditor from './Code-editor';
import Preview from './Preview';
import Resizable from './Resizable';
import { Cell } from '../state';
import { useTypedSelector } from '../hooks/useTypedSelector';

const CodeCellStyles: React.CSSProperties = {
    height: 'calc(100% - 10px)',
    display: 'flex',
    flexDirection: 'row'
}

interface CodeCellProps {
    cell: Cell
}

const BUNDLER_DELAY = 1500;

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {

    const { updateCell, createBundle } = useActions();
    const bundle = useTypedSelector((state) => state.bundles[cell.id]);
    console.log(bundle);

    useEffect(() => {
        const timer = setTimeout(async () => {
            createBundle(cell.id, cell.content);
        }, BUNDLER_DELAY);

        return () => {
            clearTimeout(timer);
        }
    }, [cell.id, cell.content, createBundle]);

    return (
        <Resizable direction='vertical'>
            <div style={CodeCellStyles}>
                <Resizable direction='horizontal'>
                    <CodeEditor defaultValue={cell.content} onChange={(value) => updateCell(cell.id, value)}/>
                </Resizable>
                {bundle && <Preview code={bundle.code} bundleStatus={bundle.error}/>}
            </div>
        </Resizable>
  )
}

export default CodeCell;
