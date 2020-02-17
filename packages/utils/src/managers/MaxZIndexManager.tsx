import React, { FC, useMemo } from 'react';


export interface IMaxZIndexManager {
  MaxZIndexContext: React.Context<number>;
  Provider: FC;
}

export const getMaxZIndex = (): number | undefined => Array.from(document.querySelectorAll('body *'))
  .map((node: Element) => parseFloat(window.getComputedStyle(node).zIndex))
  .filter((zIndex: number) => !Number.isNaN(zIndex))
  .sort((a, b) => a - b)
  .pop();

export const maxZIndexManager = (): IMaxZIndexManager => {
  const MaxZIndexContext = React.createContext(1);

  const Provider: FC = ({
    children,
  }) => {
    const maxZIndex = useMemo(() => getMaxZIndex() || 1, []);

    return (
      <MaxZIndexContext.Provider value={ maxZIndex }>
        { children }
      </MaxZIndexContext.Provider>
    );
  };

  return {
    MaxZIndexContext, Provider,
  };
};
