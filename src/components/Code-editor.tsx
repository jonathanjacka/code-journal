import Editor from "@monaco-editor/react";

interface CodeEditorProps {
    height?: string,
    defaultLanguage?: string,
    defaultValue?: string,
    darkMode?: boolean

  }

const CodeEditor = ({height, defaultLanguage, defaultValue, darkMode}: CodeEditorProps) => {
  return (
    <div>
      <Editor 
        height={height ? height :'500px'} 
        defaultLanguage={defaultLanguage ? defaultLanguage : 'javascript'} 
        defaultValue={defaultValue ? defaultValue : "// write some javascript code..."}
        theme={darkMode === false ? 'light' : 'vs-dark'}
        />
    </div>
  );
};

export default CodeEditor;
