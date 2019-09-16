import React, { useState } from 'react';
import Arrow from './arrow.jsx';

import {
  ResponsiveWrapper,
  RightBorder,
  CloseOpenButton,
  RightBorderWrapper,
  AntiSelect,
} from './styled/Sidebar';


const Wrapper = ({
  maxWidth = 400, minWidth = 30, startWidth = 320, children,
}) => {
  const [transformParams, setTransformParams] = useState({
    width: startWidth || maxWidth * 0.7,
    animate: false,
  });
  let clickX = 0;
  const [antiSelectLayer, changeAntiSelectLayer] = useState(false);
  const handleMouseMove = (e) => {
    changeAntiSelectLayer(true);
    document.body.addEventListener('mouseup', () => {
      document.body.removeEventListener('mousemove', handleMouseMove);
      changeAntiSelectLayer(false);
    });

    const { clientX: currentX } = e;
    const newWidth = transformParams.width + (currentX - clickX);
    if (newWidth >= maxWidth) return;
    if (newWidth <= 0) {
      document.body.removeEventListener('mousemove', handleMouseMove);
      setTransformParams({
        width: minWidth,
        animate: false,
        arrowToRight: true,
      });
    } else if (newWidth <= minWidth) {
      setTransformParams({
        width: minWidth,
        animate: false,
        arrowToRight: true,
      });
    } else {
      setTransformParams({
        width: newWidth,
        animate: false,
        arrowToRight: newWidth < maxWidth * 0.3,
      });
    }
  };

  const handleMouseDown = (e) => {
    clickX = e.clientX;
    document.body.addEventListener('mousemove', handleMouseMove);
    // useEventListener('mousemove', handleMouseMove)
  };

  const handleClose = () => {
    document.body.removeEventListener('mousemove', handleMouseMove);
    if (transformParams.width < maxWidth * 0.3) {
      setTransformParams({
        width: maxWidth,
        animate: true,
        arrowToRight: false,
      });
    } else {
      setTransformParams({
        width: minWidth,
        animate: true,
        arrowToRight: true,
      });
    }
  };


  return (
    <ResponsiveWrapper animate={ transformParams.animate } width={ transformParams.width }>
      <RightBorderWrapper onMouseDown={ handleMouseDown } onMouseUp={ () => document.body.removeEventListener('mousemove', handleMouseMove) }>
        <RightBorder>
          <CloseOpenButton toRight={ transformParams.arrowToRight } onClick={ handleClose }>
            <Arrow />
          </CloseOpenButton>
        </RightBorder>
      </RightBorderWrapper>
      { antiSelectLayer && <AntiSelect /> }
      { children }
    </ResponsiveWrapper>
  );
};


export default Wrapper;
