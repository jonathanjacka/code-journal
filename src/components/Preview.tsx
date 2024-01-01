import { useEffect, useRef } from 'react';
import './Preview.css';

interface PreviewProps {
    code: string,
}

const html = `
<html>
  <head>
    <style>html { background-color: white; }</style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      window.addEventListener('message', (event) => {
        try{
          eval(event.data);
        }catch(err){
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
          console.error(err);
        }
      }, false);
    </script>
</html>
`;

const Preview: React.FC<PreviewProps> = ({code }) => {

    const iframeRef = useRef<HTMLIFrameElement>(null); 
    
    useEffect(() => {
        iframeRef.current && (iframeRef.current.srcdoc = html);
        if(iframeRef.current && iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.postMessage(code, '*')
          }  
    }, [code]);


  return (
    <div className="preview-wrapper">
      <iframe title='preview' ref={iframeRef} sandbox='allow-scripts' srcDoc={html}/>
    </div>
    
  )
}

export default Preview
