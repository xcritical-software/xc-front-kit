import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
  memo,
} from 'react';
import ResizeObserver from 'resize-observer-polyfill';

import Popper, { IRenderPopperProps, Modifiers } from '@xcritical/popper';

import { IPopover, IPopoverEvents } from './interfaces';
import { Content, Arrow, PopoverWrapper } from './styles';

export const Popover: React.FC<IPopover> = memo(
  ({
    position,
    content,
    autoFlip,
    positionFixed,
    children,
    visible,
    onVisibleChange,
    withArrow = true,
    convertStyles,
    shouldFitContainer = false,
    autoContentSize = false,
    preventOverflowViewport = false,
    hoverOutTimeout = 150,
    trigger = 'hover',
    theme,
    appearance = 'default',
    baseAppearance = 'default',
    className = '',
  }) => {
    const popoverTargetRef = useRef<any>();
    const popoverContentRef = useRef<any>();
    const popperScheduleUpdateRef = useRef<any>();
    const popoverContentObserverRef: React.MutableRefObject<
      ResizeObserver | undefined
    > = useRef();

    const [_visible, _setVisible] = useState(false);
    const [hideTimeoutId, setHideTimeoutId] = useState<null | number>(null);

    const popperModifiers: Modifiers = useMemo(() => {
      if (preventOverflowViewport) {
        return {
          preventOverflow: {
            boundariesElement: 'viewport',
          },
        };
      }

      return {};
    }, [preventOverflowViewport]);

    const changeVisible = useCallback(
      (newVisible: boolean) => {
        if (onVisibleChange) {
          onVisibleChange(newVisible);
        }
      },
      [onVisibleChange]
    );

    const handleClick = useCallback(
      (e: Event): void => {
        if (
          popoverContentRef.current &&
          popoverContentRef.current.contains(e.target)
        ) {
          return;
        }

        if (e.target === popoverTargetRef.current) {
          _setVisible(false);
          changeVisible(false);

          return;
        }

        if (
          popoverTargetRef.current &&
          popoverTargetRef.current.contains(e.target)
        ) {
          _setVisible(!_visible);
          changeVisible(!_visible);

          return;
        }

        _setVisible(false);
        changeVisible(false);
      },
      [_visible, changeVisible]
    );

    const handleMouseOver = useCallback(
      (e: React.MouseEvent): void => {
        if (e.target === popoverTargetRef.current) {
          return;
        }

        if (hideTimeoutId) {
          clearTimeout(hideTimeoutId);
        }

        _setVisible(true);
        changeVisible(true);
      },
      [hideTimeoutId, changeVisible]
    );

    const handleMouseOut = useCallback((): void => {
      const timeoutId = window.setTimeout(() => {
        _setVisible(false);
        changeVisible(false);
      }, hoverOutTimeout);

      setHideTimeoutId(timeoutId);
    }, [changeVisible, hoverOutTimeout]);

    const createContentObserver = useCallback(() => {
      if (popoverContentRef.current) {
        const observer = new ResizeObserver(() => {
          if (popperScheduleUpdateRef.current) {
            popperScheduleUpdateRef.current();
          }
        });

        popoverContentObserverRef.current = observer;

        observer.observe(popoverContentRef.current);
      }
    }, []);

    const destroyContentObserver = useCallback(() => {
      if (popoverContentObserverRef.current) {
        popoverContentObserverRef.current.disconnect();
      }
    }, []);

    const isVisible = visible === undefined ? _visible : visible;
    const events: IPopoverEvents = {};

    if (trigger === 'hover') {
      events.onMouseOver = handleMouseOver;
      events.onMouseOut = handleMouseOut;
    }

    useEffect(() => {
      if (autoContentSize) {
        if (isVisible) {
          createContentObserver();
        } else {
          destroyContentObserver();
        }
      }
    }, [
      autoContentSize,
      isVisible,
      createContentObserver,
      destroyContentObserver,
    ]);

    useEffect(
      () => () => {
        if (autoContentSize) {
          destroyContentObserver();
        }
      },
      [autoContentSize, destroyContentObserver]
    );

    useEffect(() => {
      if (trigger === 'click') {
        document.addEventListener('click', handleClick);

        return () => {
          document.removeEventListener('click', handleClick);
        };
      }

      return () => {};
    }, [trigger, handleClick]);

    return (
      <Popper
        position={position}
        autoFlip={autoFlip}
        positionFixed={positionFixed}
        visible={isVisible}
        modifiers={popperModifiers}>
        {(popperProps: IRenderPopperProps) => {
          popperScheduleUpdateRef.current = popperProps.scheduleUpdate;

          return (
            <PopoverWrapper
              className={`${className} at-popover__wrapper`}
              theme={theme}
              appearance={appearance}
              baseAppearance={baseAppearance}
              ref={(node) => {
                const { targetRef } = popperProps;

                targetRef.current = node?.firstChild;
                popoverTargetRef.current = node;
              }}
              {...events}>
              {children}
              {popperProps.visible && (
                <Content
                  className="at-popover__content"
                  ref={(node) => {
                    const { contentRef } = popperProps;

                    contentRef.current = node;
                    popoverContentRef.current = node;
                  }}
                  data-content-position={popperProps.position}
                  shouldFitContainer={shouldFitContainer}
                  theme={theme}
                  appearance={appearance}
                  baseAppearance={baseAppearance}
                  style={
                    convertStyles
                      ? convertStyles(popperProps.popperStyles)
                      : popperProps.popperStyles
                  }>
                  {content}
                  {withArrow && (
                    <Arrow
                      className="at-popover__arrow"
                      x-arrow=""
                      style={popperProps.arrowStyles}
                      data-arrow-position={popperProps.position}
                      theme={theme}
                      appearance={appearance}
                      baseAppearance={baseAppearance}
                    />
                  )}
                </Content>
              )}
            </PopoverWrapper>
          );
        }}
      </Popper>
    );
  }
);
