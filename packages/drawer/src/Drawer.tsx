import React, {
  useRef,
  useContext,
  useState,
  useCallback,
  useEffect,
  memo,
  ReactNode,
  useMemo,
} from 'react';
import { ThemeContext, ThemeProvider } from 'styled-components';

import { IThemeNamespace } from '@xcritical/theme';
import Portal from '@xcritical/portal';
import Blanket from '@xcritical/blanket';

import { DrawerTheme } from './interfaces';
import {
  Body,
  BlanketWrapper,
  Wrapper,
  Separator,
  AntiSelect,
  CloseIconWrapper,
  HeaderWrapper,
  TitleWrapper,
  Content,
} from './styled';
import { ArrowLeft, ArrowRight } from './Icons';
import { getElementStyles } from './utils';

export interface IDrawerProps {
  appearance?: string;
  title?: string | number | JSX.Element;
  baseAppearance?: string;
  isOpen?: boolean;
  theme?: DrawerTheme;
  isRTL?: boolean;
  isMovable?: boolean;
  withCloseButton?: boolean;
  closeIconComponent?: ReactNode;
  minWidth?: number;
  maxWidth?: number;
  width?: number;
  onOutsideClick?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  onClose?: () => void;
  withBlanket?: boolean;
  onChangeWidth?: (newWidth: number, oldWidth: number) => void;
}

const tempObject = {};

export const Drawer: React.FC<React.PropsWithChildren<IDrawerProps>> = memo(
  ({
    children,
    appearance = 'default',
    baseAppearance = 'default',
    isOpen = false,
    theme,
    minWidth = 30,
    maxWidth = 1000,
    width: propsWidth = maxWidth,
    isRTL = false,
    isMovable = false,
    withCloseButton = false,
    closeIconComponent,
    onClose,
    withBlanket = true,
    title,
    onChangeWidth = () => {},
  }) => {
    const [animate, setAnimate] = useState(true);
    const themeContext = useContext<IThemeNamespace<DrawerTheme>>(ThemeContext);
    const innerTheme = theme || themeContext || tempObject;
    const clickXRef = useRef(0);

    const [isRenderContent, setIsRenderContent] = useState(isOpen);

    const [width, setWidth] = useState(isOpen ? propsWidth : 0);
    const [antiSelectLayer, setAntiSelectLayer] = useState(false);
    const widthRef = useRef(propsWidth);

    const transition = useMemo(
      () =>
        getElementStyles(innerTheme, 'transition', appearance, baseAppearance),
      [innerTheme, appearance, baseAppearance]
    );

    useEffect(() => {
      setWidth(isOpen ? propsWidth : 0);
    }, [isOpen, propsWidth]);

    useEffect(() => {
      let timer: ReturnType<typeof setTimeout> | null = null;

      if (isOpen) {
        setIsRenderContent(true);
      } else {
        timer = setTimeout(() => {
          setIsRenderContent(false);
        }, parseInt(transition, 10));
      }

      return () => {
        if (timer) clearTimeout(timer);
      };
    }, [isOpen, transition]);

    const handleMouseMove = useCallback(
      (e: MouseEvent) => {
        if (!isMovable) return;

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

        if (newWidth <= minWidth) {
          widthRef.current = minWidth;
          setWidth(minWidth);
        } else {
          widthRef.current = newWidth;
          setWidth(newWidth);
        }
      },
      [isMovable, isRTL, maxWidth, minWidth, width]
    );
    const handleSelectStart = useCallback((e) => {
      e.preventDefault();
    }, []);

    const handleMouseUp = useCallback(() => {
      setAnimate(true);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
      setAntiSelectLayer(false);
      onChangeWidth(widthRef.current, width);
    }, [minWidth, handleSelectStart, handleMouseMove, onChangeWidth]);

    const handleMouseDown = useCallback(
      (e) => {
        clickXRef.current = e.clientX;
        setAnimate(false);
        document.addEventListener('selectstart', handleSelectStart);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMouseMove);
        setAntiSelectLayer(true);
      },
      [handleSelectStart, handleMouseUp, handleMouseMove]
    );

    const componentTransitionTime = useMemo(
      () => (animate ? transition : '0ms'),
      [animate, transition]
    );

    const needRenderHeader = useMemo(
      () => title || withCloseButton,
      [title, withCloseButton]
    );

    return (
      <ThemeProvider theme={innerTheme}>
        <Portal id="drawer" zIndex="unset">
          <Wrapper
            appearance={appearance}
            baseAppearance={baseAppearance}
            width={width}
            isRTL={isRTL}
            transition={componentTransitionTime}>
            <Content appearance={appearance} baseAppearance={baseAppearance}>
              {isRenderContent && needRenderHeader && (
                <HeaderWrapper
                  appearance={appearance}
                  baseAppearance={baseAppearance}>
                  {withCloseButton && (
                    <CloseIconWrapper
                      onClick={onClose}
                      appearance={appearance}
                      baseAppearance={baseAppearance}>
                      {closeIconComponent ??
                        (isRTL ? <ArrowRight /> : <ArrowLeft />)}
                    </CloseIconWrapper>
                  )}

                  <TitleWrapper
                    appearance={appearance}
                    baseAppearance={baseAppearance}>
                    {title}
                  </TitleWrapper>
                </HeaderWrapper>
              )}

              <Body appearance={appearance} baseAppearance={baseAppearance}>
                {isRenderContent && children}
              </Body>
            </Content>

            <Separator
              appearance={appearance}
              baseAppearance={baseAppearance}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              isMovable={isMovable}
              isRTL={isRTL}
            />
          </Wrapper>

          {antiSelectLayer && (
            <AntiSelect
              appearance={appearance}
              baseAppearance={baseAppearance}
              isRTL={isRTL}
            />
          )}
        </Portal>
        {withBlanket && isRenderContent && (
          <BlanketWrapper
            visible={!!width}
            appearance={appearance}
            baseAppearance={baseAppearance}
            transition={transition}>
            <Blanket isTinted onBlanketClicked={onClose} />
          </BlanketWrapper>
        )}
      </ThemeProvider>
    );
  }
);
