import { IStoreWithModal, IModalStore } from './interfaces';


export const getModal = (state: IStoreWithModal): IModalStore => state.modal;
