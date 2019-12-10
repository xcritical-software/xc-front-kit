import { GET_CONFIG_SUCCESS } from './consts';
import { IActionPayload } from './interfaces';


export function getConfigSuccess(payload: IActionPayload): any {
  return {
    type: GET_CONFIG_SUCCESS,
    payload,
  };
}
