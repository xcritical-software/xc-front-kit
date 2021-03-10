import {
  ReactChildren,
  ComponentType,
  RefObject,
  ReactNode,
} from 'react';

import { ITheme, ICSSProperties, AllType } from '@xcritical/theme';


export interface IDrawerTheme extends ICSSProperties {
  borderRadius?: number;
  outline?: string;
}

export type DrawerTheme = ITheme<IDrawerTheme>;

export interface IDrawerProps {
  children?: AllType;
  appearance?: string;
  baseAppearance?: string;
  isOpen?: boolean;
  position?: string;
  theme: DrawerTheme;
  disabled?: boolean;
  isRTL?: boolean;
  isMovable?: boolean;
  withCloseButton?: boolean;
  closeIconComponent?: ReactNode;
  minWidth?: number;
  maxWidth?: number;
  onOutsideClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onClose?: () => void;
  withBlanket?: boolean;
  zIndex?: number;
}

export interface IDrawerStates {
  width?: number | string;
  ref?: RefObject<HTMLElement>;
}

export interface IReturnFunction<TValue> {
  (
    theme: DrawerTheme,
    elementName: string,
    appearance?: string,
    baseAppearance?: string,
  ): TValue;
}

export interface IDrawerWrapperProps {
  children?: ReactChildren;
  shouldUnmountOnExit?: boolean;
  style: object;
}

export interface IStyles {
  [index: string]: string | number | null;
}

export interface ITransitionProps extends Pick<
IDrawerProps,
'appearance' | 'baseAppearance' | 'zIndex'
>{
  component?: ComponentType<any> | string;
  children?: any;
  onExited?: (node: HTMLElement) => void;
  shouldUnmountOnExit?: boolean;
  in: boolean;
  theme: DrawerTheme;
}

export interface IHandlerProps {
  defaultStyles: IStyles;
  transitionProps?: {
    appear: boolean;
    mountOnEnter: boolean;
    unmountOnExit: boolean;
  };
  transitionStyles: {
    entering?: IStyles;
    entered?: IStyles;
    exiting?: IStyles;
    exited?: IStyles;
  };
}

export interface IIconWrapperProps {
  onClick?: any;
}
