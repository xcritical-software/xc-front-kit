import React, { FC, useEffect, useState } from 'react';


export const getMaxZIndex = (): number | undefined => Array.from(document.querySelectorAll('body *'))
  .map((a: Element) => parseFloat(window.getComputedStyle(a).zIndex))
  .filter((a: number) => !Number.isNaN(a))
  .sort((a, b) => a - b)
  .pop();

export const ZIndexManager = (): { Provider: FC; Consumer: FC } => {
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

  const Consumer: FC = ({
    children,
  }) => (
    <ZIndexContext.Consumer>
      {
        (value: number) => React.Children.map(children,
          (child: any) => React.cloneElement(child, { maxZIndex: value }))
      }
    </ZIndexContext.Consumer>
  );

  return {
    Provider, Consumer,
  };
};
