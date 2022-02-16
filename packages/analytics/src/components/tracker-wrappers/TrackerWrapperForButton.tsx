import React, { useCallback } from 'react';

import { IClickEventWrapper } from '../../types';
import { useAnalyticsDispatch } from '../analytics-context';

type OnClick = {
  onClick: Function;
  [key: string]: any;
};

export const TrackerWrapperForButton = <T extends OnClick>(
  Children: React.FC<T>
) => (props: T & IClickEventWrapper) => {
  let { conversion, analyticsParams, onClick: onClickFromProps } = props;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const analyticsDispatch = useAnalyticsDispatch();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const wrapperOnClick = useCallback(
    (...args) => {
      analyticsDispatch({ conversion, analyticsParams });
      onClickFromProps(args);
    },
    [conversion, analyticsParams, onClickFromProps]
  );
  const newProps: T = {
    ...props,
    onClick: wrapperOnClick,
  };

  return <Children {...newProps} />;
};
