import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  MutableRefObject,
  MouseEvent
} from "react";
import { HeaderCellWrapper } from "./HeaderCell";
import { Header, MovingElem } from "./styled";
import { IHeaderWrapper, IColumn } from "./interfaces";

export const HeaderWrapper = ({
  fullWidth,
  translateX,
  columns,
  onChangeWidth,
  onChangeMoving,
  changeIsSelectable,
  theme
}: IHeaderWrapper) => {
  const mappedColumns = useRef(columns);
  const [isMoving, changeIsMoving] = useState(false);
  const clickX = useRef(0);
  const movingColumnIndex = useRef<number>();
  const movingColumnData = useRef<IColumn>();
  const movingElemRect = useRef<ClientRect>();
  const headerRef = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
  const emptyColumnIndex = useRef<number>();
  const [mouseMove, changeMouseMove] = useState(0);
  const [startCoord, changeStartCoord] = useState({ x: 0, y: 0, height: 0 });
  const startClickX = useRef(0);

  useEffect(() => {
    mappedColumns.current = columns;
    changeStartCoord({ x: 0, y: 0, height: 0 });
  }, [columns]);

  const handleMouseMove = useCallback(
    e => {
      const { clientX } = e;
      const moveMouse = clientX - clickX.current;

      const emptyIdx = emptyColumnIndex?.current || 0;

      if (moveMouse < 0) {
        if (mappedColumns.current[emptyIdx - 1]) {
          if (-moveMouse >= mappedColumns.current[emptyIdx - 1].width / 2) {
            clickX.current -= mappedColumns.current[emptyIdx - 1].width;

            const newMappedColumns = [...mappedColumns.current];

            [newMappedColumns[emptyIdx], newMappedColumns[emptyIdx - 1]] = [
              newMappedColumns[emptyIdx - 1],
              newMappedColumns[emptyIdx]
            ];

            mappedColumns.current = newMappedColumns;
            emptyColumnIndex.current = emptyIdx - 1;
          }
        }
      } else if (moveMouse > 0) {
        if (mappedColumns.current[emptyIdx + 1]) {
          if (moveMouse >= mappedColumns.current[emptyIdx + 1].width / 2) {
            clickX.current += mappedColumns.current[emptyIdx + 1].width;
            const newMappedColumns = [...mappedColumns.current];

            [newMappedColumns[emptyIdx], newMappedColumns[emptyIdx + 1]] = [
              newMappedColumns[emptyIdx + 1],
              newMappedColumns[emptyIdx]
            ];

            mappedColumns.current = newMappedColumns;
            emptyColumnIndex.current = emptyIdx + 1;
          }
        }
      }
      changeMouseMove(clientX - startClickX.current);
    },
    [emptyColumnIndex]
  );

  const handleMouseUp = () => {
    emptyColumnIndex.current = undefined;
    changeIsMoving(false);
    changeMouseMove(0);
    onChangeMoving(mappedColumns.current);
    movingColumnIndex.current = 0;
    movingColumnData.current = undefined;
    document.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("mousemove", handleMouseMove);
    changeIsSelectable(false);
  };

  const handleMouseDown = (e: MouseEvent, i: number) => {
    clickX.current = e.clientX;
    startClickX.current = e.clientX;
    const coords = e?.currentTarget?.getBoundingClientRect();
    changeStartCoord({
      x: coords.left - +headerRef?.current?.getBoundingClientRect()?.left,
      y: coords.y,
      height: coords.height
    });
    changeIsMoving(true);
    movingElemRect.current = e?.currentTarget?.getBoundingClientRect();
    movingColumnIndex.current = i;
    emptyColumnIndex.current = i;
    movingColumnData.current = mappedColumns.current[i];
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    changeIsSelectable(true);
  };

  return (
    <Header ref={headerRef} width={fullWidth} translateX={translateX} theme={theme}>
      {mappedColumns.current.map((el: IColumn, index: number) => (
        <HeaderCellWrapper
          isEmpty={index === emptyColumnIndex.current}
          onMouseDown={handleMouseDown}
          width={mappedColumns.current.length === index + 1 ? el.width + 9 : el.width}
          text={el.headerName}
          onChangeWidth={onChangeWidth}
          index={index}
          changeIsSelectable={changeIsSelectable}
          center={!!el.center}
          theme={theme}
        />
      ))}
      {isMoving && (
        <MovingElem
          startCoord={startCoord}
          mouseMove={mouseMove}
          width={movingColumnData?.current?.width || 0} /* можно ли исправить эти костыли? */
          center={!!movingColumnData?.current?.center}
          theme={theme}
        >
          <span>{movingColumnData?.current?.headerName}</span>
        </MovingElem>
      )}
    </Header>
  );
};
