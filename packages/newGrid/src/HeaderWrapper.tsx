import React, { useState, useRef, useEffect, useCallback } from "react";
import { HeaderCellWrapper } from "./HeaderCell";
import { Header, MovingElem } from "./styleds";


export const HeaderWrapper = ({
  fullWidth,
  translateX,
  columns,
  onChangeWidth,
  onChangeMoving,
  changeIsSelectable
}: any) => {
  const mappedColumns = useRef(columns);
  const [isMoving, changeIsMoving] = useState(false);
  const clickX = useRef(0);
  const movingColumnIndex = useRef<any>();
  const movingColumnData = useRef();
  const movingElemRect = useRef()
  const headerRef = useRef() as any;
  const emptyColumnIndex = useRef() as any;
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

      const emptyIdx =  emptyColumnIndex.current;


      if (moveMouse < 0) {
        if (mappedColumns.current[emptyIdx - 1]) {
          if (-moveMouse >= mappedColumns.current[emptyIdx - 1].width / 2) {
            clickX.current -= mappedColumns.current[emptyIdx - 1].width;

            let newMappedColumns = [...mappedColumns.current];

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
            let newMappedColumns = [...mappedColumns.current];

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
    [mappedColumns.current, clickX.current]
  );

  const handleMouseUp = () => {
    emptyColumnIndex.current = null;
    changeIsMoving(false);
    changeMouseMove(0);
    onChangeMoving(mappedColumns.current);
    movingColumnIndex.current = 0;
    movingColumnData.current = undefined;
    document.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("mousemove", handleMouseMove);
    changeIsSelectable(false)
  };

  const handleMouseDown = (e: any, i: any) => {
    clickX.current = e.clientX;
    startClickX.current = e.clientX;
    const coords = e.currentTarget.getBoundingClientRect();
    changeStartCoord({
      x: coords.left - headerRef.current.getBoundingClientRect().left,
      y: coords.y,
      height: coords.height
    });
    changeIsMoving(true);
    movingElemRect.current = e.target.getBoundingClientRect();
    movingColumnIndex.current = i;
    emptyColumnIndex.current = i;
    movingColumnData.current = mappedColumns.current[i];
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    changeIsSelectable(true)
  };

  return (
    <Header
      ref={headerRef}
      width={fullWidth}
      translateX={translateX}
    >
      {mappedColumns.current.map((el: any, index: any) => (
        <HeaderCellWrapper
          isEmpty={index === emptyColumnIndex.current}
          onMouseDown={handleMouseDown}
          width={mappedColumns.current.length === index + 1 ? el.width + 9 : el.width}
          text={el.headerName}
          onChangeWidth={onChangeWidth}
          index={index}
          changeIsSelectable={changeIsSelectable}
          center={!!el.center}
        />
      ))}
      {isMoving && (
        <MovingElem
          startCoord={startCoord}
          mouseMove={mouseMove}
      width={/*movingColumnData.current.width*/ 150}
          center={/*!!movingColumnData.current.center*/ false }
        >
          <span>
            {/*movingColumnData.current.headerName*/ 'lol' }
          </span>
        </MovingElem>
      )}
    </Header>
  );
};
