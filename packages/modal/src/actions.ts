import { XCRITICAL_MODAL_OPEN, XCRITICAL_MODAL_CLOSE } from './consts';
import { IModalOpen, IModalClose } from './interfaces';


export function xcriticalModalOpen(name: string): IModalOpen {
  return {
    type: XCRITICAL_MODAL_OPEN,
    payload: {
      name,
    },
  };
}

export function xcriticalModalClose(name: string): IModalClose {
  return {
    type: XCRITICAL_MODAL_CLOSE,
    payload: {
      name,
    },
  };
}
