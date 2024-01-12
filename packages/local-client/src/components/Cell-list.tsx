import './Cell-list.css';
import { useEffect, useRef } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import { Fragment } from 'react';
import AddCell from './Add-cell';
import CellListItem from './Cell-list-item';

const CellList: React.FC = () => {
    
    const { data, order } = useTypedSelector((state) => state.cells);
    const cells = order.map((id) => data[id]);
    const { fetchCells } = useActions();
    const fetchRef = useRef(false);

    useEffect(() => {  
      if(!fetchRef.current) {
        fetchCells();
        fetchRef.current = true;
      }
    }, [fetchCells]);

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
