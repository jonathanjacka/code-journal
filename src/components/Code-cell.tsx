import './Code-cell.css';
import { useEffect, useCallback } from 'react';
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
    const { data, order } = useTypedSelector((state) => state.cells);

    const cumulativeCode = useCallback(() => {
        const orderedCells = order.map(id => data[id]);
        const cumulativeCode = [
            `
                import _React from 'react';
                import _ReactDOM from 'react-dom';
                const show = (value) => {
                    const root = document.querySelector('#root');
                    if(typeof value === 'object'){
                        if(value.$$typeof && value.props){
                            _ReactDOM.render(value, root);
                        }else{
                            root.innerHTML = JSON.stringify(value);
                        }
                    }else{
                        root.innerHTML = value;
                    }
                }
            `
        ];
        for(const c of orderedCells){
            if(c.type === 'code'){
                cumulativeCode.push(c.content);
            }
            if(c.id === cell.id){
                break;
            }
        }
        return cumulativeCode;
    }, [order, data, cell.id]);

    useEffect(() => {
        const timer = setTimeout(async () => {
            createBundle(cell.id, cumulativeCode().join('\n'));
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
