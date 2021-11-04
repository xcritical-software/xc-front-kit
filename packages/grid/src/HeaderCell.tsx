import React, { useRef, useCallback, useState, useEffect } from 'react';

import { RightBorder, HeaderCell, HeaderCellContent } from './styled';
import { IHeaderCellWrapper } from './interfaces';
import { HeaderCellContentWrapper } from './HeaderCellContentWrapper';

export const HeaderCellWrapper: React.FC<IHeaderCellWrapper> = ({
  content,
  width,
  minColumnWidth,
  onChangeWidth,
  index,
  onMouseDown,
  isEmpty,
  setChangingColumns,
  center,
  theme,
  shouldMovingColumns,
  shouldChangeColumnsWidth,
  sortable,
  sortOrder,
  gridPosition,
  onChangeSort,
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

      if (calcNewWidth <= minColumnWidth) {
        setNewWidth(minColumnWidth);
        widthRef.current = minColumnWidth;
      } else {
        setNewWidth(calcNewWidth);
        widthRef.current = calcNewWidth;
      }
    },
    [width]
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
    [
      setChangingColumns,
      handleMouseMove,
      handleMouseUp,
      shouldChangeColumnsWidth,
    ]
  );

  return (
    <HeaderCell
      className="at-grid__header-cell"
      theme={theme}
      width={newWidth}
      isEmpty={isEmpty}>
      <HeaderCellContent
        className="at-grid__header-cell__content"
        theme={theme}
        center={center}
        onMouseDown={(e) => onMouseDown(e, index)}
        onClick={() => onChangeSort(sortable, sortOrder, index, gridPosition)}
        shouldMovingColumns={shouldMovingColumns}>
        <HeaderCellContentWrapper
          theme={theme}
          content={isEmpty ? null : content}
          sortOrder={sortOrder}
        />
      </HeaderCellContent>
      <RightBorder
        className="at-grid__header-cell__right-border"
        theme={theme}
        onMouseDown={handleMouseDown}
        isEmpty={isEmpty}
        shouldChangeColumnsWidth={shouldChangeColumnsWidth}
      />
    </HeaderCell>
  );
};
