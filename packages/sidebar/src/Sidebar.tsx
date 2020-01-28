import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useContext,
} from 'react';

import { ThemeContext, ThemeProvider } from 'styled-components';
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
  Scrollbar,
} from './styled';


export const PureSidebar: React.FC<ISidebarProps> = ({
  theme,
  children,
  navComponent,
  arrowComponent = <Arrow />,
  withArrow = true,
  isScrollbarAutoHide = true,
  isRTL = false,
  minWidth = 30,
  maxWidth = 400,
  navWidth = 90,
  separatorWidth = 10,
}) => {
  const themeContext = useContext(ThemeContext);

  const [width, setWidth] = useState(maxWidth);
  const [animate, setAnimate] = useState(false);
  const [arrowToRight, setArrowToRight] = useState(false);
  const [antiSelectLayer, setAntiSelectLayer] = useState(false);
  const [offsetLeft, changeOffsetLeft] = useState(0);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const observerRef: React.MutableRefObject<ResizeObserver | undefined> = useRef();
  const clickXRef = useRef(0);
  const widthRef = useRef(maxWidth);

  const handleMouseMove = useCallback(
    (e) => {
      const { clientX: currentX } = e;

      const newWidth = isRTL
        ? width - (currentX - clickXRef.current)
        : width + (currentX - clickXRef.current);

      if (newWidth > maxWidth) {
        if (widthRef.current < maxWidth) {
          widthRef.current = maxWidth;
          setWidth(maxWidth);
          setArrowToRight(false);
        }

        return;
      }

      if (newWidth <= 0) {
        widthRef.current = minWidth;
        setWidth(minWidth);
        setArrowToRight(true);
      } else if (newWidth <= minWidth) {
        widthRef.current = minWidth;
        setWidth(minWidth);
        setArrowToRight(true);
      } else {
        widthRef.current = newWidth;
        setWidth(newWidth);
        setArrowToRight(newWidth < maxWidth * 0.3);
      }
    },
    [isRTL, maxWidth, minWidth, width],
  );

  const handleSelectStart = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleMouseUp = useCallback(() => {
    document.removeEventListener('selectstart', handleSelectStart);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleMouseMove);
    setAntiSelectLayer(false);
  }, [handleSelectStart, handleMouseMove]);

  const handleMouseDown = useCallback(
    (e) => {
      clickXRef.current = e.clientX;
      document.addEventListener('selectstart', handleSelectStart);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mousemove', handleMouseMove);
      setAntiSelectLayer(true);
      setAnimate(false);
    },
    [handleSelectStart, handleMouseUp, handleMouseMove],
  );

  const handleClose = useCallback(() => {
    setAnimate(true);

    if (arrowToRight) {
      setWidth(maxWidth);
      setArrowToRight(false);
    } else {
      setWidth(minWidth);
      setArrowToRight(true);
    }
  }, [arrowToRight, maxWidth, minWidth]);

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
              <Scrollbar
                width={ navWidth }
                animate={ animate }
                autoHide={ isScrollbarAutoHide }
              >
                { navComponent }
              </Scrollbar>
            </NavComponentWrapper>
          ) }
          { children && (
            <ResponsiveWrapper
              animate={ animate }
              width={ width }
              isRTL={ isRTL }
            >
              <ChildWrapper animate={ animate }>
                <Scrollbar
                  width={ width }
                  animate={ animate }
                  autoHide={ isScrollbarAutoHide }
                >
                  { children }
                </Scrollbar>
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
                      toRight={ arrowToRight }
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
