import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';

import Popper, { IRenderPopperProps } from '@xcritical/popper';

import { IPopover, IPopoverEvents } from './interfaces';
import { Content, Arrow, PopperWrapper } from './styles';


export const Popover: React.FC<IPopover> = ({
  position,
  content,
  autoFlip,
  children,
  visible,
  onVisibleChange,
  withArrow = true,
  shouldFitContainer = false,
  trigger = 'hover',
  theme,
  appearance = 'default',
  baseAppearance = 'default',
}) => {
  const popoverTargetRef = useRef<any>();
  const popoverContentRef = useRef<any>();

  const [_visible, _setVisible] = useState(false);
  const [hideTimeoutId, setHideTimeoutId] = useState<null | number>(null);

  const changeVisible = useCallback((newVisible: boolean) => {
    if (onVisibleChange) {
      onVisibleChange(newVisible);
    }
  }, [onVisibleChange]);

  const handleClick = useCallback((e: Event): void => {
    if (popoverContentRef.current && popoverContentRef.current.contains(e.target)) {
      return;
    }

    if (e.target === popoverTargetRef.current) {
      _setVisible(false);
      changeVisible(false);
      return;
    }

    if (popoverTargetRef.current && popoverTargetRef.current.contains(e.target)) {
      _setVisible(!_visible);
      changeVisible(!_visible);
      return;
    }

    _setVisible(false);
    changeVisible(false);
  }, [_visible, changeVisible]);

  useEffect(() => {
    if (trigger === 'click') {
      document.addEventListener('click', handleClick);

      return () => {
        document.removeEventListener('click', handleClick);
      };
    }

    return () => {};
  }, [trigger, handleClick]);

  const handleMouseOver = useCallback((e: React.MouseEvent): void => {
    if (e.target === popoverTargetRef.current) {
      return;
    }

    if (hideTimeoutId) {
      clearTimeout(hideTimeoutId);
    }

    _setVisible(true);
    changeVisible(true);
  }, [hideTimeoutId, changeVisible]);

  const handleMouseOut = useCallback((): void => {
    const timeoutId = setTimeout(() => {
      _setVisible(false);
      changeVisible(false);
    }, 150);

    setHideTimeoutId(timeoutId);
  }, [changeVisible]);

  const events: IPopoverEvents = {};

  if (trigger === 'hover') {
    events.onMouseOver = handleMouseOver;
    events.onMouseOut = handleMouseOut;
  }

  return (
    <Popper
      position={ position }
      autoFlip={ autoFlip }
      visible={ visible === undefined ? _visible : visible }
    >
      { (popperProps: IRenderPopperProps) => (
        <PopperWrapper
          ref={ (node) => {
            const { targetRef } = popperProps;

            targetRef.current = node && node.firstChild;
            popoverTargetRef.current = node;
          } }
          { ...events }
        >
          { children }
          { popperProps.visible && (
            <Content
              ref={ (node) => {
                const { contentRef } = popperProps;

                contentRef.current = node;
                popoverContentRef.current = node;
              } }
              data-content-position={ position }
              shouldFitContainer={ shouldFitContainer }
              theme={ theme }
              appearance={ appearance }
              baseAppearance={ baseAppearance }
              style={ popperProps.popperStyles }
            >
              { content }
              { withArrow && (
                <Arrow
                  x-arrow=""
                  style={ popperProps.arrowStyles }
                  data-arrow-position={ popperProps.position }
                  theme={ theme }
                  appearance={ appearance }
                  baseAppearance={ baseAppearance }
                />
              ) }
            </Content>
          ) }
        </PopperWrapper>
      ) }
    </Popper>
  );
};
