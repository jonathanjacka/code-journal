import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

const TextEditor: React.FC = () => {

    const [MDvalue, setMDValue] = useState<string | undefined>('# EditMode');
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
            <div ref={ref}>
                <MDEditor 
                    value={MDvalue}
                    onChange={setMDValue}
                />
            </div>
        )
    } else {
        return (
            <div onClick={() => setEditMode(true)}>
                <MDEditor.Markdown source={MDvalue} />
            </div>
        )
    }

}

export default TextEditor;
