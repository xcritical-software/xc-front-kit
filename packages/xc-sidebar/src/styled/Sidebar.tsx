import styled from 'styled-components';


interface IResponsiveWrapper {
  animate: boolean;
  color: string;
  backgroundColor: string;
}
interface IChildWrapper {
  animate: boolean;
}

interface IRightBorder {
  seperatorColor: string;
}

interface ICloseOpenButton {
  toRight: boolean;
}

export const ResponsiveWrapper = styled.div`
  color: ${({ color }: IResponsiveWrapper): string => color};
  min-height: 100vh ;
  display: inline-block;
  background-color: ${({ backgroundColor }: IResponsiveWrapper): string => backgroundColor };
  ${({ animate }: IResponsiveWrapper): string | null => (animate ? 'transition: .5s' : null)}
`;


export const RightBorder = styled.div`
  width: 2px;
  background-color: ${({ seperatorColor }: IRightBorder): string => seperatorColor};
  height: 100% ;
  float: right;
  position: relative;
  right: 10px;
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

export const SidebarWrapper = styled.div`
  height: 100vh ;
  position: fixed;
  top: 0;
  left: 0;
`

export const ChildWrapper = styled.div`
  top: 0;
  bottom:0;
  position: fixed;
  display: inline-block;
  overflow-y:auto;
  overflow-x:hidden; 
  ${({ animate }: IChildWrapper): string | null => (animate ? 'transition: .5s' : null)}
`;

export const NavComponentWrapper = styled.div`
height: calc(100vh + 10px);
float: left;
`