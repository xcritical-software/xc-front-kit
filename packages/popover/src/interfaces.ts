import { MouseEvent } from 'react';
import { CSSObject } from 'styled-components';
import { IThemeNamespace } from '@xcritical/theme';
import { Position } from '@xcritical/popper';


export interface IPopover {
  children: any;
  content: any;
  position: Position;
  autoFlip?: boolean;
  positionFixed?: boolean;
  shouldFitContainer?: boolean;
  withArrow?: boolean;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  trigger?: 'hover' | 'click';
  theme?: IThemeNamespace<IPopoverTheme>;
  appearance?: string;
  baseAppearance?: string;
}

export interface IPopoverTheme {
  content?: CSSObject & {
    offset?: string;
  };
  arrow?: {
    offset?: string;
    size?: string;
    background?: string;
    border?: {
      width?: string;
      color?: string;
    };
  };
}

export interface IPopoverEvents {
  onMouseOver?: (e: MouseEvent) => void;
  onMouseOut?: (e: MouseEvent) => void;
}

export interface IContent extends IThemed {
  shouldFitContainer?: boolean;
}

export interface IThemed {
  theme: IThemeNamespace<IPopoverTheme>;
  appearance: string;
  baseAppearance: string;
}

export type ArrowDirection ='top' | 'right' | 'bottom' | 'left';
