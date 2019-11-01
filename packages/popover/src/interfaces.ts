import { CSSObject } from 'styled-components';
import { IThemeNamespace } from '@xcritical/theme';
import { Position } from '@xcritical/popper';


export interface IPopover {
  children: any;
  content: any;
  position: Position;
  autoFlip?: boolean;
  visible?: boolean;
  fullWidthContent?: boolean;
  withArrow?: boolean;
  theme?: IThemeNamespace<IPopperTheme>;
  appearance?: string;
  baseAppearance?: string;
}

export interface IPopperTheme {
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

export interface IContent extends IThemed {
  fullWidthContent?: boolean;
}

export interface IThemed {
  theme: IThemeNamespace<IPopperTheme>;
  appearance: string;
  baseAppearance: string;
}

export type ArrowDirection ='top' | 'right' | 'bottom' | 'left';
