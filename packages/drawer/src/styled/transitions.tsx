import React, { ComponentType, forwardRef, RefAttributes } from 'react';
import { Transition } from 'react-transition-group';
import { ThemeProvider } from 'styled-components';

import { transitionDurationMs, transitionTimingFunction } from '../consts';
import {
  IDrawerProps,
  IDrawerStates,
  ITransitionProps,
  IHandlerProps,
} from '../interfaces';


const defaultTransitionProps = {
  appear: true,
  mountOnEnter: true,
  unmountOnExit: true,
};

const TransitionHandler = forwardRef<
HTMLElement, ITransitionProps & IDrawerProps & IHandlerProps
>(({
  component = 'div',
  in: inProp,
  onExited,
  defaultStyles,
  transitionStyles,
  transitionProps = defaultTransitionProps,
  theme,
  ...rest
}: ITransitionProps & IHandlerProps, ref) => {
  const timeout = { enter: 0, exit: transitionDurationMs };

  return (
    <Transition
      in={ inProp }
      onExited={ onExited }
      timeout={ timeout }
      { ...transitionProps }
    >
      { (state: keyof IHandlerProps['transitionStyles']) => {
        const style = {
          ...defaultStyles,
          ...transitionStyles[state],
        };

        const Tag: ComponentType<any> | string = component;

        return (
          <ThemeProvider theme={ theme }>
            <Tag ref={ ref } style={ style } { ...rest } />
          </ThemeProvider>
        );
      } }
    </Transition>
  );
});

export const Fade = forwardRef<
HTMLElement, ITransitionProps & RefAttributes<HTMLElement>
>(({ ...props }, ref) => (
  <TransitionHandler
    ref={ ref }
    defaultStyles={ {
      transition: `opacity ${transitionDurationMs}ms ${transitionTimingFunction}`,
      opacity: 0,
      position: 'fixed',
      zIndex: 0,
    } }
    transitionStyles={ {
      entering: { opacity: 0 },
      entered: { opacity: 1 },
    } }
    { ...props }
  />
));

export const Slide = forwardRef<HTMLElement, ITransitionProps & IDrawerProps & IDrawerStates>(({
  shouldUnmountOnExit = true,
  isRTL,
  ...props
}, ref) => (
  <TransitionHandler
    ref={ ref }
    isRTL={ isRTL }
    defaultStyles={ {
      transition:
        `transform ${transitionDurationMs}ms ${transitionTimingFunction}, `
        + `width ${transitionDurationMs}ms ${transitionTimingFunction}`,
      transform: `translate3d(${isRTL ? '100%' : '-100%'},0,0)`,
    } }
    transitionStyles={ {
      entered: { transform: null },
      exited: { transform: `translate3d(${isRTL ? '100%' : '-100%'},0,0)` },
    } }
    transitionProps={ {
      ...defaultTransitionProps,
      ...{ unmountOnExit: shouldUnmountOnExit },
    } }
    { ...props }
  />
));
