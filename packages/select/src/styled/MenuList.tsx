import React, { memo } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { GroupBase, MenuListProps } from 'react-select';
import styled, { CSSObject } from 'styled-components';

import { IStylesConfigCustom } from '../utils/themeConverter';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix

interface IThumbProps {
  themeStyles: CSSObject;
}

interface IMenuListWrapperProps {
  themeStyles: CSSObject;
}

const Thumb = styled.div<IThumbProps>`
  ${({ themeStyles }) => themeStyles}
`;

const MenuListWrapper = styled.div<IMenuListWrapperProps>`
  ${({ themeStyles }) => themeStyles}
`;

const renderThumb = (themeStyles): React.FC<{ style }> => ({
  style,
  ...props
}) => <Thumb {...props} themeStyles={{ ...style, ...themeStyles }} />;

// TODO react-select append wheel, touchdown listeners to first child
//  which leads to a conflict with react-custom-scrollbars
const FixScrollbarLogic = () => <div />;

export const MenuList: React.FC<
  MenuListProps<unknown, false, GroupBase<unknown>>
> = memo((props) => {
  const {
    getStyles,
    selectProps: { styles },
  } = props;
  const menuListStyles = getStyles('menuList', props) as CSSObject;

  return (
    <>
      <FixScrollbarLogic />
      <MenuListWrapper themeStyles={menuListStyles}>
        <Scrollbars
          autoHeight
          renderThumbVertical={renderThumb(
            (styles as IStylesConfigCustom).menuScrollbar
          )}
          renderThumbHorizontal={renderThumb(
            (styles as IStylesConfigCustom).menuScrollbar
          )}>
          {props.children}
        </Scrollbars>
      </MenuListWrapper>
    </>
  );
});
