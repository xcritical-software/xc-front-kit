import { CSSObject } from 'styled-components';
import { IBlanketTheme } from '@xcritical/blanket';
import { IThemeNamespace } from '@xcritical/theme';

import { XCRITICAL_MODAL_OPEN, XCRITICAL_MODAL_CLOSE } from './consts';


/* ACTIONS */
export interface IModalOpen {
  type: typeof XCRITICAL_MODAL_OPEN;
  payload: {
    name: string;
  };
}

export interface IModalClose {
  type: typeof XCRITICAL_MODAL_CLOSE;
  payload: {
    name: string;
  };
}

export type ModalActions = IModalOpen | IModalClose;

/* STORE */
export interface IStoreWithModal {
  modal: IModalStore;
}

export interface IModalStore {
  [name: string]: {
    isOpen: boolean;
  };
}

/* COMPONENT */
export interface IModalOwnProps {
  name: string;
  title: any;
  children: any;
  onCancel?: () => void;
  theme?: IThemeNamespace<IModalTheme>;
}

export interface IModalStoreProps {
  isOpen: boolean;
}

export interface IModalDispatchProps {
  onModalCancel: () => void;
}

export interface IModalProps extends IModalOwnProps, IModalStoreProps, IModalDispatchProps {}

/* THEME */
export interface IModalTheme {
  blanket?: IBlanketTheme;
  content?: CSSObject;
  headerWrapper?: CSSObject;
  header?: CSSObject;
  iconClose?: CSSObject;
  body?: CSSObject;
}
