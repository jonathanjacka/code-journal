import { useActions } from "../hooks/useActions";
import ActionBarIcon from "./Action-bar-icon";

interface ActionBarProps {
    id: string,
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {

    const { moveCell, deleteCell } = useActions();

  return (
    <div>
        <ActionBarIcon onClick={() => moveCell(id, 'up')} iconClassName='fas fa-arrow-up'/>
        <ActionBarIcon onClick={() => moveCell(id, 'down')} iconClassName='fas fa-arrow-down'/>
        <ActionBarIcon onClick={() => {deleteCell(id)}} iconClassName='fas fa-times'/>
    </div>);
    
}

export default ActionBar;
