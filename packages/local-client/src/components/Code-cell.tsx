import './Code-cell.css';
import { useEffect } from 'react';
import { useActions } from '../hooks/useActions';
import CodeEditor from './Code-editor';
import Preview from './Preview';
import Resizable from './Resizable';
import { Cell } from '../state';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useCumulativeCode } from '../hooks/useCumulativeCode';

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
    const cumulativeCode = useCumulativeCode(cell.id);
    
    useEffect(() => {
        const timer = setTimeout(async () => {
            createBundle(cell.id, cumulativeCode());
        }, BUNDLER_DELAY);
        return () => {
            clearTimeout(timer);
        }
    }, [ cell.id, cumulativeCode, createBundle ]);

    return (
        <Resizable direction='vertical'>
            <div style={CodeCellStyles}>
                <Resizable direction='horizontal'>
                    <CodeEditor defaultValue={cell.content} onChange={(value) => updateCell(cell.id, value)}/>
                </Resizable>
                <div className='progress-wrapper'>
                {!bundle || bundle.loading ? 
                   ( 
                        <div className="progress-cover">
                            <progress className='progress is-small is-primary' max="100">
                                Loading    
                            </progress>   
                        </div>
                   )
                    :
                    (<Preview code={bundle.code} bundleStatus={bundle.error}/>)
                }
                </div> 
            </div>
        </Resizable>
  )
}

export default CodeCell;
