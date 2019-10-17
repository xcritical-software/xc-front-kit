import { mergeDeep } from 'utilitify';
import { Modifiers } from 'popper.js';


const getDefaultModifiers = (): Modifiers => ({
  applyStyle: { enabled: false },
});

const getAutoFlipModifiers = (autoFlip: boolean): Modifiers => {
  if (autoFlip) {
    return {
      flip: {
        enabled: true,
        padding: 0,
      },
    };
  }

  return {
    preventOverflow: {
      enabled: false,
    },
    flip: {
      enabled: false,
    },
    hide: {
      enabled: false,
    },
  };
};

export const getModifiers = (autoFlip: boolean, modifiers?: Modifiers): Modifiers => {
  const defaultModifiers = getDefaultModifiers();
  const autoFlipModifiers = getAutoFlipModifiers(autoFlip);
  return mergeDeep(defaultModifiers, autoFlipModifiers, modifiers);
};
