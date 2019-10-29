import { mergeDeep } from 'utilitify';
import { Modifiers } from 'popper.js';


const getDefaultModifiers = (): Modifiers => ({
  applyStyle: { enabled: false },
});

const getAutoFlipModifiers = (autoFlip: boolean): Modifiers => ({
  preventOverflow: {
    enabled: autoFlip,
  },
  flip: {
    enabled: autoFlip,
    padding: 0,
  },
  hide: {
    enabled: autoFlip,
  },
});

// Modifiers documentation: https://popper.js.org/popper-documentation.html#modifiers
export const getModifiers = (autoFlip: boolean, modifiers?: Modifiers): Modifiers => {
  const defaultModifiers = getDefaultModifiers();
  const autoFlipModifiers = getAutoFlipModifiers(autoFlip);
  return mergeDeep(defaultModifiers, autoFlipModifiers, modifiers);
};
