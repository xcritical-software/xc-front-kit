import React, { memo } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { GroupBase, MenuListProps } from 'react-select';
import styled, { CSSObject } from 'styled-components';

import { IStylesConfigCustom } from '../utils/themeConverter';

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

export const MenuList: <
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: MenuListProps<Option, IsMulti, Group>
) => React.ReactElement | null = memo((props) => {
  const {
    getStyles,
    selectProps: { styles, classNamePrefix },
  } = props;
  const menuListStyles = getStyles('menuList', props) as CSSObject;

  return (
    <>
      <FixScrollbarLogic />
      <MenuListWrapper
        className={classNamePrefix && `${classNamePrefix}--menu-list-wrapper`}
        themeStyles={menuListStyles}>
        <Scrollbars
          className={classNamePrefix && `${classNamePrefix}--scrollbars`}
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
