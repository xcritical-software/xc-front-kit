import styled from 'styled-components';
import { 
  getLeftBackground,
  getRightBackground,
  getSeparatorColor,
  getColor
 } from '../utils'


interface IProps {
  theme?: object;
  appearance: string;
  baseAppearance: string;
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
background-color: ${getSeparatorColor};
  width: 2px;
  height: 100% ;
  float: right;
  position: relative;
  right: 10px;

`;
  //  ${getSeparatorColor}
  /* color: ${getColor}; */
// color: ${({ theme: { color } } : ISidebarWrapper) => color};
/* ${SidebarWrapperStyled} */
export const SidebarWrapper = styled.div<IProps>`
color: ${getColor};
  height: 100vh ;
  position: fixed;
  top: 0;
  left: 0;
`


// background-color: ${({ theme: { leftBackground } }: INavComponentWrapper) => leftBackground}; 
export const NavComponentWrapper = styled.div<IProps>`
background-color: ${getLeftBackground}; 
  height: calc(100vh + 10px);
  float: left;
`




export const ChildWrapper = styled.div`
background-color:  ${getRightBackground};
  top: 0;
  bottom:0;
  position: fixed;
  display: inline-block;
  overflow-y:auto;
  overflow-x:hidden;
  ${({ animate }: IChildWrapper): string | null => (animate ? 'transition: .5s' : null)};
`;
// background-color: ${({ theme: { rightBackground } }: IChildWrapper) => rightBackground };



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

