import React, {
  useState, useCallback, ReactElement, useRef, useEffect, ReactNode,
} from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import ResizeObserver from 'resize-observer-polyfill';
import { IThemeNamespace } from '@xcritical/xc-theme';
import Arrow from './Arrow';
import { sidebarTheme, ISidebarTheme } from './utils';
import {
  ResponsiveWrapper,
  RightBorder,
  CloseOpenButton,
  RightBorderWrapper,
  AntiSelect,
  ChildWrapper,
  SidebarWrapper,
  NavComponentWrapper,
} from './styled/Sidebar';
import { sidebarThemeStyle, sidebarThemeNamespace } from './theme';


interface IWrapperProps {
  navComponent?: ReactNode;
  children?: ReactNode;
  theme?: IThemeNamespace;
  alwaysShowScrollbar: boolean;
}


export const Sidebar = ({
  theme = {
    [sidebarThemeNamespace]: sidebarThemeStyle,
  },
  children,
  navComponent,
  alwaysShowScrollbar,
}: IWrapperProps): ReactElement => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef(sidebarTheme<ISidebarTheme>(theme));

  useEffect(() => () => {
    themeRef.current = sidebarTheme<ISidebarTheme>(theme);
  }, [theme]);

  const [transformParams, setTransformParams] = useState({
    width: themeRef.current.maxWidth * 0.7,
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
    if (newWidth >= themeRef.current.maxWidth) return;
    if (newWidth <= 0) {
      document.body.removeEventListener('mousemove', handleMouseMove);
      setTransformParams({
        width: themeRef.current.minWidth,
        animate: false,
        arrowToRight: true,
      });
    } else if (newWidth <= themeRef.current.minWidth) {
      setTransformParams({
        width: themeRef.current.minWidth,
        animate: false,
        arrowToRight: true,
      });
    } else {
      setTransformParams({
        width: newWidth,
        animate: false,
        arrowToRight: newWidth < themeRef.current.maxWidth * 0.3,
      });
    }
  }, [clickX, transformParams.width]);

  const handleMouseDown = useCallback((e) => {
    clickX = e.clientX;
    document.body.addEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const handleClose = useCallback(() => {
    document.body.removeEventListener('mousemove', handleMouseMove);
    if (transformParams.width < themeRef.current.maxWidth * 0.3) {
      setTransformParams({
        width: themeRef.current.maxWidth,
        animate: true,
        arrowToRight: false,
      });
    } else {
      setTransformParams({
        width: themeRef.current.minWidth,
        animate: true,
        arrowToRight: true,
      });
    }
  }, [handleMouseMove, transformParams.width]);


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
  const leftWidth = alwaysShowScrollbar
    ? themeRef.current.leftWidth : themeRef.current.leftWidth + 10;
  const responsiveWrapperStyles = {
    width: transformParams.width,
    marginLeft: alwaysShowScrollbar ? 0 : '-10px',
  };
  const rightWidth = alwaysShowScrollbar ? transformParams.width : transformParams.width + 10;

  return (
    <SidebarWrapper
      ref={ sidebarRef }
      theme={ themeRef.current }
    >
      { navComponent
        && (
          <NavComponentWrapper
            theme={ themeRef.current }
          >
            <Scrollbars style={ { width: leftWidth } }>
              { navComponent }
            </Scrollbars>
          </NavComponentWrapper>
        )
      }
      <ResponsiveWrapper animate={ transformParams.animate } style={ responsiveWrapperStyles }>
        <RightBorderWrapper onMouseDown={ handleMouseDown } onMouseUp={ handleRemoveMouseMove }>
          <RightBorder
            theme={ themeRef.current }
          >
            <CloseOpenButton toRight={ transformParams.arrowToRight } onClick={ handleClose }>
              <Arrow />
            </CloseOpenButton>
          </RightBorder>
        </RightBorderWrapper>
        { antiSelectLayer && <AntiSelect /> }
        <ChildWrapper
          theme={ themeRef.current }
          style={ { width: transformParams.width } }
          animate={ transformParams.animate }
        >
          <Scrollbars style={ { width: rightWidth, transition: transformParams.animate ? '0.5s' : '0s' } }>
            { children }
          </Scrollbars>
        </ChildWrapper>
      </ResponsiveWrapper>
    </SidebarWrapper>
  );
};
