import { IStoreWithModal, IModal } from './interfaces';

const initialModalState = { isOpen: false };

export const getModalByName = (state: IStoreWithModal, name: string): IModal =>
  state.modal[name] || initialModalState;
