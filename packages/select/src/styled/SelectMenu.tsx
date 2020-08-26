import React, { memo } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import { MenuListComponentProps, OptionTypeBase } from 'react-select';
import { CSSObject } from 'styled-components';


interface IStyledConfigWithScrollBar {
  scrollbarVertical?: CSSObject;
  scrollbarHorizontal?: CSSObject;
}

const renderThumbVertical = (themeStyles): React.FC<{ style }> => ({ style, ...props }) => (
  <div { ...props } style={ { ...themeStyles, ...style } } />
);

const renderThumbHorizontal = (themeStyles): React.FC<{ style }> => ({ style, ...props }) => (
  <div { ...props } style={ { ...themeStyles, ...style } } />
);

// TODO react-select append wheel, touchdown listeners to first child
//  which leads to a conflict with react-custom-scrollbars
const FixScrollbarLogic = () => <div />;

export const MenuList: React.FC<MenuListComponentProps<OptionTypeBase>> = memo(
  (props) => {
    const { getStyles } = props;
    const {
      scrollbarVertical,
      scrollbarHorizontal,
      ...restStyles
    }: IStyledConfigWithScrollBar = getStyles('menuList', props);

    return (
      <>
        <FixScrollbarLogic />
        <div style={ restStyles }>
          <Scrollbars
            autoHeight
            renderThumbVertical={ renderThumbVertical(scrollbarVertical) }
            renderThumbHorizontal={ renderThumbHorizontal(scrollbarHorizontal) }
          >
            { props.children }
          </Scrollbars>
        </div>
      </>
    );
  },
);
