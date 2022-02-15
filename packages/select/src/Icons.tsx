import { Property } from 'csstype';
import React from 'react';

export const ChevronUp = ({ fill = '#A7A7A7' }: { fill?: Property.Color }) => (
  <svg
    width="12"
    height="8"
    viewBox="0 0 12 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.6 7.40002L6 2.80002L1.39999 7.40003L-1.22391e-07 6.00003L6 3.10421e-05L12 6.00003L10.6 7.40002Z"
      fill={fill}
    />
  </svg>
);

export const ChevronDown = ({
  fill = '#A7A7A7',
}: {
  fill?: Property.Color;
}) => (
  <svg
    width="12"
    height="8"
    viewBox="0 0 12 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.39999 0L6 4.84211L10.6 0L12 1.47368L6 7.78947L0 1.47368L1.39999 0Z"
      fill={fill}
    />
  </svg>
);

export const Close = ({
  fill = '#A7A7A7',
  size = 12,
}: {
  fill?: Property.Color;
  size?: number;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 14 14">
    <path
      d="M142-60.59,140.59-62,135-56.41,129.41-62,128-60.59,133.59-55,128-49.41,129.41-48,135-53.59,140.59-48,142-49.41,136.41-55Z"
      transform="translate(-128 62)"
      fill={fill}
    />
  </svg>
);
