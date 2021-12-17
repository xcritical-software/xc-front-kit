import React, { ReactElement } from 'react';

export const ArrowLeft = (): ReactElement => (
  <svg
    className="at-drawer--icon-arrow-left"
    style={{ width: '24px', height: '24px' }}
    viewBox="0 0 24 24">
    <path
      fill="#000000"
      d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"
    />
  </svg>
);

export const ArrowRight = (): ReactElement => (
  <svg
    className="at-drawer--icon-arrow-right"
    style={{ width: '24px', height: '24px' }}
    viewBox="0 0 24 24">
    <path
      fill="#000000"
      d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
    />
  </svg>
);
