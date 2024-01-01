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
        maxConstraints={[Infinity, window.innerHeight * 0.9]}
        minConstraints={[Infinity, 24]}
    >
      {children}
    </ResizableBox>
  )
}

export default Resizable;
