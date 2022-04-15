import React, { ReactElement } from 'react';

export interface IArrowProps {
  classNamePrefix?: string;
}

const Arrow: React.FC<IArrowProps> = ({ classNamePrefix }): ReactElement => (
  <svg
    className={classNamePrefix && `${classNamePrefix}__button-icon`}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32.635 32.635">
    <g>
      <path
        d="M32.135,16.817H0.5c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h31.635c0.276,0,0.5,0.224,0.5,0.5
S32.411,16.817,32.135,16.817z"
      />
      <path
        d="M19.598,29.353c-0.128,0-0.256-0.049-0.354-0.146c-0.195-0.195-0.195-0.512,0-0.707l12.184-12.184L19.244,4.136
c-0.195-0.195-0.195-0.512,0-0.707s0.512-0.195,0.707,0l12.537,12.533c0.094,0.094,0.146,0.221,0.146,0.354
s-0.053,0.26-0.146,0.354L19.951,29.206C19.854,29.304,19.726,29.353,19.598,29.353z"
      />
    </g>
  </svg>
);

export default Arrow;
