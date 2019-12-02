import React, {
  useRef, useCallback, useState, useEffect,
} from 'react';
import { RightBorder, HeaderCell, HeaderCellContent } from './styled';
import { IHeaderCellWrapper } from './interfaces';


export const HeaderCellWrapper = ({
  text,
  width,
  onChangeWidth,
  index,
  onMouseDown,
  isEmpty,
  changeChangingColumns,
  center,
  theme,
  shouldMovingColumns,
  shouldChangeColumnsWidth,
}: IHeaderCellWrapper) => {
  const [newWidth, changeNewWidth] = useState(width);
  const clickX = useRef(0);
  const widthRef = useRef(width);

  useEffect(() => {
    changeNewWidth(width);
  }, [width]);

  const handleMouseMove = useCallback(
    (e) => {
      const { clientX: currentX } = e;
      const calcNewWidth = width + (currentX - clickX.current);
      if (calcNewWidth >= 1200) return;
      if (calcNewWidth <= 30) {
        changeNewWidth(30);
        widthRef.current = 30;
      } else {
        changeNewWidth(calcNewWidth);
        widthRef.current = calcNewWidth;
      }
    },
    [width],
  );

  const handleMouseUp = useCallback(() => {
    onChangeWidth(index, widthRef.current);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleMouseMove);
    changeChangingColumns('');
  }, [changeChangingColumns, handleMouseMove, index, onChangeWidth]);

  const handleMouseDown = useCallback(
    (e) => {
      if (!shouldChangeColumnsWidth) return;
      clickX.current = e.clientX;
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mousemove', handleMouseMove);
      changeChangingColumns('resize');
    },
    [changeChangingColumns, handleMouseMove, handleMouseUp, shouldChangeColumnsWidth],
  );
  return (
    <HeaderCell theme={ theme } width={ newWidth }>
      <HeaderCellContent
        theme={ theme }
        isEmpty={ isEmpty }
        onMouseDown={ (e) => onMouseDown(e, index) }
        center={ center }
        shouldMovingColumns={ shouldMovingColumns }
      >
        <span>{ isEmpty ? null : text }</span>
      </HeaderCellContent>
      <RightBorder
        theme={ theme }
        onMouseDown={ handleMouseDown }
        isEmpty={ isEmpty }
        shouldChangeColumnsWidth={ shouldChangeColumnsWidth }
      />
    </HeaderCell>
  );
};
