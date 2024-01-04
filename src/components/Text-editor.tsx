import { useState, useEffect, useRef } from 'react';
import { useActions } from '../hooks/useActions';
import MDEditor from '@uiw/react-md-editor';
import { Cell } from '../state';

import './Text-editor.css';

interface CodeCellProps {
    cell: Cell
}

const TextEditor: React.FC<CodeCellProps> = ( {cell} ) => {

    const { updateCell } = useActions();
    const [editMode, setEditMode ] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if(ref.current && event.target && ref.current.contains(event.target as Node)) {
                return;
            } else {
                setEditMode(false);
            }
        }
        window.addEventListener('click', listener, { capture: true });

        return () => {
            window.removeEventListener('click', listener, { capture: true });
        }
    }, [editMode]);

    if(editMode) {
        return (
            <div ref={ref} className='text-editor'>
                <MDEditor 
                    
                    value={cell.content || 'Click to edit...'}
                    onChange={(value) => updateCell(cell.id, value || '')}
                    style={{color: 'black !important'}}
                />
            </div>
        )
    } else {
        return (
            <div onClick={() => setEditMode(true)} className='text-editor card'>
                <div className="card-content">
                    <MDEditor.Markdown source={cell.content || 'Click to edit...'} />
                </div>
                
            </div>
        )
    }

}

export default TextEditor;
