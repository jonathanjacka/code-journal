import { useActions } from '../hooks/useActions';

import './Add-cell.css';

interface AddCellProps {
    nextCellId: string | null;
    forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ( {nextCellId, forceVisible} ) => {
    const { insertCellBefore } = useActions();

    return (
        <div className={`add-cell ${forceVisible && "force-visible"}`}>
            <button className={`button is-rounded is-small ${forceVisible ? "is-primary" : "is-secondary"}`} onClick={() => insertCellBefore(nextCellId, 'code')}>+ Code</button>
            <button className={`button is-rounded is-small ${forceVisible ? "is-primary" : "is-secondary"}`} onClick={() => insertCellBefore(nextCellId, 'text')}>+ Text</button>
            <div className="divider"></div>
        </div>
    )
}

export default AddCell;
