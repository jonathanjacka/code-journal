import Editor, { type OnMount } from "@monaco-editor/react";

interface CodeEditorProps {
    height?: string,
    defaultLanguage?: string,
    defaultValue?: string,
    darkMode?: boolean,
    onChange?: (value: string) => void
  }

const CodeEditor = ({height, defaultLanguage, defaultValue, darkMode, onChange}: CodeEditorProps) => {

    const onEditorDidMount: OnMount = (editor) => {
        editor.onDidChangeModelContent(() => {
            onChange && onChange(editor.getValue());
        });
        
    }
  return (
    <div>
      <Editor
        onMount={onEditorDidMount}
        height={height ? height :'500px'} 
        defaultLanguage={defaultLanguage ? defaultLanguage : 'javascript'} 
        defaultValue={defaultValue ? defaultValue : "// write some javascript code..."}
        theme={darkMode === false ? 'light' : 'vs-dark'}
        options={
            {
                wordWrap: 'on',
                minimap: { enabled: false },
                showUnused: false,
                folding: false,
                lineNumbersMinChars: 3,
                fontSize: 16,
                scrollBeyondLastLine: false,
                automaticLayout: true
            }
        }
        />
    </div>
  );
};

export default CodeEditor;
