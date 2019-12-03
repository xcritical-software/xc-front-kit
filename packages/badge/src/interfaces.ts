import {
  ITheme,
  IThemeNamespace,
  ICSSProperties,
} from '@xcritical/theme';

import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface IBaseBadgeTheme extends ICSSProperties {
  prefixSpacing?: number;
  postfixSpacing?: number;
  boxShadowColor?: string;
  _outline?: ICSSProperties;
}

export type BadgeTheme = ITheme<IBaseBadgeTheme>;

export interface IThemeBadgeProps {
  theme?: IThemeNamespace<BadgeTheme>;
  appearance?: string;
  baseAppearance?: string;
}


export interface IBadgeProps extends IThemeBadgeProps,
  DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
}
