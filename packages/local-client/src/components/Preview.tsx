import { useEffect, useRef } from 'react';
import './Preview.css';

interface PreviewProps {
    code: string,
    bundleStatus: string
}

const html = `
<html>
  <head>
    <style>html { background-color: white; }</style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      const handleError = (error) => {
        const root = document.querySelector('#root');
        root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + error + '</div>';
        console.error(error);
      }

      window.addEventListener('error', (event) => {
        event.preventDefault();
        handleError(event.error);
      });

      window.addEventListener('message', (event) => {
        try{
          eval(event.data);
        }catch(error){
          handleError(error);
        }
      }, false);
    </script>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code, bundleStatus }) => {

    const iframeRef = useRef<HTMLIFrameElement>(null); 
    
    useEffect(() => {
        iframeRef.current && (iframeRef.current.srcdoc = html);
        if(iframeRef.current && iframeRef.current.contentWindow) {
            //Allows browser to render iframe before sending message
            setTimeout(() => {
                iframeRef.current && iframeRef.current.contentWindow?.postMessage(code, '*');
            }, 50);
          }  
    }, [code]);


  return (
    <div className="preview-wrapper">
      <iframe title='preview' ref={iframeRef} sandbox='allow-scripts' srcDoc={html}/>
      <div className="preview-bundle-status">{bundleStatus}</div>
    </div>
    
  )
}

export default Preview
