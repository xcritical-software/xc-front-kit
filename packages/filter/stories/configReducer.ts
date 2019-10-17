import { GET_CONFIG_SUCCESS } from './consts';
import { IAction, IState } from './interfaces';


const defaultState = {
  config: {},
};

const config = (state: IState | {} = defaultState, action: IAction): any => {
  switch (action.type) {
    case GET_CONFIG_SUCCESS:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export { config };
