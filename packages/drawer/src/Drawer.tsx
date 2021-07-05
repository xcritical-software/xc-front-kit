import React, {
  useRef,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { withTheme, ThemeContext, ThemeProvider } from 'styled-components';
import { Transition } from 'react-transition-group';

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

export const PureDrawer = React.memo<IDrawerProps>(
  ({
    children,
    // TODO Maybe 'appearance' and 'baseAppearance' doesn't need in future
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
    closeIconComponent,
    onClose,
    withBlanket = true,
    zIndex,
  }: IDrawerProps) => {
    const themeContext = useContext<IThemeNamespace<DrawerTheme>>(ThemeContext);

    const clickXRef = useRef(0);
    const drawerRef = useRef<HTMLElement>(null);

    const [width, setWidth] = useState(maxWidth);
    const [antiSelectLayer, setAntiSelectLayer] = useState(false);

    useEffect(() => {
      setWidth(maxWidth);
    }, [maxWidth]);

    const handleMouseMove = useCallback(
      (e) => {
        if (!isMovable) return;

        const { clientX: currentX } = e;
        const newWidth = isRTL
          ? width - (currentX - clickXRef.current)
          : width + (currentX - clickXRef.current);

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
      [isMovable, isRTL, maxWidth, minWidth, width]
    );

    const handleMouseDown = useCallback(
      (e) => {
        clickXRef.current = e.clientX;
        setAntiSelectLayer(true);

        document.body.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseup', () => {
          document.body.removeEventListener('mousemove', handleMouseMove);
          setAntiSelectLayer(false);
        });
      },
      [handleMouseMove]
    );

    const handleMouseUp = useCallback(() => {
      document.body.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);

    return (
      <ThemeProvider theme={theme || themeContext || {}}>
        <Transition
          in={isOpen}
          timeout={{ enter: 0, exit: 220 }}
          mountOnEnter
          unmountOnExit
          onExited={onClose}>
          <Portal id="drawer" zIndex="unset">
            {withBlanket && (
              <Fade
                in={isOpen}
                theme={theme || themeContext || {}}
                appearance={appearance}
                baseAppearance={baseAppearance}
                zIndex={zIndex}>
                <Blanket isTinted onBlanketClicked={onOutsideClick} />
              </Fade>
            )}
            {antiSelectLayer && <AntiSelect />}
            <Slide
              zIndex={zIndex}
              ref={drawerRef}
              in={isOpen}
              component={Wrapper}
              theme={theme || themeContext || {}}
              appearance={appearance}
              baseAppearance={baseAppearance}
              width={width}
              isRTL={isRTL}>
              {withCloseButton && (
                <IconWrapper
                  onClick={onOutsideClick}
                  appearance={appearance}
                  baseAppearance={baseAppearance}>
                  {closeIconComponent ??
                    (isRTL ? <ArrowRight /> : <ArrowLeft />)}
                </IconWrapper>
              )}
              <Content
                appearance={appearance}
                baseAppearance={baseAppearance}
                isOpen={isOpen}
                width={width}
                isRTL={isRTL}>
                {children}
              </Content>
              <SeparatorWrapper
                appearance={appearance}
                baseAppearance={baseAppearance}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                isMovable={isMovable}>
                <Separator
                  appearance={appearance}
                  baseAppearance={baseAppearance}
                  isRTL={isRTL}
                />
              </SeparatorWrapper>
            </Slide>
          </Portal>
        </Transition>
      </ThemeProvider>
    );
  }
);

export const Drawer = React.memo(withTheme(PureDrawer));
