import { IThemeNamespace } from '@xcritical/theme';
import { Position } from '@xcritical/popper';


export interface IPopover {
  children: any;
  content: any;
  position: Position;
  autoFlip?: boolean;
  visible?: boolean;
  withArrow?: boolean;
  theme?: IThemeNamespace<IPopperTheme>;
  appearance?: string;
  baseAppearance?: string;
}

export interface IPopperTheme {
  content?: {
    offset?: string;
    background?: string;
    padding?: {
      top?: string;
      right?: string;
      bottom?: string;
      left?: string;
    };
    border?: {
      width?: string;
      radius?: string;
      color?: string;
    };
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

export interface IThemed {
  theme: IThemeNamespace<IPopperTheme>;
  appearance: string;
  baseAppearance: string;
}

export type ArrowDirection ='top' | 'right' | 'bottom' | 'left';
