import { ITheme, ICSSProperties, AllType } from '@xcritical/theme';


export interface IBlanketTheme extends ICSSProperties {
  background: string;
  color: string;
  opacity: number;
}

export type BlanketTheme = ITheme<IBlanketTheme>;

export interface IBlanketProps {
  children?: AllType;
  theme: BlanketTheme;
  /** Whether mouse events can pierce the blanket. If true, onBlanketClicked will not be fired */
  canClickThrough?: boolean;
  /** Whether the blanket has a tinted background color. */
  isTinted?: boolean;
  /** Handler function to be called when the blanket is clicked */
  onBlanketClicked?: (event: React.MouseEvent<HTMLDivElement>) => void;
}
