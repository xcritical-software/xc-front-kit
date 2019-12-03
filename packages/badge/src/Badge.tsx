import React, { memo, useRef } from 'react';
import { withTheme } from 'styled-components';
import { IBadgeProps } from './interfaces';
import { BadgeRoot } from './styled';


const PureBadge: React.FC<IBadgeProps> = ({
  children,
  ...rest
}) => {
  const badgeRef = useRef<HTMLSpanElement>(null);
  return (
    <BadgeRoot
      { ...rest }
      ref={ badgeRef }
    >
      { children }
    </BadgeRoot>
  );
};

export const Badge = memo(withTheme(PureBadge));
