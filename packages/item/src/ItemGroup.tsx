import React, { Children, FunctionComponent } from 'react';

import { IItemGroupProps } from './interfaces';

const { toArray } = Children;

const ItemGroup: FunctionComponent<IItemGroupProps> = ({
  divided = false,
  children,
  appearance,
  baseAppearance,
}: IItemGroupProps) => {
  const renderAllItems = (): React.ReactElement | React.ReactElement[] => {
    const allNonEmptyItems = toArray(children);

    return allNonEmptyItems.map((child: any, index) =>
      React.cloneElement(child, {
        ...(divided && index < allNonEmptyItems.length - 1
          ? { divided: true }
          : {}),
        ...(appearance ? { appearance } : {}),
        ...(baseAppearance ? { baseAppearance } : {}),
      })
    );
  };

  return <div>{renderAllItems()}</div>;
};

export { ItemGroup };
