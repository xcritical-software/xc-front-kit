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

  if (rest.columns.some(({ fixedPosition }: any) => !!fixedPosition)) {
    const {
      columns, items, width: $width, height, theme,
    } = rest;
   
    const leftFixedColumns = columns.filter(({ fixedPosition }: any) => fixedPosition === 'left');
    const rightFixedColumns = columns.filter(({ fixedPosition }: any) => fixedPosition === 'right');
    const notFixedColumns = columns.filter(({ fixedPosition }: any) => !fixedPosition);
    
    
    const leftFixedWidth = leftFixedColumns.reduce((acc, { width }) => Number(acc) + Number(width), 0);
    const rightFixedWidth = rightFixedColumns.reduce((acc, { width }) => Number(acc) + Number(width), 0);
    const noFixedWidth = notFixedColumns.reduce((acc, { width }) => Number(acc) + Number(width), 0)




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
            { leftFixedColumns.length && (
              <Grid
              columns={ leftFixedColumns }
              items={ items }
              width={ leftFixedWidth }
              height={ height }
              shouldMovingColumns={ false }
              shouldChangeColumnsWidth={ false }
              theme={ theme }
              scrollTop={ scrollTop }
              onScrollsyncScroll={ onScroll }
              rightScroll={false}
              bottomScroll={false}
              />
            ) }
            
            {
              notFixedColumns.length && (
                <Grid
              scrollTop={ scrollTop }
              columns={ notFixedColumns }
              items={ items }
              width={ ($width || wrapperSize.width) - leftFixedWidth - rightFixedWidth }
              height={ height }
              theme={ theme }
              onScrollsyncScroll={ onScroll }
              rightScroll={ false }
            />
              )
            }
            { rightFixedColumns.length && (
              <Grid
              columns={ rightFixedColumns }
              items={ items }
              width={ rightFixedWidth }
              height={ height }
              shouldMovingColumns={ false }
              shouldChangeColumnsWidth={ false }
              theme={ theme }
              scrollTop={ scrollTop }
              onScrollsyncScroll={ onScroll }
              bottomScroll={false}
              />
            ) }
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
