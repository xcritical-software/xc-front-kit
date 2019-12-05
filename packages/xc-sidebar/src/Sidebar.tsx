import React, {
  useState,
  useCallback,
  ReactElement,
  useRef,
  useEffect,
  useContext,
} from 'react';
import { ThemeContext, withTheme, ThemeProvider } from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
import ResizeObserver from 'resize-observer-polyfill';

import Arrow from './Arrow';
import { sidebarTheme } from './utils';
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
} from './styled/Sidebar';


export const PureSidebar = ({
  theme,
  appearance = 'default',
  baseAppearance = 'default',
  children,
  navComponent,
  showScrollbar,
  withBorderArrow = false,
  isRTL = false,
}: ISidebarProps): ReactElement => {
  const themeContext = useContext(ThemeContext);
  const themeRef = useRef(sidebarTheme(theme || themeContext));

  const [transformParams, setTransformParams] = useState({
    width: (themeRef.current.maxWidth as number) * 0.7,
    animate: false,
    arrowToRight: false,
  });

  const [antiSelectLayer, changeAntiSelectLayer] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const clickX = useRef(0);
  const [offsetLeft, changeOffsetLeft] = useState(0);
  const leftWidth = showScrollbar
    ? themeRef.current.leftWidth
    : (themeRef.current.leftWidth as number) + 10;

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

      if (newWidth >= (themeRef.current.maxWidth as number)) return;

      if (newWidth <= 0) {
        document.body.removeEventListener('mousemove', handleMouseMove);
        setTransformParams({
          width: themeRef.current.minWidth as number,
          animate: false,
          arrowToRight: true,
        });
      } else if (newWidth <= (themeRef.current.minWidth as number)) {
        setTransformParams({
          width: themeRef.current.minWidth as number,
          animate: false,
          arrowToRight: true,
        });
      } else {
        setTransformParams({
          width: newWidth,
          animate: false,
          arrowToRight: newWidth < (themeRef.current.maxWidth as number) * 0.3,
        });
      }
    },
    [isRTL, transformParams.width],
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
    if (transformParams.width < (themeRef.current.maxWidth as number) * 0.3) {
      setTransformParams({
        width: themeRef.current.maxWidth as number,
        animate: true,
        arrowToRight: false,
      });
    } else {
      setTransformParams({
        width: themeRef.current.minWidth as number,
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
    <ThemeProvider theme={ theme || themeContext || {} }>
      <Root offsetLeft={ offsetLeft }>
        <SidebarWrapper
          ref={ sidebarRef }
          appearance={ appearance }
          baseAppearance={ baseAppearance }
          isRTL={ isRTL }
        >
          { navComponent && (
            <NavComponentWrapper
              appearance={ appearance }
              baseAppearance={ baseAppearance }
            >
              <Scrollbars autoHide={ showScrollbar === 'auto' } style={ { width: leftWidth } }>{ navComponent }</Scrollbars>
            </NavComponentWrapper>
          ) }
          { children && (
            <ResponsiveWrapper
              animate={ transformParams.animate }
              style={ responsiveWrapperStyles }
              isRTL={ isRTL }
            >
              <ChildWrapper
                appearance={ appearance }
                baseAppearance={ baseAppearance }
                style={ { width: transformParams.width } }
                animate={ transformParams.animate }
              >
                <Scrollbars
                  style={ {
                    width: rightWidth,
                    transition: transformParams.animate ? '0.5s' : '0s',
                    marginLeft: '-10px',
                  } }
                  autoHide={ showScrollbar === 'auto' }
                >
                  { children }
                </Scrollbars>
              </ChildWrapper>
              { antiSelectLayer && <AntiSelect /> }
              <SeparatorWrapper
                onMouseDown={ handleMouseDown }
                onMouseUp={ handleRemoveMouseMove }
              >
                <Separator isRTL={ isRTL }>
                  { withBorderArrow && (
                    <CloseOpenButton
                      toRight={ transformParams.arrowToRight }
                      onClick={ handleClose }
                      isRTL={ isRTL }
                    >
                      <Arrow />
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
