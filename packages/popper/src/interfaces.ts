import { MutableRefObject } from 'react';
import { Modifiers } from 'popper.js';


export type Position =
  'top left'
  | 'top center'
  | 'top right'
  | 'right top'
  | 'right middle'
  | 'right bottom'
  | 'bottom left'
  | 'bottom center'
  | 'bottom right'
  | 'left top'
  | 'left middle'
  | 'left bottom';

export interface IPopperProps {
  children: any;
  eventsEnabled?: boolean;
  modifiers?: Modifiers;
  position?: Position;
  positionFixed?: boolean;
  autoFlip?: boolean;
  visible?: boolean;
}

export interface IPopperState {
  popperStyles: object;
  arrowStyles: object;
  position: Position;
}

export interface IRenderPopperProps {
  targetRef: MutableRefObject<any>;
  contentRef: MutableRefObject<any>;
  visible: boolean;
  position: Position;
  arrowStyles: object;
  popperStyles: object;
  scheduleUpdate: Function;
}
