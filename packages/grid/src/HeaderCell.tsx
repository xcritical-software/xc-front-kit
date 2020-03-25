import React, {
  useRef, useCallback, useState, useEffect,
} from 'react';
import { RightBorder, HeaderCell, HeaderCellContent } from './styled';
import { IHeaderCellWrapper } from './interfaces';


export const HeaderCellWrapper: React.FC<IHeaderCellWrapper> = ({
  text,
  width,
  onChangeWidth,
  index,
  onMouseDown,
  isEmpty,
  setChangingColumns,
  center,
  theme,
  shouldMovingColumns,
  shouldChangeColumnsWidth,
}) => {
  const [newWidth, setNewWidth] = useState(width);
  const clickXRef = useRef(0);
  const widthRef = useRef(width);

  useEffect(() => {
    setNewWidth(width);
  }, [width]);

  const handleMouseMove = useCallback(
    (e) => {
      const { clientX: currentX } = e;
      const calcNewWidth = width + (currentX - clickXRef.current);
      if (calcNewWidth >= 1200) return;
      if (calcNewWidth <= 30) {
        setNewWidth(30);
        widthRef.current = 30;
      } else {
        setNewWidth(calcNewWidth);
        widthRef.current = calcNewWidth;
      }
    },
    [width],
  );

  const handleMouseUp = useCallback(() => {
    onChangeWidth(index, widthRef.current);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleMouseMove);
    setChangingColumns('');
  }, [setChangingColumns, handleMouseMove, index, onChangeWidth]);

  const handleMouseDown = useCallback(
    (e) => {
      if (!shouldChangeColumnsWidth) return;
      clickXRef.current = e.clientX;
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mousemove', handleMouseMove);
      setChangingColumns('resize');
    },
    [setChangingColumns, handleMouseMove, handleMouseUp, shouldChangeColumnsWidth],
  );
  return (
    <HeaderCell theme={ theme } width={ newWidth } isEmpty={ isEmpty }>
      <HeaderCellContent
        theme={ theme }
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
