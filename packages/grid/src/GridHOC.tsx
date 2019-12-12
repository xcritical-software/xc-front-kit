import React, { useState, useEffect, useRef } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

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

  if (shouldFitContainer) {
    return (
      <div ref={ wrapperRef } style={ { width: '100%', height: '100%' } }>
        <Grid { ...rest } width={ wrapperSize.width } height={ wrapperSize.width } />
      </div>
    );
  }
  return <Grid { ...rest } />;
};


export default GridHOC;
