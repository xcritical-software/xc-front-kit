import { XCRITICAL_MODAL_OPEN, XCRITICAL_MODAL_CLOSE } from './consts';
import { IModalStore, ModalActions } from './interfaces';


export const modalReducer = (state: IModalStore = {}, action: ModalActions): IModalStore => {
  switch (action.type) {
    case XCRITICAL_MODAL_OPEN: {
      const { name } = action.payload;

      return {
        ...state,
        [name]: { isOpen: true },
      };
    }
    case XCRITICAL_MODAL_CLOSE: {
      const { name } = action.payload;

      if (state[name]) {
        const newState = { ...state };
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete newState[name];
        return newState;
      }

      return state;
    }
    default:
      return state;
  }
};
