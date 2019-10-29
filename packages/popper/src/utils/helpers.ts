import { Placement } from 'popper.js';

import { Position } from '../interfaces';


const positionMap: Record<Position, Placement> = {
  'top left': 'top-start',
  'top center': 'top',
  'top right': 'top-end',
  'right top': 'right-start',
  'right middle': 'right',
  'right bottom': 'right-end',
  'bottom left': 'bottom-start',
  'bottom center': 'bottom',
  'bottom right': 'bottom-end',
  'left top': 'left-start',
  'left middle': 'left',
  'left bottom': 'left-end',
};

export const getPopperPlacementByPosition = (position: Position): Placement => (
  positionMap[position]
);

export const getPositionByPopperPlacement = (placement: Placement): Position => {
  const position = Object.keys(positionMap).find((key) => positionMap[key] === placement);
  return position as Position;
};
