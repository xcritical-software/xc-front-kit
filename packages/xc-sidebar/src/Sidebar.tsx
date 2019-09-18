import React, { useState, useCallback, ReactElement } from 'react';
import Arrow from './Arrow';

import {
  ResponsiveWrapper,
  RightBorder,
  CloseOpenButton,
  RightBorderWrapper,
  AntiSelect,
  ChildWrapper,
} from './styled/Sidebar';


interface IWrapperProps {
  maxWidth?: number;
  minWidth?: number;
  startWidth?: number;
  children?: any;
  color?: string;
}

const Wrapper = ({
  minWidth = 30,
  maxWidth = 600,
  startWidth = maxWidth * 0.8,
  color = 'blue',
  children,
}: IWrapperProps): ReactElement => {
  const [transformParams, setTransformParams] = useState({
    width: startWidth || maxWidth * 0.7,
    animate: false,
    arrowToRight: false,
  });
  let clickX = 0;
  const [antiSelectLayer, changeAntiSelectLayer] = useState(false);
  const handleMouseMove = useCallback((e) => {
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
  }, [clickX, maxWidth, minWidth, transformParams.width]);

  const handleMouseDown = useCallback((e) => {
    clickX = e.clientX;
    document.body.addEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const handleClose = useCallback(() => {
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
  }, [handleMouseMove, maxWidth, minWidth, transformParams.width]);


  const handleRemoveMouseMove = useCallback(() => {
    document.body.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);


  return (
    <ResponsiveWrapper animate={ transformParams.animate } width={ transformParams.width }>
      <RightBorderWrapper onMouseDown={ handleMouseDown } onMouseUp={ handleRemoveMouseMove }>
        <RightBorder color={ color }>
          <CloseOpenButton toRight={ transformParams.arrowToRight } onClick={ handleClose }>
            <Arrow />
          </CloseOpenButton>
        </RightBorder>
      </RightBorderWrapper>
      { antiSelectLayer && <AntiSelect /> }
      <ChildWrapper>
        { children }
      </ChildWrapper>
    </ResponsiveWrapper>
  );
};


export default Wrapper;
