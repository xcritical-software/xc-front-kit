import styled from 'styled-components';


interface IProps {
  theme: object;
}


interface IResponsiveWrapper {
  animate: boolean;
}
interface IChildWrapper extends IProps {
  animate: boolean;
}


interface ICloseOpenButton {
  toRight: boolean;
}


export const RightBorder = styled.div<IProps>`
  background-color: ${({ theme: { separatorColor } }) => separatorColor};
  width: 2px;
  height: 100% ;
  float: right;
  position: relative;
  right: 10px;

`;
export const SidebarWrapper = styled.div<IProps>`
  color: ${({ theme: { color } }) => color};
  height: 100vh ;
  position: fixed;
  top: 0;
  left: 0;
`;

export const NavComponentWrapper = styled.div<IProps>`
  background-color: ${({ theme: { leftBackground } }) => leftBackground};
  height: calc(100vh + 10px);
  float: left;
`;


export const ChildWrapper = styled.div<IChildWrapper>`
  background-color: ${({ theme: { rightBackground } }) => rightBackground};
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
  ${({ animate }: IResponsiveWrapper): string | null => (animate ? 'transition: .5s' : null)}
`;

export const CloseOpenButton = styled.button`
  width: 20px;
  height: 20px;
  position: relative;
  top: 10%;
  color: black;
  right: 9px;
  border-radius: 50%;
  border: 1px solid gray;
  padding: 3px;
  background-color: white;
  transform: ${({ toRight }: ICloseOpenButton): string => (toRight ? 'rotateZ(-360deg)' : 'rotateZ(180deg)')};
  transition: .5s;
  transition-timing-function: linear;
  cursor: pointer;
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
