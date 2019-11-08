export * from './getStyles';


export const getElement = (disabled: boolean, href?: string): string => {
  if (href) {
    return disabled ? 'span' : 'a';
  }
  return 'button';
};
