import { IStoreWithModal, IModal } from './interfaces';


export const getModalByName = (state: IStoreWithModal, name: string): IModal => (
  state.modal[name] || { isOpen: false }
);
