import React from 'react';

import { IIcon } from '../../interfaces';

export const Plus: React.FC<IIcon> = ({ classNamePrefix }) => (
  <svg
    className={classNamePrefix && `${classNamePrefix}--plus-icon`}
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14">
    <path
      d="M502-254h-6v6h-2v-6h-6v-2h6v-6h2v6h6v2Z"
      transform="translate(-488 262)"
      fill="inherit"
      fillRule="evenodd"
    />
  </svg>
);
