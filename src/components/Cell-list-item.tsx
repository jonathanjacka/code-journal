import { Cell } from '../state';
import CodeCell from './Code-cell';
import TextEditor from './Text-editor';
import ActionBar from './Action-bar';

interface CellListItemProps {
    cell: Cell
}

const CellListItem: React.FC<CellListItemProps> = ({cell}) => {
    let child: JSX.Element;
    if (cell.type === 'code') {
        child = <CodeCell cell={cell}/>
    } else {
        child = <TextEditor cell={cell}/>
    }

  return (
    <div>
        <ActionBar id={cell.id}/>
        {child}
    </div>
  )
}

export default CellListItem;
