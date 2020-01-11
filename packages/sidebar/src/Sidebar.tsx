import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useContext,
} from 'react';

import { ThemeContext } from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
import ResizeObserver from 'resize-observer-polyfill';

import { Arrow } from './Arrow';
import { sidebarTheme } from './utils';
import { IWrapperProps, ISidebarTheme } from './interfaces';

import {
  ResponsiveWrapper,
  RightBorder,
  CloseOpenButton,
  RightBorderWrapper,
  AntiSelect,
  ChildWrapper,
  SidebarWrapper,
  NavComponentWrapper,
} from './styles';


export const Sidebar: React.FC<IWrapperProps> = ({
  theme,
  children,
  navComponent,
  arrowComponent,
  showScrollbar,
}) => {
  const themeContext = useContext(ThemeContext);
  const themeRef = useRef<ISidebarTheme>(sidebarTheme(theme || themeContext));
  const [transformParams, setTransformParams] = useState({
    width: themeRef.current.maxWidth * 0.7,
    animate: false,
    arrowToRight: false,
  });

  const [antiSelectLayer, changeAntiSelectLayer] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const clickX = useRef(0);
  const [offsetLeft, changeOffsetLeft] = useState(0);
  const leftWidth = showScrollbar
    ? themeRef.current.leftWidth
    : themeRef.current.leftWidth + 10;

  const responsiveWrapperStyles = {
    width: transformParams.width,
    marginLeft: showScrollbar ? 0 : '-10px',
  };

  const rightWidth = showScrollbar
    ? transformParams.width
    : transformParams.width + 10;

  const handleMouseMove = useCallback(
    (e) => {
      changeAntiSelectLayer(true);
      document.body.addEventListener('mouseup', () => {
        document.body.removeEventListener('mousemove', handleMouseMove);
        changeAntiSelectLayer(false);
      });

      const { clientX: currentX } = e;
      const newWidth = transformParams.width + (currentX - clickX.current);

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
    },
    [transformParams.width],
  );

  const handleMouseDown = useCallback(
    (e) => {
      clickX.current = e.clientX;
      document.body.addEventListener('mousemove', handleMouseMove);
    },
    [handleMouseMove],
  );

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


  const createObserver = (): ResizeObserver | undefined => {
    if (sidebarRef.current === null) {
      return undefined;
    }
    const observer = new ResizeObserver((): undefined => {
      if (sidebarRef.current === null) {
        return undefined;
      }
      changeOffsetLeft(sidebarRef.current.offsetWidth);
      return undefined;
    });
    observer.observe(sidebarRef.current);
    return observer;
  };

  const observerRef: React.MutableRefObject<ResizeObserver | undefined> = useRef();
  useEffect(() => {
    observerRef.current = createObserver();
  }, []);


  useEffect(
    () => () => {
      if (observerRef.current && sidebarRef.current) {
        observerRef.current.unobserve(sidebarRef.current);
        if (observerRef.current.disconnect) {
          observerRef.current.disconnect();
        }
      }
    },
    [observerRef],
  );


  return (
    <div style={ {
      height: '100%', width: `${offsetLeft}px`, minHeight: '100vh', float: 'left',
    } }
    >
      <SidebarWrapper ref={ sidebarRef } theme={ themeRef.current }>
        { navComponent && (
          <NavComponentWrapper theme={ themeRef.current }>
            <Scrollbars autoHide={ showScrollbar === 'auto' } style={ { width: leftWidth } }>{ navComponent }</Scrollbars>
          </NavComponentWrapper>
        ) }
        { children && (
          <ResponsiveWrapper
            animate={ transformParams.animate }
            style={ responsiveWrapperStyles }
          >
            <RightBorderWrapper
              onMouseDown={ handleMouseDown }
              onMouseUp={ handleRemoveMouseMove }
            >
              <RightBorder theme={ themeRef.current }>
                <CloseOpenButton
                  cssStyles={ themeRef.current.closeOpenButton }
                  toRight={ transformParams.arrowToRight }
                  onClick={ handleClose }
                >
                  { arrowComponent || <Arrow /> }
                </CloseOpenButton>
              </RightBorder>
            </RightBorderWrapper>
            { antiSelectLayer && <AntiSelect /> }
            <ChildWrapper
              theme={ themeRef.current }
              style={ { width: transformParams.width } }
              animate={ transformParams.animate }
            >
              <Scrollbars
                style={ {
                  width: rightWidth,
                  transition: transformParams.animate ? '0.5s' : '0s',
                } }
                autoHide={ showScrollbar === 'auto' }
              >
                { children }
              </Scrollbars>
            </ChildWrapper>
          </ResponsiveWrapper>
        ) }
      </SidebarWrapper>
    </div>
  );
};
