import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useContext,
} from 'react';

import { ThemeContext, ThemeProvider } from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
import ResizeObserver from 'resize-observer-polyfill';

import Arrow from './Arrow';
import { ISidebarProps } from './interfaces';

import {
  Root,
  ResponsiveWrapper,
  ChildWrapper,
  SidebarWrapper,
  NavComponentWrapper,
  SeparatorWrapper,
  Separator,
  CloseOpenButton,
  AntiSelect,
} from './styled';


export const PureSidebar: React.FC<ISidebarProps> = ({
  theme,
  children,
  navComponent,
  showScrollbar,
  arrowComponent = <Arrow />,
  withArrow = true,
  isRTL = false,
  minWidth = 30,
  maxWidth = 400,
  navWidth = 90,
  separatorWidth = 10,
}) => {
  const themeContext = useContext(ThemeContext);

  const [transformParams, setTransformParams] = useState({
    width: maxWidth,
    animate: false,
    arrowToRight: false,
  });

  const [antiSelectLayer, setAntiSelectLayer] = useState(false);
  const [offsetLeft, changeOffsetLeft] = useState(0);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const observerRef: React.MutableRefObject<ResizeObserver | undefined> = useRef();
  const clickX = useRef(0);

  const handleMouseMove = useCallback(
    (e) => {
      const { clientX: currentX } = e;
      const newWidth = isRTL
        ? transformParams.width - (currentX - clickX.current)
        : transformParams.width + (currentX - clickX.current);

      if (newWidth >= maxWidth) return;

      if (newWidth <= 0) {
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
    },
    [isRTL, maxWidth, minWidth, transformParams.width],
  );

  const handleMouseUp = useCallback(() => {
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleMouseMove);
    setAntiSelectLayer(false);
  }, [handleMouseMove]);

  const handleMouseDown = useCallback(
    (e) => {
      clickX.current = e.clientX;
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mousemove', handleMouseMove);
      setAntiSelectLayer(true);
    },
    [handleMouseUp, handleMouseMove],
  );

  const handleClose = useCallback(() => {
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
  }, [maxWidth, minWidth, transformParams.width]);

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
    <ThemeProvider theme={ theme || themeContext || {} }>
      <Root offsetLeft={ offsetLeft } isRTL={ isRTL }>
        <SidebarWrapper ref={ sidebarRef } isRTL={ isRTL }>
          { navComponent && (
            <NavComponentWrapper>
              <Scrollbars
                style={ { width: navWidth } }
                autoHide={ showScrollbar === 'auto' }
              >
                { navComponent }
              </Scrollbars>
            </NavComponentWrapper>
          ) }
          { children && (
            <ResponsiveWrapper
              animate={ transformParams.animate }
              style={ { width: transformParams.width } }
              isRTL={ isRTL }
            >
              <ChildWrapper
                style={ { width: transformParams.width } }
                animate={ transformParams.animate }
              >
                <Scrollbars
                  style={ { width: transformParams.width } }
                  autoHide={ showScrollbar === 'auto' }
                >
                  { children }
                </Scrollbars>
              </ChildWrapper>

              { antiSelectLayer && <AntiSelect isRTL={ isRTL } /> }

              <SeparatorWrapper
                isRTL={ isRTL }
                separatorWidth={ separatorWidth }
                onMouseDown={ handleMouseDown }
              >
                <Separator isRTL={ isRTL }>
                  { withArrow && (
                    <CloseOpenButton
                      toRight={ transformParams.arrowToRight }
                      onClick={ handleClose }
                      isRTL={ isRTL }
                    >
                      { arrowComponent }
                    </CloseOpenButton>
                  ) }
                </Separator>
              </SeparatorWrapper>
            </ResponsiveWrapper>
          ) }
        </SidebarWrapper>
      </Root>
    </ThemeProvider>
  );
};

export const Sidebar = React.memo(PureSidebar);
