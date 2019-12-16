import { ButtonTags } from '../interfaces';


export * from './getStyles';

export const getElement = (disabled: boolean, href?: string): ButtonTags => {
  if (href) {
    return disabled ? 'span' : 'a';
  }

  return 'button';
};
