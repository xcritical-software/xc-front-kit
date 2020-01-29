import React, {
  useState, useEffect, useRef,
} from 'react';
import ResizeObserver from 'resize-observer-polyfill';

import { ScrollSync } from 'react-virtualized';
import { CSSProperties } from 'styled-components';
import Grid from './Grid';
import { IGrid } from './interfaces';


const GridHOC = ({ shouldFitContainer, ...rest }: IGrid) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [wrapperSize, setWrapperSize] = useState({ width: 0, height: 0 });

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

  const observerRef: React.MutableRefObject<ResizeObserver | undefined> = useRef();

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
    [observerRef, shouldFitContainer],
  );

  if (rest.columns.some(({ isFixed }: any) => isFixed)) {
    const {
      columns, items, width: $width, height, theme,
    } = rest;
    const fixedColumns = columns.filter(({ isFixed }: any) => isFixed);
    const notFixedColumns = columns.filter(({ isFixed }: any) => !isFixed);
    const fixedWidth = fixedColumns.reduce((acc, { width }) => Number(acc) + Number(width), 0);

    const styles: CSSProperties = {
      display: 'flex',
      width: `${$width || wrapperSize.width}px`,
    };
    if (shouldFitContainer) {
      styles.height = '100%';
    }

    return (

      <ScrollSync>
        { ({
          onScroll,
          scrollTop,
        }) => (
          <div style={ styles }>
            <Grid
              columns={ fixedColumns }
              items={ items }
              width={ fixedWidth }
              height={ height }
              shouldMovingColumns={ false }
              shouldChangeColumnsWidth={ false }
              theme={ theme }
              fixedSection
              scrollTop={ scrollTop }
              onScrollsyncScroll={ onScroll }
            />
            <Grid
              scrollTop={ scrollTop }
              columns={ notFixedColumns }
              items={ items }
              width={ ($width || wrapperSize.width) - fixedWidth }
              height={ height }
              theme={ theme }
              onScrollsyncScroll={ onScroll }
            />
          </div>
        ) }
      </ScrollSync>
    );
  }


  if (shouldFitContainer) {
    return (
      <div ref={ wrapperRef } style={ { height: '100%' } }>
        <Grid { ...rest } width={ wrapperSize.width } height={ wrapperSize.height } />
      </div>
    );
  }
  return <Grid { ...rest } />;
};


export default GridHOC;
