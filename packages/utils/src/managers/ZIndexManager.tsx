import React, { FC, useEffect, useState } from 'react';


export interface IZIndexManager {
  ZIndexContext: React.Context<number>;
  Provider: FC;
}

export const getMaxZIndex = (): number | undefined => Array.from(document.querySelectorAll('body *'))
  .map((node: Element) => parseFloat(window.getComputedStyle(node).zIndex))
  .filter((zIndex: number) => !Number.isNaN(zIndex))
  .sort((a, b) => a - b)
  .pop();

export const ZIndexManager = (): IZIndexManager => {
  const ZIndexContext = React.createContext(1);

  const Provider: FC = ({
    children,
  }) => {
    const [zIndex, setZIndex] = useState<number | null>(null);

    useEffect(() => {
      if (!zIndex) {
        setZIndex(getMaxZIndex() || 1);
      }
    }, [zIndex]);

    return (
      <ZIndexContext.Provider value={ zIndex || 1 }>
        { children }
      </ZIndexContext.Provider>
    );
  };

  return {
    ZIndexContext, Provider,
  };
};
