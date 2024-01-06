import { Cell } from '../state';
import CodeCell from './Code-cell';
import TextEditor from './Text-editor';
import ActionBar from './Action-bar';

import './Cell-list-item.css';

interface CellListItemProps {
    cell: Cell
}

const CellListItem: React.FC<CellListItemProps> = ({cell}) => {
    let child: JSX.Element;
    if (cell.type === 'code') {
        child = 
        <>
            <div className="action-bar-wrapper">
                <ActionBar id={cell.id}/>
            </div>
            <CodeCell cell={cell}/> 
        </>
    } else {
        child = 
        <>
            <TextEditor cell={cell}/>
            <ActionBar id={cell.id}/>
        </>
    }

  return (
    <div className='cell-list-item'>
        {child}
    </div>
  )
}

export default CellListItem;
