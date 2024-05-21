/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PropsWithChildren } from 'react';

interface IIconProps {
  color?: string;
  size?: string | number | undefined;
  className?: string;
  children?: PropsWithChildren['children'];
}

export const AddIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 30 30">
    <g id="ic_add" transform="translate(-4548 -3846)">
      <rect
        id="Base"
        width="16"
        height="16"
        transform="translate(4548 3846)"
        fill="none"
      />
      <path
        id="Icon"
        d="M502-254h-6v6h-2v-6h-6v-2h6v-6h2v6h6v2Z"
        transform="translate(4068 4116)"
        fill="#000"
        fillRule="evenodd"
      />
    </g>
  </svg>
);

export const RemoveIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 30 30">
    <g id="ic_remove" transform="translate(-3998 -3896)">
      <rect
        id="Base"
        width="16"
        height="16"
        transform="translate(3998 3896)"
        fill="none"
      />
      <path
        id="Icon"
        d="M62-214H48v-2H62Z"
        transform="translate(3958 4126)"
        fill="#000"
      />
    </g>
  </svg>
);

export const SortAscendingIcon = React.memo<IIconProps>(
  ({ color = 'currentColor', size = 24, children: _, ...props }) => (
    <svg {...props} width={size} height={size} fill={color} viewBox="0 0 24 24">
      <path d="M19 7H22L18 3L14 7H17V21H19M2 17H6V19H2M12 5V7H2V5M2 11H9V13H2Z" />
    </svg>
  )
);

export const SortDescendingIcon = React.memo<IIconProps>(
  ({ color = 'currentColor', size = 24, children, ...props }) => (
    <svg {...props} width={size} height={size} fill={color} viewBox="0 0 24 24">
      <path d="M19 17H22L18 21L14 17H17V3H19M2 17H6V19H2M12 5V7H2V5M2 11H9V13H2Z" />
    </svg>
  )
);
