import React, { useState, useRef } from 'react';
import Popper, { IRenderPopperProps } from '@xcritical/popper';

// eslint-disable-next-line import/no-extraneous-dependencies
import isUndefined from 'lodash/isUndefined';

import { IPopover } from './interfaces';
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
  theme,
  appearance = 'default',
  baseAppearance = 'default',
}) => {
  const popperRef = useRef<HTMLDivElement | null>();

  const [_visible, _setVisible] = useState(false);
  const [hideTimeoutId, setHideTimeoutId] = useState<null | number>(null);

  const handleMouseOver = (e: React.MouseEvent): void => {
    if (e.target === popperRef.current) {
      return;
    }

    if (hideTimeoutId) {
      clearTimeout(hideTimeoutId);
    }

    _setVisible(true);

    if (onVisibleChange) {
      onVisibleChange(true);
    }
  };

  const handleMouseOut = (): void => {
    const timeoutId = setTimeout(() => {
      _setVisible(false);

      if (onVisibleChange) {
        onVisibleChange(false);
      }
    }, 200);

    setHideTimeoutId(timeoutId);
  };

  return (
    <Popper
      position={ position }
      autoFlip={ autoFlip }
      visible={ isUndefined(visible) ? _visible : visible }
    >
      { (popperProps: IRenderPopperProps) => (
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        <PopperWrapper
          ref={ (node) => {
            const { targetRef } = popperProps;

            targetRef.current = node && node.firstChild;
            popperRef.current = node;
          } }
          onMouseOver={ handleMouseOver }
          onMouseOut={ handleMouseOut }
        >
          { children }
          { popperProps.visible && (
            <Content
              ref={ popperProps.contentRef }
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
