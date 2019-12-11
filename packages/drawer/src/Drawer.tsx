import React, {
  useRef, useContext, useState, useCallback,
} from 'react';
import { withTheme, ThemeContext, ThemeProvider } from 'styled-components';
import { TransitionGroup, Transition } from 'react-transition-group';

import { IThemeNamespace } from '@xcritical/theme';
import Portal from '@xcritical/portal';
import Blanket from '@xcritical/blanket';

import { IDrawerProps, DrawerTheme } from './interfaces';
import {
  Wrapper,
  Content,
  Fade,
  Slide,
  SeparatorWrapper,
  Separator,
  AntiSelect,
  IconWrapper,
} from './styled';
import { ArrowLeft, ArrowRight } from './Icons';


export const PureDrawer: React.FC<IDrawerProps> = React.memo<IDrawerProps>(({
  children,
  appearance = 'default',
  baseAppearance = 'default',
  isOpen = false,
  onOutsideClick,
  theme,
  minWidth = 30,
  maxWidth = 1000,
  isRTL = false,
  isMovable = false,
  withCloseButton = false,
}: IDrawerProps) => {
  const themeContext = useContext<IThemeNamespace<DrawerTheme>>(ThemeContext);

  const clickX = useRef(0);
  const drawerRef = useRef<HTMLElement>(null);

  const [width, setWidth] = useState(maxWidth);
  const [antiSelectLayer, setAntiSelectLayer] = useState(false);


  const handleMouseMove = useCallback(
    (e) => {
      if (!isMovable) return;

      setAntiSelectLayer(true);
      document.body.addEventListener('mouseup', () => {
        document.body.removeEventListener('mousemove', handleMouseMove);
        setAntiSelectLayer(false);
      });

      const { clientX: currentX } = e;
      const newWidth = isRTL
        ? width - (currentX - clickX.current)
        : width + (currentX - clickX.current);

      if (newWidth >= maxWidth) return;

      if (newWidth <= 0) {
        document.body.removeEventListener('mousemove', handleMouseMove);
        setWidth(minWidth);
      } else if (newWidth <= minWidth) {
        setWidth(minWidth);
      } else {
        setWidth(newWidth);
      }
    },
    [isMovable, isRTL, maxWidth, minWidth, width],
  );

  const handleMouseDown = useCallback(
    (e) => {
      clickX.current = e.clientX;
      document.body.addEventListener('mousemove', handleMouseMove);
    },
    [handleMouseMove],
  );

  const handleMouseUp = useCallback(() => {
    document.body.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <ThemeProvider theme={ (theme || themeContext || {}) }>
      <Transition
        in={ isOpen }
        timeout={ { enter: 0, exit: 220 } }
        mountOnEnter
        unmountOnExit
      >
        <Portal id="drawer" zIndex="unset">
          <TransitionGroup>
            <>
              <Fade in={ isOpen } theme={ theme || themeContext || {} }>
                <Blanket isTinted onBlanketClicked={ onOutsideClick } />
              </Fade>
              { antiSelectLayer && <AntiSelect /> }
              <Slide
                ref={ drawerRef }
                in={ isOpen }
                component={ Wrapper }
                theme={ (theme || themeContext || {}) }
                appearance={ appearance }
                baseAppearance={ baseAppearance }
                width={ width }
                offsetSide={ children && (width || 0) }
                isRTL={ isRTL }
              >
                {
                  withCloseButton && (
                    <IconWrapper onClick={ onOutsideClick }>
                      { isRTL ? <ArrowRight /> : <ArrowLeft /> }
                    </IconWrapper>
                  )
                }
                <Content
                  appearance={ appearance }
                  baseAppearance={ baseAppearance }
                  isOpen={ isOpen }
                  width={ width }
                  offsetSide={ children && (width || 0) }
                  isRTL={ isRTL }
                >
                  { children }
                </Content>
                <SeparatorWrapper
                  appearance={ appearance }
                  baseAppearance={ baseAppearance }
                  onMouseDown={ handleMouseDown }
                  onMouseUp={ handleMouseUp }
                  isMovable={ isMovable }
                >
                  <Separator
                    appearance={ appearance }
                    baseAppearance={ baseAppearance }
                    isRTL={ isRTL }
                  />
                </SeparatorWrapper>
              </Slide>
            </>
          </TransitionGroup>
        </Portal>
      </Transition>
    </ThemeProvider>
  );
});

export const Drawer = React.memo(withTheme(PureDrawer));
