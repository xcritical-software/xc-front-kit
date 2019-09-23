import React, {
  useState, useCallback, ReactElement, useRef, useEffect,
} from 'react';
import ResizeObserver from 'resize-observer-polyfill';
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
  seperatorColor?: string;
  color?: string; 
  backgroundColor?: string;
}

export const Sidebar = ({
  minWidth = 30,
  maxWidth = 400,
  startWidth = maxWidth * 0.8,
  seperatorColor = 'blue',
  color = 'white',
  backgroundColor = '#31394C',
  children,
}: IWrapperProps): ReactElement => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [transformParams, setTransformParams] = useState({
    width: startWidth || maxWidth * 0.7,
    animate: false,
    arrowToRight: false,
  });
  let clickX = 0;
  let componentObserver: null | ResizeObserver = null;
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

  useEffect(() => {
    if (sidebarRef.current === null) {
      return;
    }
    const observer = new ResizeObserver(() => {
      if (sidebarRef.current === null) {
        return;
      }

      const parentNode = sidebarRef.current.parentNode as HTMLElement;
      const parentRect = parentNode.getBoundingClientRect();
      parentNode.style.paddingLeft = `${sidebarRef.current.offsetWidth}px`;
      sidebarRef.current.style.left = `${parentRect.left}px`;
    });
    observer.observe(sidebarRef.current);
    componentObserver = observer;
  }, []);

  useEffect(() => () => {
    if (componentObserver && sidebarRef.current) {
      componentObserver.unobserve(sidebarRef.current);
      if (componentObserver.disconnect) {
        componentObserver.disconnect();
      }
    }
  }, [componentObserver]);


  return (
    <ResponsiveWrapper backgroundColor={ backgroundColor } color={ color } animate={ transformParams.animate } width={ transformParams.width } ref={ sidebarRef }>
      <RightBorderWrapper onMouseDown={ handleMouseDown } onMouseUp={ handleRemoveMouseMove }>
        <RightBorder  seperatorColor={ seperatorColor }>
          <CloseOpenButton toRight={ transformParams.arrowToRight } onClick={ handleClose }>
            <Arrow />
          </CloseOpenButton>
        </RightBorder>
      </RightBorderWrapper>
      { antiSelectLayer && <AntiSelect /> }
      <ChildWrapper width={ transformParams.width } animate={ transformParams.animate }>
        { children }
      </ChildWrapper>
    </ResponsiveWrapper>
  );
};
