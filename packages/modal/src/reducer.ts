import { XCRITICAL_MODAL_OPEN, XCRITICAL_MODAL_CLOSE } from './consts';
import { IModalStore, ModalActions } from './interfaces';


export const modalReducer = (state: IModalStore = {}, action: ModalActions): IModalStore => {
  switch (action.type) {
    case XCRITICAL_MODAL_OPEN: {
      const { name } = action.payload;
      const stateCopy = { ...state };

      if (!stateCopy[name]) {
        stateCopy[name] = { isOpen: true };
      }

      return stateCopy;
    }
    case XCRITICAL_MODAL_CLOSE: {
      const { name } = action.payload;
      const stateCopy = { ...state };

      if (stateCopy[name]) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete stateCopy[name];
      }

      return stateCopy;
    }
    default:
      return state;
  }
};
