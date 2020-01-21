import { XCRITICAL_MODAL_OPEN, XCRITICAL_MODAL_CLOSE } from './consts';
import { IModalOpen, IModalClose } from './interfaces';


export function xcriticalModalOpen(name: string, payload?: Record<string, any>): IModalOpen {
  return {
    type: XCRITICAL_MODAL_OPEN,
    payload,
    meta: {
      name,
    },
  };
}

export function xcriticalModalClose(name: string): IModalClose {
  return {
    type: XCRITICAL_MODAL_CLOSE,
    meta: {
      name,
    },
  };
}
