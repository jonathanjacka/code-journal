import './Cell-list.css';

import { useTypedSelector } from '../hooks/useTypedSelector';
import { Fragment } from 'react';

import AddCell from './Add-cell';

import CellListItem from './Cell-list-item';

const CellList: React.FC = () => {
    
    const { data, order } = useTypedSelector((state) => state.cells);
    const cells = order.map((id) => data[id]);

    const renderedCells = cells.map((cell) => 
      <Fragment key={cell.id}>
        <CellListItem cell={cell} />
        <AddCell previousCellId={cell.id} /> 
      </Fragment>
      
    );

  return (
    <div className='cell-list'>
      <AddCell previousCellId={null} forceVisible={cells.length === 0}/>
      {renderedCells}
    </div>
  )
}

export default CellList;
