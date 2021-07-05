import { MouseEvent } from 'react';
import { CSSObject, CSSProperties } from 'styled-components';

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
  autoContentSize?: boolean;
  preventOverflowViewport?: boolean;
  hoverOutTimeout?: number;
  trigger?: 'hover' | 'click';
  onVisibleChange?: (visible: boolean) => void;
  theme?: IThemeNamespace<IPopoverTheme>;
  appearance?: string;
  baseAppearance?: string;
  convertStyles?: (styles: CSSProperties) => CSSProperties;
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
  wrapper?: CSSObject;
}

export interface IPopoverEvents {
  onMouseOver?: (e: MouseEvent) => void;
  onMouseOut?: (e: MouseEvent) => void;
}

export interface IContent extends IThemed {
  shouldFitContainer?: boolean;
}

export type IWrapperProps = IThemed;

export interface IThemed {
  theme: IThemeNamespace<IPopoverTheme>;
  appearance: string;
  baseAppearance: string;
}

export type ArrowDirection = 'top' | 'right' | 'bottom' | 'left';
