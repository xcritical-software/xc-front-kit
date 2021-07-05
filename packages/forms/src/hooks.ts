import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { IFormState, IFormStateMap } from './interfaces';
import { formSelector } from './reducers';

export function useForm<TFormFields extends Record<string | number, any>>(
  formName: string,
  namespace: string | undefined = undefined
): IFormState<TFormFields> {
  const $formSelector = useCallback(
    (state: IFormStateMap) =>
      formSelector<TFormFields>(state, formName, namespace),
    [namespace, formName]
  );

  return useSelector($formSelector);
}
