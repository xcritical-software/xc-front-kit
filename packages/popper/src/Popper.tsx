import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import styled from 'styled-components';
import PopperJS, { Data } from 'popper.js';
import rafSchedule from 'raf-schd';

import ContentContainer from './contentContainer';
import {
  positionPropToPopperPosition,
  calculateMaxHeight,
  fixPositionTopUnderflow,
} from './utils';
import {
  IPopperProps, IPopperState, IFixedOffset, IFixedTargetProps,
} from './interfaces';


const FixedTarget = styled.div<IFixedTargetProps>`
  ${({ fixedOffset, targetRef }) => {
    if (fixedOffset && targetRef) {
      const actualTarget = targetRef.firstChild;
      const rect = actualTarget.getBoundingClientRect();
      return `
        position: fixed;
        top: ${fixedOffset.top}px;
        left: ${fixedOffset.left}px;
        height: ${rect.height}px;
        width: ${rect.width}px;
        z-index: -1;
      `;
    }
    return 'display: none;';
  }};
`;

const Popper = (props: IPopperProps): React.ReactElement => {
  const {
    autoFlip = true,
    boundariesElement = 'viewport',
    children = null,
    content = null,
    offset = '0,0',
    position: propsPosition = 'right middle',
    zIndex = 400,
    isAlwaysFixed = false,
    onPositioned = () => { },
  } = props;

  const popper = useRef<PopperJS>();
  const fixedRef = useRef<any>();
  const contentRef = useRef<any>();
  const targetRef = useRef<any>();

  const [state, setState] = useState<IPopperState>({
    hasExtractedStyles: false,
    cssPosition: 'absolute',
    originalHeight: null,
    maxHeight: null,
  });

  const [fixedOffset, setFixedOffset] = useState<IFixedOffset>();


  const extractStyles = useRef(rafSchedule((($state: Data) => {
    if ($state) {
      const popperHeight = $state.offsets.popper.height;
      const left = Math.round($state.offsets.popper.left);
      const top = fixPositionTopUnderflow(
        $state.offsets.popper.top,
        'initial', // TODO: maybe not needed
      );

      const originalHeight = state.originalHeight || popperHeight;
      const maxHeight = calculateMaxHeight(
        popperHeight,
        top,
        'initial',
        boundariesElement,
        state.originalHeight,
      );

      setState({
        originalHeight,
        hasExtractedStyles: true,
        cssPosition: 'initial',
        transform: `translate3d( ${left}px, ${top}px, 0px)`,
        maxHeight,
      });
    }
  })));


  const applyPopper = useCallback(() => {
    const actualTarget = isAlwaysFixed
      ? fixedRef.current
      : targetRef.current && targetRef.current.firstChild;

    const popperOpts: PopperJS.PopperOptions = {
      placement: positionPropToPopperPosition(propsPosition),
      onCreate: extractStyles.current,
      onUpdate: extractStyles.current,
      modifiers: {
        applyStyle: {
          enabled: false,
        },
        hide: {
          enabled: false,
        },
        offset: {
          enabled: true,
          offset,
        },
        flip: {
          enabled: !!autoFlip,
          flipVariations: true,
          boundariesElement,
          padding: 0, // leave 0 pixels between popper and the boundariesElement
        },
        preventOverflow: {
          enabled: !!autoFlip,
          escapeWithReference: !(
            boundariesElement === 'scrollParent'
          ),
        },
      },
    };

    popper.current = new PopperJS(actualTarget, contentRef.current, popperOpts);
  }, [autoFlip, boundariesElement, isAlwaysFixed, offset, propsPosition]);

  const calculateFixedOffset = useCallback(() => {
    if (isAlwaysFixed && targetRef.current) {
      const actualTarget = targetRef.current.firstChild;
      setFixedOffset({
        top: actualTarget.getBoundingClientRect().top,
        left: actualTarget.getBoundingClientRect().left,
      });
    } else if (!isAlwaysFixed && fixedOffset !== null) {
      setFixedOffset(undefined);
    }
  }, [fixedOffset, isAlwaysFixed]);

  useEffect(() => {
    applyPopper();
    calculateFixedOffset();
  }, [applyPopper, calculateFixedOffset]);

  useEffect(() => {
    applyPopper();
    calculateFixedOffset();
  }, [applyPopper, calculateFixedOffset, props]);

  useEffect(() => {
    if (state.hasExtractedStyles && onPositioned) {
      onPositioned();
    }
  });

  useEffect(() => () => {
    extractStyles.current.cancel();
    if (popper.current) {
      popper.current.destroy();
    }
  });

  const {
    hasExtractedStyles,
    maxHeight,
    cssPosition,
    transform,
  } = state;
  const opacity = hasExtractedStyles ? {} : { opacity: 0 };

  return (
    <div>
      <div
        ref={ targetRef }
      >
        { children }
      </div>
      <FixedTarget targetRef={ targetRef.current } fixedOffset={ fixedOffset }>
        <div
          style={ { height: '100%', width: '100%' } }
          ref={ fixedRef }
        />
      </FixedTarget>
      <ContentContainer maxHeight={ maxHeight }>
        <div
          ref={ contentRef }
          style={ {
            top: 0,
            left: 0,
            position: cssPosition,
            transform,
            zIndex,
            ...opacity,
          } }
        >
          { content }
        </div>
      </ContentContainer>
    </div>
  );
};

export {
  Popper,
};
