import React, {
  useState,
  useCallback,
  ReactElement,
  useRef,
  useEffect,
  useContext,
} from 'react';
import { ThemeContext, withTheme, ThemeProvider } from 'styled-components';
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
} from './styled/Sidebar';


export const PureSidebar = ({
  theme,
  children,
  navComponent,
  showScrollbar,
  arrowComponent = <Arrow />,
  withArrow = true,
  isRTL = false,
  minWidth = 30,
  maxWidth = 400,
  separatorWidth: separatorWidthProp = 90,
}: ISidebarProps): ReactElement => {
  const themeContext = useContext(ThemeContext);

  const [transformParams, setTransformParams] = useState({
    width: maxWidth,
    animate: false,
    arrowToRight: false,
  });

  const [antiSelectLayer, changeAntiSelectLayer] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const clickX = useRef(0);
  const [offsetLeft, changeOffsetLeft] = useState(0);
  const separatorWidth = showScrollbar
    ? separatorWidthProp
    : separatorWidthProp + 10;

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
      const newWidth = isRTL
        ? transformParams.width - (currentX - clickX.current)
        : transformParams.width + (currentX - clickX.current);

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
    },
    [isRTL, maxWidth, minWidth, transformParams.width],
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
    <ThemeProvider theme={ theme || themeContext || {} }>
      <Root offsetLeft={ offsetLeft } isRTL={ isRTL }>
        <SidebarWrapper
          ref={ sidebarRef }
          isRTL={ isRTL }
        >
          { navComponent && (
            <NavComponentWrapper>
              <Scrollbar
                width={ separatorWidth }
                autoHide={ showScrollbar === 'auto' }
                animate={ false }
              >
                { navComponent }
              </Scrollbar>
            </NavComponentWrapper>
          ) }
          { children && (
            <ResponsiveWrapper
              animate={ transformParams.animate }
              style={ responsiveWrapperStyles }
              isRTL={ isRTL }
            >
              <ChildWrapper
                style={ { width: transformParams.width } }
                animate={ transformParams.animate }
              >
                <Scrollbar
                  animate={ transformParams.animate }
                  width={ rightWidth }
                  marginLeft="-10px"
                  autoHide={ showScrollbar === 'auto' }
                >
                  { children }
                </Scrollbar>
              </ChildWrapper>
              { antiSelectLayer && <AntiSelect isRTL={ isRTL } /> }
              <SeparatorWrapper
                onMouseDown={ handleMouseDown }
                onMouseUp={ handleRemoveMouseMove }
              >
                <Separator
                  isRTL={ isRTL }
                >
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

export const Sidebar = React.memo(withTheme(PureSidebar));
