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
    {...p}
  />
);
