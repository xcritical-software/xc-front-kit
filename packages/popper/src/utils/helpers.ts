// eslint-disable-next-line import/no-unresolved
import { PositionProperty } from 'csstype';
import { Placement } from 'popper.js';


const positionMap = {
  'top,left': {
    position: 'top-start',
    animation: 'top',
  },
  'top,center': {
    position: 'top',
    animation: 'top',
  },
  'top,right': {
    position: 'top-end',
    animation: 'top',
  },
  'right top': {
    position: 'right-start',
    animation: 'right',
  },
  'right middle': {
    position: 'right',
    animation: 'right',
  },
  'right bottom': {
    position: 'right-end',
    animation: 'right',
  },
  'bottom left': {
    position: 'bottom-start',
    animation: 'bottom',
  },
  'bottom center': {
    position: 'bottom',
    animation: 'bottom',
  },
  'bottom right': {
    position: 'bottom-end',
    animation: 'bottom',
  },
  'left top': {
    position: 'left-start',
    animation: 'left',
  },
  'left middle': {
    position: 'left',
    animation: 'left',
  },
  'left bottom': {
    position: 'left-end',
    animation: 'left',
  },
};

export const POSITION_ATTRIBUTE_ENUM = {
  values: [
    'top left',
    'top center',
    'top right',
    'right top',
    'right middle',
    'right bottom',
    'bottom left',
    'bottom center',
    'bottom right',
    'left top',
    'left middle',
    'left bottom',
  ],
  default: 'right middle',
};

function positionToPopper(position: string): string | null {
  return position && positionMap[position]
    ? positionMap[position].position
    : null;
}

export function positionPropToPopperPosition(position: string): Placement {
  return (
    positionToPopper(position)
    || positionMap[POSITION_ATTRIBUTE_ENUM.default].position
  );
}


export const calculateMaxHeight = (
  currentHeight: number,
  positionTop: number,
  cssPosition: PositionProperty,
  boundariesElement: string,
  originalHeight: number | null,
): number | null => {
  let DocumentElementClientHeight = 0;

  if (document.documentElement) {
    DocumentElementClientHeight = document.documentElement.clientHeight;
  }
  if (
    cssPosition !== 'fixed'
    || boundariesElement !== 'viewport'
  ) {
    return null;
  }
  const viewportHeight = Math.max(
    DocumentElementClientHeight,
    window.innerHeight || 0,
  );
  return viewportHeight < (originalHeight as number)
    && currentHeight + positionTop >= viewportHeight - 50
    ? viewportHeight - 12
    : null;
};

export const fixPositionTopUnderflow = (popperTop: number, cssPosition: PositionProperty): number => (popperTop >= 0 || cssPosition !== 'fixed'
  ? Math.round(popperTop)
  : 0);
