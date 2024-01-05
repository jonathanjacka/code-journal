import { useTypedSelector } from '../hooks/useTypedSelector';
import { Fragment } from 'react';

import AddCell from './Add-cell';

import CellListItem from './Cell-list-item';

const CellList: React.FC = () => {
    
    const { data, order } = useTypedSelector((state) => state.cells);
    const cells = order.map((id) => data[id]);

    const renderedCells = cells.map((cell, idx) => 
      <Fragment key={cell.id}>
        
        <CellListItem cell={cell} />
        {idx < cells.length - 1 ? <AddCell nextCellId={cell.id} /> : <AddCell nextCellId={null} />}
      </Fragment>
      
    );

    if(cells.length === 0) {
      return <AddCell nextCellId={null} forceVisible={true}/>
    }

  return (
    <div>
      {renderedCells}
    </div>
  )
}

export default CellList;
