import { useTypedSelector } from '../hooks/useTypedSelector';
import { Fragment } from 'react';

import AddCell from './Add-cell';

import CellListItem from './Cell-list-item';

const CellList: React.FC = () => {
    
    const { data, order } = useTypedSelector((state) => state.cells);
    const cells = order.map((id) => data[id]);

    const renderedCells = cells.map((cell) => 
      <Fragment key={cell.id}>
        <AddCell nextCellId={cell.id} /> 
        <CellListItem cell={cell} />
      </Fragment>
      
    );

  return (
    <div>
      {renderedCells}
      <AddCell nextCellId={null} forceVisible={cells.length === 0}/>
    </div>
  )
}

export default CellList;
