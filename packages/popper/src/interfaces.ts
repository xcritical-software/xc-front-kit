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
  children?: any;
  content?: any;
  eventsEnabled?: boolean;
  modifiers?: Modifiers;
  position?: Position;
  positionFixed?: boolean;
  autoFlip?: boolean;
}

export interface IPopperState {
  popperStyles: object;
  arrowStyles: object;
  position: Position;
}

export interface IContent {
  position: Position;
  arrowStyles: object;
}
