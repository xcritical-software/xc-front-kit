import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  MouseEvent,
} from 'react';
import { HeaderCellWrapper } from './HeaderCell';
import { Header, MovingElem } from './styled';
import { IHeaderWrapper, IColumn, SortOrder } from './interfaces';
import { searchLastVisible, searchNextVisible } from './utils';
import { setIn } from 'utilitify';


export const HeaderWrapper: React.FC<IHeaderWrapper> = ({
  fullWidth,
  translateX,
  columns,
  onChangeWidth,
  onChangeMoving,
  onChangeSorting,
  setChangingColumns,
  theme,
  shouldMovingColumns,
  shouldChangeColumnsWidth,
}) => {
  const mappedColumnsRef = useRef(columns);
  const [isMoving, setIsMoving] = useState(false);
  const clickXRef = useRef(0);
  const movingColumnIndexRef = useRef<number>();
  const movingColumnDataRef = useRef<IColumn>();
  const headerRef = useRef<HTMLDivElement>(null);
  const emptyColumnIndexRef = useRef<number>();
  const [mouseMove, setMouseMove] = useState(0);
  const [startCoord, setStartCoord] = useState({ x: 0, y: 0, height: 0 });
  const startClickXRef = useRef(0);

  useEffect(() => {
    mappedColumnsRef.current = columns;
    setStartCoord({ x: 0, y: 0, height: 0 });
  }, [columns]);

  const handleMouseMove = useCallback(
    (e) => {
      setIsMoving(true);
      const { clientX } = e;
      const moveMouse = clientX - clickXRef.current;

      const emptyIdx = emptyColumnIndexRef.current || 0;
      const leftColumnIndex = searchLastVisible(mappedColumnsRef.current, emptyIdx);
      const rightColumnIndex = searchNextVisible(mappedColumnsRef.current, emptyIdx);

      if (moveMouse < 0) {
        if (mappedColumnsRef.current[leftColumnIndex]) {
          if (-moveMouse >= mappedColumnsRef.current[leftColumnIndex].width / 2) {
            clickXRef.current -= mappedColumnsRef.current[leftColumnIndex].width;

            const newMappedColumns = [...mappedColumnsRef.current];

            [newMappedColumns[emptyIdx], newMappedColumns[leftColumnIndex]] = [
              newMappedColumns[leftColumnIndex],
              newMappedColumns[emptyIdx],
            ];

            mappedColumnsRef.current = newMappedColumns;
            emptyColumnIndexRef.current = leftColumnIndex;
          }
        }
      } else if (moveMouse > 0) {
        if (mappedColumnsRef.current[rightColumnIndex]) {
          if (moveMouse >= mappedColumnsRef.current[rightColumnIndex].width / 2) {
            clickXRef.current += mappedColumnsRef.current[rightColumnIndex].width;
            const newMappedColumns = [...mappedColumnsRef.current];

            [newMappedColumns[emptyIdx], newMappedColumns[rightColumnIndex]] = [
              newMappedColumns[rightColumnIndex],
              newMappedColumns[emptyIdx],
            ];

            mappedColumnsRef.current = newMappedColumns;
            emptyColumnIndexRef.current = rightColumnIndex;
          }
        }
      }
      setMouseMove(clientX - startClickXRef.current);
    },
    [emptyColumnIndexRef],
  );

  const handleMouseUp = () => {
    emptyColumnIndexRef.current = undefined;
    setIsMoving(false);
    setMouseMove(0);
    onChangeMoving(mappedColumnsRef.current);
    movingColumnIndexRef.current = 0;
    movingColumnDataRef.current = undefined;
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleMouseMove);
    setChangingColumns('');
  };

  const handleMouseDown = (e: MouseEvent, i: number) => {
    if (!shouldMovingColumns) return;
    clickXRef.current = e.clientX;
    startClickXRef.current = e.clientX;
    const coords = e.currentTarget.getBoundingClientRect();
    setStartCoord({
      x: coords.left - Number(headerRef.current?.getBoundingClientRect()?.left),
      y: coords.y,
      height: coords.height,
    });
    movingColumnIndexRef.current = i;
    emptyColumnIndexRef.current = i;
    movingColumnDataRef.current = mappedColumnsRef.current[i];
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    setChangingColumns('move');
  };

  const onClick = useCallback((sortable, sortOrder, index) => {
    if (!sortable) return;
    // ask => desk => null => ask
    let newSortOrder: null | SortOrder.ask | SortOrder.desk = null;
    if (!sortOrder) newSortOrder = SortOrder.ask;
    if (sortOrder === 'ask') newSortOrder = SortOrder.desk;
    if (sortOrder === 'desk') newSortOrder = null;

    const removedSorting = mappedColumnsRef.current.map(el => {
      if (el.sortOrder) return {
        ...el,
        sortOrder: null,
      }
      return el
    })
    const newColumns = setIn(removedSorting, newSortOrder, [index, 'sortOrder']);
    onChangeMoving(newColumns);
  }, [])


  return (
    <Header ref={ headerRef } width={ fullWidth } translateX={ translateX } theme={ theme }>
      { mappedColumnsRef.current.map((el: IColumn, index: number) => (
        el.visible
        && (
          <HeaderCellWrapper
            sortable={el.sortable}
            sortOrder={el.sortOrder}
            key={ el.field }
            isEmpty={ index === emptyColumnIndexRef.current }
            onMouseDown={ handleMouseDown }
            width={ el.width }
            text={ el.headerName }
            onChangeWidth={ onChangeWidth }
            index={ index }
            setChangingColumns={ setChangingColumns }
            center={ !!el.center }
            theme={ theme }
            shouldMovingColumns={ shouldMovingColumns }
            shouldChangeColumnsWidth={ shouldChangeColumnsWidth }
            onClick={ onClick }
          />
        )
      )) }
      { isMoving && (
        <MovingElem
          startCoord={ startCoord }
          mouseMove={ mouseMove }
          width={ movingColumnDataRef.current?.width || 0 }
          center={ !!movingColumnDataRef.current?.center }
          theme={ theme }
        >
          <span>{ movingColumnDataRef.current?.headerName }</span>
        </MovingElem>
      ) }
    </Header>
  );
};
