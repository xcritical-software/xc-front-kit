import React from 'react';

import { IIcon } from '../../interfaces';

import { Svg } from './Svg';

export const DropdownIndicator: React.FC<IIcon> = ({ classNamePrefix }) => (
  <div style={{ height: 24, width: 32 }}>
    <Svg
      className={classNamePrefix && `${classNamePrefix}--dropdown-indicator`}>
      <path
        d="M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
        fillRule="evenodd"
        fill="#A7A7A7"
      />
    </Svg>
  </div>
);
