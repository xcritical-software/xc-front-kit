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
  minimizedWidth = 10,
  collapsed = false,
  width: propsWidth = maxWidth,
  navWidth = 90,
  separatorWidth = 10,
  onChangeState = () => {},
  className,
  classNamePrefix,
}) => {
  const themeContext = useContext(ThemeContext);

  const [width, setWidth] = useState(collapsed ? minimizedWidth : propsWidth);
  const [animate, setAnimate] = useState(false);
  const [arrowToRight, setArrowToRight] = useState(collapsed);
  const [antiSelectLayer, setAntiSelectLayer] = useState(false);
  const [offsetLeft, changeOffsetLeft] = useState(0);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const observerRef: React.MutableRefObject<
    ResizeObserver | undefined
  > = useRef();
  const clickXRef = useRef(0);
  const widthRef = useRef(propsWidth);

  useEffect(() => {
    setWidth(collapsed ? minimizedWidth : propsWidth);
    setArrowToRight(collapsed);
  }, [collapsed, propsWidth, minimizedWidth]);

  useEffect(() => {
    setArrowToRight(width < minWidth);
  }, [minWidth, width]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const { clientX: currentX } = e;

      const newWidth = isRTL
        ? width - (currentX - clickXRef.current)
        : width + (currentX - clickXRef.current);

      if (newWidth > maxWidth) {
        if (widthRef.current < maxWidth) {
          widthRef.current = maxWidth;
          setWidth(maxWidth);
        }

        return;
      }

      if (newWidth <= minimizedWidth) {
        widthRef.current = minimizedWidth;
        setWidth(minimizedWidth);
      } else {
        widthRef.current = newWidth;
        setWidth(newWidth);
      }
    },
    [isRTL, maxWidth, minimizedWidth, width]
  );

  const handleSelectStart = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleMouseUp = useCallback(
    (e) => {
      if (!e.target.closest('button')) {
        if (widthRef.current <= minWidth) {
          setWidth(minimizedWidth);
          setAnimate(true);
        }

        onChangeState({
          collapsed: widthRef.current < minWidth,
          width: widthRef.current < minWidth ? minWidth + 1 : widthRef.current,
        });
      }

      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
      setAntiSelectLayer(false);
    },
    [
      minWidth,
      handleSelectStart,
      handleMouseMove,
      minimizedWidth,
      onChangeState,
    ]
  );

  const handleMouseDown = useCallback(
    (e) => {
      clickXRef.current = e.clientX;
      document.addEventListener('selectstart', handleSelectStart);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mousemove', handleMouseMove);
      setAntiSelectLayer(true);
      setAnimate(false);
    },
    [handleSelectStart, handleMouseUp, handleMouseMove]
  );

  const handleClose = useCallback(() => {
    setAnimate(true);

    if (arrowToRight) {
      setWidth(propsWidth);
    } else {
      setWidth(minimizedWidth);
    }

    onChangeState({
      collapsed: !arrowToRight,
      width: propsWidth,
    });
  }, [arrowToRight, minimizedWidth, onChangeState, propsWidth]);

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
    []
  );

  return (
    <ThemeProvider theme={(theme ?? themeContext) || {}}>
      <Root className={className} offsetLeft={offsetLeft} isRTL={isRTL}>
        <SidebarWrapper
          className={classNamePrefix && `${classNamePrefix}--wrapper`}
          ref={sidebarRef}
          isRTL={isRTL}>
          {navComponent && (
            <NavComponentWrapper
              className={classNamePrefix && `${classNamePrefix}--nav-wrapper`}>
              <Scrollbar
                className={classNamePrefix && `${classNamePrefix}--scrollbar`}
                width={navWidth}
                animate={animate}
                autoHide={isScrollbarAutoHide}>
                {navComponent}
              </Scrollbar>
            </NavComponentWrapper>
          )}
          {children && (
            <ResponsiveWrapper
              className={
                classNamePrefix && `${classNamePrefix}--responsive-wrapper`
              }
              animate={animate}
              width={width}
              isRTL={isRTL}>
              <ChildWrapper
                className={
                  classNamePrefix && `${classNamePrefix}--child-wrapper`
                }
                animate={animate}>
                <Scrollbar
                  className={classNamePrefix && `${classNamePrefix}--scrollbar`}
                  width={width}
                  animate={animate}
                  autoHide={isScrollbarAutoHide}>
                  {children}
                </Scrollbar>
              </ChildWrapper>

              {antiSelectLayer && (
                <AntiSelect
                  className={
                    classNamePrefix && `${classNamePrefix}--anti-select`
                  }
                  isRTL={isRTL}
                />
              )}

              <SeparatorWrapper
                className={
                  classNamePrefix && `${classNamePrefix}--separator-wrapper`
                }
                isRTL={isRTL}
                separatorWidth={separatorWidth}
                onMouseDown={handleMouseDown}>
                <Separator
                  className={classNamePrefix && `${classNamePrefix}--separator`}
                  isRTL={isRTL}>
                  {withArrow && (
                    <CloseOpenButton
                      className={
                        classNamePrefix &&
                        `${classNamePrefix}--button-close-open`
                      }
                      toRight={arrowToRight}
                      onClick={handleClose}
                      isRTL={isRTL}>
                      {arrowComponent}
                    </CloseOpenButton>
                  )}
                </Separator>
              </SeparatorWrapper>
            </ResponsiveWrapper>
          )}
        </SidebarWrapper>
      </Root>
    </ThemeProvider>
  );
};

export const Sidebar = React.memo(PureSidebar);
