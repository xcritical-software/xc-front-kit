import { CSSObject } from 'styled-components';

import { IBlanketTheme } from '@xcritical/blanket';
import { ITheme, IThemeNamespace } from '@xcritical/theme';

import { XCRITICAL_MODAL_OPEN, XCRITICAL_MODAL_CLOSE } from './consts';

/* ACTIONS */
export interface IModalOpen {
  type: typeof XCRITICAL_MODAL_OPEN;
  payload?: Record<string, any>;
  meta: {
    name: string;
  };
}

export interface IModalClose {
  type: typeof XCRITICAL_MODAL_CLOSE;
  meta: {
    name: string;
  };
}

export type ModalActions = IModalOpen | IModalClose;

/* STORE */
export interface IStoreWithModal {
  modal: IModalStore;
}

export interface IModalStore {
  [name: string]: IModal;
}

export interface IModal {
  [key: string]: any;
  isOpen: boolean;
}

/* COMPONENT */
export interface IIconCloseProps {
  className?: string;
}
export interface IModalOwnProps {
  name: string;
  title: any;
  children: any;
  iconClose?: IIconCloseProps;
  onCancel?: () => void;
  theme?: IThemeNamespace<IModalTheme>;
  zIndex?: number;
  minWidth?: string;
  maxWidth?: string;
  width?: string;
  height?: string;
  maxHeight?: string;
  minHeight?: string;
  appearance?: string;
}

export interface IModalStoreProps {
  isOpen: boolean;
}

export interface IModalDispatchProps {
  onModalCancel: () => void;
}

export interface IModalProps
  extends IModalOwnProps,
    IModalStoreProps,
    IModalDispatchProps {
  className?: string;
  classNamePrefix?: string;
}

export interface IBaseModalTheme {
  blanket?: IBlanketTheme;
  content?: CSSObject;
  headerWrapper?: CSSObject;
  header?: CSSObject;
  iconClose?: CSSObject;
  body?: CSSObject;
}
/* THEME */
export type IModalTheme = ITheme<IBaseModalTheme>;
