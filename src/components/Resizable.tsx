import { useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

import './Resizable.css';

interface ResizableProps {
    direction: "horizontal" | "vertical";
    children?: React.ReactNode;
  }

const Resizable: React.FC<ResizableProps> = ( {direction, children} ) => {
  let resizableProps: ResizableBoxProps;

  const [innerWidth, setinnerWidth] = useState(window.innerWidth);
  const [innerHeight, setinnerHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const listener = () => {
      if(timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setinnerWidth(window.innerWidth);
        setinnerHeight(window.innerHeight);
        if(window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
      
    }
    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    }
  }, [width]);

  if(direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      height: Infinity,
      width: width,
      resizeHandles: ['e'],
      maxConstraints: [innerWidth * 0.75, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      }
    }
    } else {
      resizableProps = {
        height: 300,
        width: Infinity,
        resizeHandles: ['s'],
        maxConstraints: [Infinity, innerHeight * 0.9],
        minConstraints: [Infinity, 24]
    }
  }

  return (
    <ResizableBox {...resizableProps}>
      {children}
    </ResizableBox>
  )
}

export default Resizable;
