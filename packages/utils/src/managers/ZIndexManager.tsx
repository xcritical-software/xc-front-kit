import React, { FC, useEffect, useState } from 'react';


export interface IZIndexManager {
  ZIndexContext: React.Context<number>;
  Provider: FC;
}

export const getMaxZIndex = (): number | undefined => Array.from(document.querySelectorAll('body *'))
  .map((a: Element) => parseFloat(window.getComputedStyle(a).zIndex))
  .filter((a: number) => !Number.isNaN(a))
  .sort((a, b) => a - b)
  .pop();

export const ZIndexManager = (): IZIndexManager => {
  const ZIndexContext = React.createContext(1);

  const Provider: FC = ({
    children,
  }) => {
    const [value, setValue] = useState<number | null>(null);

    useEffect(() => {
      if (!value) {
        setValue(getMaxZIndex() || 1);
      }
    }, [value]);

    return (
      <ZIndexContext.Provider value={ value || 1 }>
        { children }
      </ZIndexContext.Provider>
    );
  };

  return {
    ZIndexContext, Provider,
  };
};
