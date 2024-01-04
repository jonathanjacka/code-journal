import { Cell } from '../state';

interface CellListItemProps {
    cell: Cell
}

const CellListItem: React.FC<CellListItemProps> = ({cell}) => {
  return (
    <div>
      <div>Cell list item</div>
    </div>
  )
}

export default CellListItem;
