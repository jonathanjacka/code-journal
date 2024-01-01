import { ResizableBox } from "react-resizable";

import './Resizable.css';

interface ResizableProps {
    direction: "horizontal" | "vertical";
    children?: React.ReactNode;
  }

const Resizable: React.FC<ResizableProps> = ( {direction, children} ) => {
    console.log(direction);
  return (
    <ResizableBox 
        height={300} 
        width={Infinity}
        resizeHandles={['s']}
    >
      {children}
    </ResizableBox>
  )
}

export default Resizable;
