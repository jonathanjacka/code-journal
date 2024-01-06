import { useActions } from '../hooks/useActions';

import './Add-cell.css';

interface AddCellProps {
    previousCellId: string | null;
    forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ( {previousCellId, forceVisible} ) => {
    const { insertCellAfter } = useActions();

    return (
        <div className={`add-cell ${forceVisible && "force-visible"}`}>
            <button className={`button is-rounded is-small ${forceVisible ? "is-primary" : "is-secondary"}`} onClick={() => insertCellAfter(previousCellId, 'code')}>+ Code</button>
            <button className={`button is-rounded is-small ${forceVisible ? "is-primary" : "is-secondary"}`} onClick={() => insertCellAfter(previousCellId, 'text')}>+ Text</button>
            <div className="divider"></div>
        </div>
    )
}

export default AddCell;
