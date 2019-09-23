import styled from 'styled-components';


interface IResponsiveWrapper {
  animate: boolean;
  width: number;
  color: string;
  backgroundColor: string;
}
interface IChildWrapper {
  width: number;
  animate: boolean;
}

interface IRightBorder {
  seperatorColor: string;
}

interface ICloseOpenButton {
  toRight: boolean;
}

export const ResponsiveWrapper = styled.div`
  width: ${({ width }: IResponsiveWrapper): string => `${width}px`};
  color: ${({ color }: IResponsiveWrapper): string => color};
  min-height: 100vh ;
  position: fixed;
  top: 0;
  float: left;
  z-index: 999999999999999;
  background-color: ${({ backgroundColor }: IResponsiveWrapper): string => backgroundColor };
  ${({ animate }: IResponsiveWrapper): string | null => (animate ? 'transition: .5s' : null)}
`;


export const RightBorder = styled.div`
  width: 2px;
  background-color: ${({ seperatorColor }: IRightBorder): string => seperatorColor};
  height: 100% ;
  float: right;
  position: relative;
  right: 9px;
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
  width: 22px;
  height: 100vh ;
  float: right;
  right: -10px;
  position: absolute;
  cursor: w-resize;
  z-index: 9999999999999999;
`;

export const AntiSelect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999999;
`;


export const ChildWrapper = styled.div`
  top: 0;
  bottom:0;
  position: fixed; 
  overflow-y:auto;
  overflow-x:hidden; 
  width: ${({ width }: IChildWrapper): string => `${width}px`};
  ${({ animate }: IChildWrapper): string | null => (animate ? 'transition: .5s' : null)}
  -ms-overflow-style: none;
  ::-webkit-scrollbar { width: 0; }
`;
