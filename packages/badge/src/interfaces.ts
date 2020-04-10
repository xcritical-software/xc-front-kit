import { CSSObject } from 'styled-components';

import {
  ITheme,
  IThemeNamespace,
  ICSSProperties,
} from '@xcritical/theme';


export interface IBaseBadgeTheme extends ICSSProperties {
  ghost?: ICSSProperties;
}

export type BadgeTheme = ITheme<IBaseBadgeTheme>;

export interface IThemeBadgeProps {
  theme?: IThemeNamespace<BadgeTheme>;
  appearance?: string;
  baseAppearance?: string;
  ghost?: boolean;
  styles?: CSSObject;
}
