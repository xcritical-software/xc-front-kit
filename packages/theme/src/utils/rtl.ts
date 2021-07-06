type ArrayOfStringsOrNumbers = (number | string)[];

export const rtlSide = (isRTL: boolean, property: string): string => {
  if (isRTL) {
    if (property === 'left') {
      return 'right';
    }

    if (property === 'right') {
      return 'left';
    }
  }

  return property;
};

export interface IIsRTL {
  isRTL?: boolean;
}

export const rtlSwapper = (
  isRTL: boolean,
  left: number | string,
  right: number | string
): ArrayOfStringsOrNumbers => {
  if (isRTL) {
    return [right, left];
  }

  return [left, right];
};
