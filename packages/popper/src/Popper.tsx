import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';

import PopperJS, { Data } from 'popper.js';
import rafSchedule from 'raf-schd';

import { IPopperProps, IPopperState } from './interfaces';
import { getPopperPlacementByPosition, getPositionByPopperPlacement } from './utils/helpers';
import { getModifiers } from './utils/modifiers';


export const Popper: React.FC<IPopperProps> = ({
  children,
  modifiers,
  position = 'bottom center',
  eventsEnabled = true,
  positionFixed = false,
  autoFlip = true,
  visible = true,
}) => {
  const popperInstance = useRef<PopperJS>();
  const targetRef = useRef<any>();
  const contentRef = useRef<any>();

  const [state, setState] = useState<IPopperState>({
    popperStyles: {
      position: 'absolute',
      top: 0,
      left: 0,
      opacity: 0,
      pointerEvents: 'none',
    },
    arrowStyles: {},
    position,
  });

  const scheduleSetState = useRef(rafSchedule((data: Data) => {
    setState({
      popperStyles: data.styles,
      arrowStyles: data.arrowStyles,
      position: getPositionByPopperPlacement(data.placement),
    });
  }));

  const destroyPopperInstance = (): void => {
    if (popperInstance.current) {
      popperInstance.current.destroy();
    }
  };

  const getOptions = useCallback((): PopperJS.PopperOptions => ({
    placement: getPopperPlacementByPosition(position),
    eventsEnabled,
    positionFixed,
    onCreate: scheduleSetState.current,
    onUpdate: scheduleSetState.current,
    modifiers: getModifiers(autoFlip, modifiers),
  }), ([position, eventsEnabled, positionFixed, autoFlip, modifiers]));

  useEffect(() => {
    destroyPopperInstance();

    if (!visible) {
      return;
    }

    if (!targetRef.current || !contentRef.current) {
      return;
    }

    const popperOptions = getOptions();

    popperInstance.current = new PopperJS(
      targetRef.current,
      contentRef.current,
      popperOptions,
    );
  }, [getOptions, visible]);

  useEffect(() => () => {
    destroyPopperInstance();
  }, []);

  return children({
    targetRef,
    contentRef,
    visible,
    position: state.position,
    arrowStyles: state.arrowStyles,
    popperStyles: state.popperStyles,
  });
};
