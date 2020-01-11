import styled from 'styled-components';

import {
  IProps,
  IChildWrapper,
  IResponsiveWrapper,
  ICloseOpenButton,
} from './interfaces';


export const RightBorder = styled.div<IProps>`
  background-color: ${({ theme: { separatorColor } }: IProps) => separatorColor};
  width: 2px;
  height: 100% ;
  float: right;
  position: relative;
  right: 10px;
`;

export const SidebarWrapper = styled.div<IProps>`
  color: ${({ theme: { color } }: IProps) => color};
  z-index: ${({ theme: { zIndex } }: IProps) => zIndex};
  height: 100vh ;
  position: fixed;
  top: 0;
  left: 0;
`;

export const NavComponentWrapper = styled.div<IProps>`
  background-color: ${({ theme: { leftBackground } }: IProps) => leftBackground};
  height: calc(100vh + 10px);
  float: left;
`;

export const ChildWrapper = styled.div<IChildWrapper>`
  background-color: ${({ theme: { rightBackground } }: IProps) => rightBackground};
  top: 0;
  bottom:0;
  position: fixed;
  display: inline-block;
  overflow-y:auto;
  overflow-x:hidden;
  ${({ animate }): string | null => (animate ? 'transition: .5s' : null)};
`;

export const ResponsiveWrapper = styled.div<IResponsiveWrapper>`
  min-height: 100vh ;
  display: inline-block;
  ${({ animate }: IResponsiveWrapper) => (animate ? 'transition: .5s' : null)}
`;

export const CloseOpenButton = styled.button<ICloseOpenButton>`
  position: relative;
  transform: translateX(-50%) ${({ toRight }: ICloseOpenButton) => (toRight ? 'rotateZ(-360deg)' : 'rotateZ(180deg)')};
  transition: .5s;
  transition-timing-function: linear;
  cursor: pointer;
 
  ${({ cssStyles }: ICloseOpenButton) => cssStyles}

  &:focus {
    outline: none;
  }
`;

export const RightBorderWrapper = styled.div`
  width: 10px;
  height: 100vh ;
  float: right;
  right: -10px;
  position: absolute;
  cursor: w-resize;
  z-index: 999999;
`;

export const AntiSelect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999999;
`;
