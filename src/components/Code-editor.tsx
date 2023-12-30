import Editor from "@monaco-editor/react";

interface CodeEditorProps {
    height?: string,
    defaultLanguage?: string,
    defaultValue?: string
  }

const CodeEditor = ({height, defaultLanguage, defaultValue}: CodeEditorProps) => {
  return (
    <div>
      <Editor 
        height={height ? height :'500px'} 
        defaultLanguage={defaultLanguage ? defaultLanguage : 'javascript'} 
        defaultValue={defaultValue ? defaultValue : "// write some javascript code..."}/>
    </div>
  );
};

export default CodeEditor;
