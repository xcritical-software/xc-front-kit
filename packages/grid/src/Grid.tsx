/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from 'styled-components';

import { IGridProps } from './interfaces';
import { gridTheme } from './utils';
import { InternalGrid } from './InternalGrid';

const Grid: React.FC<IGridProps> = ({
  items,
  columns,
  theme,
  shouldFitContainer,
  width = 0,
  height = 0,
  rowHeight,
  shouldChangeColumnsWidth = false,
  shouldMovingColumns,
  onSortChanged,
}) => {
  const contextTheme = useContext(ThemeContext);
  const themeRef = useRef(gridTheme(theme ?? contextTheme!));
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [wrapperSize, setWrapperSize] = useState({ width, height });

  const createObserver = (): ResizeObserver | undefined => {
    if (wrapperRef.current === null) {
      return undefined;
    }

    const observer = new ResizeObserver((): undefined => {
      if (wrapperRef.current === null) {
        return undefined;
      }

      setWrapperSize({
        width: wrapperRef.current.clientWidth,
        height: wrapperRef.current.clientHeight,
      });

      return undefined;
    });
    observer.observe(wrapperRef.current);

    return observer;
  };

  const observerRef: React.MutableRefObject<ResizeObserver | undefined> =
    useRef();

  useEffect(() => {
    if (shouldFitContainer) observerRef.current = createObserver();
  }, [shouldFitContainer]);

  useEffect(
    () => () => {
      if (shouldFitContainer && observerRef.current && wrapperRef.current) {
        observerRef.current.unobserve(wrapperRef.current);
        observerRef.current.disconnect();
      }
    },
    [observerRef, shouldFitContainer]
  );

  useEffect(() => {
    themeRef.current = gridTheme(theme ?? contextTheme!);
  }, [theme, contextTheme]);

  if (shouldFitContainer) {
    return (
      <div ref={wrapperRef} style={{ height: '100%' }}>
        <InternalGrid
          width={wrapperSize.width}
          height={wrapperSize.height}
          items={items}
          columns={columns}
          theme={theme}
          rowHeight={rowHeight}
          shouldChangeColumnsWidth={shouldChangeColumnsWidth}
          shouldMovingColumns={shouldMovingColumns}
          onSortChanged={onSortChanged}
        />
      </div>
    );
  }

  return (
    <InternalGrid
      width={wrapperSize.width}
      height={wrapperSize.height}
      items={items}
      columns={columns}
      theme={theme}
      rowHeight={rowHeight}
      shouldChangeColumnsWidth={shouldChangeColumnsWidth}
      shouldMovingColumns={shouldMovingColumns}
      onSortChanged={onSortChanged}
    />
  );
};

export default Grid;
