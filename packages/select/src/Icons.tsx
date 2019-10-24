import React from 'react';


export const ChevronUp = ({ fill = '#A7A7A7' }) => (
  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.6 7.40002L6 2.80002L1.39999 7.40003L-1.22391e-07 6.00003L6 3.10421e-05L12 6.00003L10.6 7.40002Z"
      fill={ fill }
    />
  </svg>
);

export const ChevronDown = ({ fill = '#A7A7A7' }) => (
  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.39999 0L6 4.84211L10.6 0L12 1.47368L6 7.78947L0 1.47368L1.39999 0Z"
      fill={ fill }
    />
  </svg>
);
