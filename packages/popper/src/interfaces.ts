import { Boundary } from 'popper.js';
// eslint-disable-next-line import/no-unresolved
import { PositionProperty } from 'csstype';


export interface IPopperProps {
  autoFlip?: boolean;
  content?: any;
  isAlwaysFixed?: boolean;
  zIndex?: number;
  children?: any;
  position?: string;
  offset?: string;
  boundariesElement?: Boundary;
  onPositioned?: Function;
}

export interface IPopperState {
  transform?: string;
  hasExtractedStyles: boolean | null;
  cssPosition?: PositionProperty;
  originalHeight: number | null;
  maxHeight: number | null;
}

export interface IFixedOffset {
  top: number;
  left: number;
}

export interface IFixedTargetProps {
  fixedOffset?: IFixedOffset;
  targetRef?: any;
}
