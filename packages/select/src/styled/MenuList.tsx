import React, { memo } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { MenuListComponentProps, OptionTypeBase } from 'react-select';
import styled, { CSSObject } from 'styled-components';

interface IMenuListComponentProps
  extends MenuListComponentProps<OptionTypeBase> {
  selectProps: {
    styles: {
      menuScrollbar: CSSObject;
    };
  };
}

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

export const MenuList: React.FC<IMenuListComponentProps> = memo((props) => {
  const {
    getStyles,
    selectProps: { styles },
  } = props;
  const menuListStyles = getStyles('menuList', props);

  return (
    <>
      <FixScrollbarLogic />
      <MenuListWrapper themeStyles={menuListStyles}>
        <Scrollbars
          autoHeight
          renderThumbVertical={renderThumb(styles.menuScrollbar)}
          renderThumbHorizontal={renderThumb(styles.menuScrollbar)}>
          {props.children}
        </Scrollbars>
      </MenuListWrapper>
    </>
  );
});
