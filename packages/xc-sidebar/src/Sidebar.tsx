import React, {
  useState, useCallback, ReactElement, useRef, useEffect, ReactNode,
} from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import ResizeObserver from 'resize-observer-polyfill';
import Arrow from './Arrow';
import { sidebarThemeNamespace } from './theme';
import {
  ResponsiveWrapper,
  RightBorder,
  CloseOpenButton,
  RightBorderWrapper,
  AntiSelect,
  ChildWrapper,
  SidebarWrapper,
  NavComponentWrapper,
} from './styled/Sidebar';


// interface ITheme {
//   minWidth : number,
//   maxWidth : number,
//   separatorColor : string,
//   leftWidth : number,
//   color: string,
//   leftBackground: string,
//   rightBackground: string
// }


interface IWrapperProps {
  navComponent?: ReactNode;
  children?: ReactNode;
  theme: object;
  alwaysShowScrollbar: boolean;
  appearance?: string;
  baseAppearance?: string;
}


export const Sidebar = ({
  theme,
  children,
  navComponent,
  alwaysShowScrollbar,
  appearance = 'default',
  baseAppearance = 'default',
}: IWrapperProps): ReactElement => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [transformParams, setTransformParams] = useState({
    width: theme[sidebarThemeNamespace].appearance[appearance || baseAppearance].maxWidth * 0.7,
    animate: false,
    arrowToRight: false,
  });
  let clickX = 0;
  let componentObserver: null | ResizeObserver = null;
  const [antiSelectLayer, changeAntiSelectLayer] = useState(false);
  const handleMouseMove = useCallback((e) => {
    changeAntiSelectLayer(true);
    document.body.addEventListener('mouseup', () => {
      document.body.removeEventListener('mousemove', handleMouseMove);
      changeAntiSelectLayer(false);
    });

    const { clientX: currentX } = e;
    const newWidth = transformParams.width + (currentX - clickX);
    if (newWidth >= theme[sidebarThemeNamespace].appearance[appearance || baseAppearance].maxWidth) return;
    if (newWidth <= 0) {
      document.body.removeEventListener('mousemove', handleMouseMove);
      setTransformParams({
        width: theme[sidebarThemeNamespace].appearance[appearance || baseAppearance].minWidth,
        animate: false,
        arrowToRight: true,
      });
    } else if (newWidth <= theme[sidebarThemeNamespace].appearance[appearance || baseAppearance].minWidth) {
      setTransformParams({
        width: theme[sidebarThemeNamespace].appearance[appearance || baseAppearance].minWidth,
        animate: false,
        arrowToRight: true,
      });
    } else {
      setTransformParams({
        width: newWidth,
        animate: false,
        arrowToRight: newWidth < theme[sidebarThemeNamespace].appearance[appearance || baseAppearance].maxWidth * 0.3,
      });
    }
  }, [appearance, baseAppearance, clickX, theme, transformParams.width]);

  const handleMouseDown = useCallback((e) => {
    clickX = e.clientX;
    document.body.addEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const handleClose = useCallback(() => {
    document.body.removeEventListener('mousemove', handleMouseMove);
    if (transformParams.width < theme[sidebarThemeNamespace].appearance[appearance || baseAppearance].maxWidth * 0.3) {
      setTransformParams({
        width: theme[sidebarThemeNamespace].appearance[appearance || baseAppearance].maxWidth,
        animate: true,
        arrowToRight: false,
      });
    } else {
      setTransformParams({
        width: theme[sidebarThemeNamespace].appearance[appearance || baseAppearance].minWidth,
        animate: true,
        arrowToRight: true,
      });
    }
  }, [appearance, baseAppearance, handleMouseMove, theme, transformParams.width]);


  const handleRemoveMouseMove = useCallback(() => {
    document.body.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    if (sidebarRef.current === null) {
      return;
    }
    const observer = new ResizeObserver(() => {
      if (sidebarRef.current === null) {
        return;
      }
      const parentNode = sidebarRef.current.parentNode as HTMLElement;
      const parentRect = parentNode.getBoundingClientRect();
      parentNode.style.paddingLeft = `${sidebarRef.current.offsetWidth}px`;
      sidebarRef.current.style.left = `${parentRect.left}px`;
    });
    observer.observe(sidebarRef.current);
    componentObserver = observer;
  }, []);

  useEffect(() => () => {
    if (componentObserver && sidebarRef.current) {
      componentObserver.unobserve(sidebarRef.current);
      if (componentObserver.disconnect) {
        componentObserver.disconnect();
      }
    }
  }, [componentObserver]);
  const leftWidth = alwaysShowScrollbar ? theme[sidebarThemeNamespace].appearance[appearance || baseAppearance].leftWidth : theme[sidebarThemeNamespace].appearance[appearance || baseAppearance].leftWidth + 10;
  const responsiveWrapperStyles = {
    width: transformParams.width,
    marginLeft: alwaysShowScrollbar ? 0 : '-10px',
  };
  const rightWidth = alwaysShowScrollbar ? transformParams.width : transformParams.width + 10;


  return (
    <SidebarWrapper
      ref={ sidebarRef }
      theme={ theme }
      appearance={ appearance }
      baseAppearance={ baseAppearance }
    >
      { navComponent
        && (
          <NavComponentWrapper
            theme={ theme }
            appearance={ appearance }
            baseAppearance={ baseAppearance }
          >
            <Scrollbars style={ { width: leftWidth } }>
              { navComponent }
            </Scrollbars>
          </NavComponentWrapper>
        )
      }
      <ResponsiveWrapper animate={ transformParams.animate } style={ responsiveWrapperStyles }>
        <RightBorderWrapper onMouseDown={ handleMouseDown } onMouseUp={ handleRemoveMouseMove }>
          <RightBorder
            theme={ theme }
            appearance={ appearance }
            baseAppearance={ baseAppearance }
          >
            <CloseOpenButton toRight={ transformParams.arrowToRight } onClick={ handleClose }>
              <Arrow />
            </CloseOpenButton>
          </RightBorder>
        </RightBorderWrapper>
        { antiSelectLayer && <AntiSelect /> }
        <ChildWrapper
          theme={ theme }
          style={ { width: transformParams.width } }
          animate={ transformParams.animate }
          appearance={ appearance }
          baseAppearance={ baseAppearance }
        >
          <Scrollbars style={ { width: rightWidth, transition: transformParams.animate ? '0.5s' : '0s' } }>
            { children }
          </Scrollbars>
        </ChildWrapper>
      </ResponsiveWrapper>
    </SidebarWrapper>
  );
};
