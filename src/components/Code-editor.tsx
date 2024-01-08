import { useRef } from "react";
import Editor, { type OnMount } from "@monaco-editor/react";
import { editor as monacoEditor } from 'monaco-editor';

import prettier from 'prettier/standalone';
import babelPlugin from "prettier/plugins/babel";
import estreePlugin from "prettier/plugins/estree";

import './Code-editor.css';

interface CodeEditorProps {
    height?: string,
    defaultLanguage?: string,
    defaultValue?: string,
    darkMode?: boolean,
    onChange?: (value: string) => void
}

const CodeEditor = ({height, defaultLanguage, defaultValue, darkMode, onChange}: CodeEditorProps) => {

    const editorRef = useRef<monacoEditor.IStandaloneCodeEditor | null>(null);

    const onEditorDidMount: OnMount = (editor) => {
        editorRef.current = editor;
        editor.onDidChangeModelContent(() => {
            onChange && onChange(editor.getValue());
        }); 
    }

    const onFormatClick = async () => {
        if(editorRef.current) {
            const unformatted = editorRef.current.getModel()?.getValue();
            const formatted = await prettier.format(unformatted || '', {
                parser: 'babel',
                plugins: [babelPlugin, estreePlugin],
                useTabs: false,
                semi: true,
                singleQuote: true
            });
            editorRef.current.setValue(formatted.replace(/\n$/, ''));      
        }
    }

  return (
    <div className="editor-wrapper">
            <button className="button button-format is-primary is-small" onClick={onFormatClick}>Format</button>
      <Editor
        onMount={onEditorDidMount}
        height={height ? height :'100%'} 
        defaultLanguage={defaultLanguage ? defaultLanguage : 'javascript'} 
        defaultValue={defaultValue ? defaultValue : "// write some javascript code..."}
        theme={darkMode === false ? 'light' : 'vs-dark'}
        options={
            {
                tabSize: 2,
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
