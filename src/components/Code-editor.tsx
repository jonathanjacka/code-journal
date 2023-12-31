import { useRef } from "react";
import Editor, { type OnMount, type Monaco } from "@monaco-editor/react";

import prettier from 'prettier/standalone';
import babelPlugin from "prettier/plugins/babel";
import estreePlugin from "prettier/plugins/estree";

interface CodeEditorProps {
    height?: string,
    defaultLanguage?: string,
    defaultValue?: string,
    darkMode?: boolean,
    onChange?: (value: string) => void
  }

const CodeEditor = ({height, defaultLanguage, defaultValue, darkMode, onChange}: CodeEditorProps) => {

    const editorRef = useRef<any>();

    const onEditorDidMount: OnMount = (editor) => {
        editorRef.current = editor;
        editor.onDidChangeModelContent(() => {
            onChange && onChange(editor.getValue());
        }); 
    }

    const onFormatClick = async () => {
        const unformatted = editorRef.current.getModel().getValue();
        const formatted = await prettier.format(unformatted, {
            parser: 'babel',
            plugins: [babelPlugin, estreePlugin],
            useTabs: false,
            semi: true,
            singleQuote: true
        });
        editorRef.current.setValue(formatted);
    }

  return (
    <div>
        <div className="format-button">
            <button onClick={onFormatClick}>Format</button>
        </div>
      <Editor
        onMount={onEditorDidMount}
        height={height ? height :'500px'} 
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
