import React, { memo, forwardRef } from 'react';
import { IBadgeProps } from './interfaces';
import { BadgeRoot } from './styled';


const PureBadge: React.FC<IBadgeProps> = forwardRef(({
  children,
  ...rest
}, ref) => (
  <BadgeRoot
    { ...rest }
    ref={ ref }
  >
    { children }
  </BadgeRoot>
));

export const Badge = memo(PureBadge);
