import React from 'react';

import { IIcon } from '../../interfaces';

export const Remove: React.FC<IIcon> = ({ size = 15, classNamePrefix }) => (
  <svg
    className={classNamePrefix && `${classNamePrefix}__remove-icon`}
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 28.285 28.284">
    <path
      d="M615-265a10,10,0,0,0-10,10,10,10,0,0,0,10,10,10,10,0,0,0,10-10A10,10,0,0,0,615-265Zm5,11h-4v4h-2v-4h-4v-2h4v-4h2v4h4Z"
      transform="translate(-601.041 -240.416) rotate(45)"
      fill="inherit"
    />
  </svg>
);
