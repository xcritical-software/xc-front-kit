import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { SvgAttributes } from 'csstype';


export const Svg: React.FC<React.SVGAttributes<SvgAttributes>> = (p: any) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    focusable="false"
    role="presentation"
    { ...p }
  />
);

export const ChevronUp = () => (
  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" style={ { marginRight: '-6px' } } xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.6 7.40002L6 2.80002L1.39999 7.40003L-1.22391e-07 6.00003L6 3.10421e-05L12 6.00003L10.6 7.40002Z"
      fill="#A7A7A7"
    />
  </svg>
);

export const ChevronDown = () => (
  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" style={ { marginRight: '-6px' } } xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.39999 0L6 4.84211L10.6 0L12 1.47368L6 7.78947L0 1.47368L1.39999 0Z"
      fill="#A7A7A7"
    />
  </svg>
);


export const DropdownIndicator = () => (
  <div style={ { height: 24, width: 32 } }>
    <Svg>
      <path
        d="M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
        fillRule="evenodd"
        fill="#A7A7A7"
      />
    </Svg>
  </div>
);
