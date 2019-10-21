import React, { useRef, memo, useContext } from 'react';
import { ThemeContext, ThemeProvider } from 'styled-components';

import { IThemeNamespace } from '@xcritical/theme';
import {
  Root,
  Prefix,
  Postfix,
  ContentWrapper,
  Content,
} from './styled/Button';
import { IButtonProps, IButtonTheme } from './interfaces';
import { buttonThemeNamespace, buttonThemeStyle } from './theme';


const defaultProps = {
  outline: false,
  prefix: null,
  postfix: null,
  component: null,
  disabled: false,
  selected: false,
  role: 'button',
  title: null,
  height: null,
  href: null,
  appearance: 'default',
  baseAppearance: 'default',
  spacing: 'default',
  shouldFitContent: false,
  isRTL: false,
  textPosition: 'center',
  theme: {
    [buttonThemeNamespace]: buttonThemeStyle,
  },
  onClick: () => {},
};

export const PureButton = ({
  prefix,
  postfix,
  children,
  href,
  disabled,
  theme,
  textPosition,
  isRTL,
  onClick: onClickProps,
  ...rest
}: IButtonProps): React.ReactElement => {
  const themeContext = useContext<IThemeNamespace<IButtonTheme>>(ThemeContext);
  const innerTheme = theme || themeContext;
  const buttonRef = useRef();

  console.log(innerTheme);

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    if (onClickProps && !disabled) {
      onClickProps(e);
    }
  };

  const getElement = (): string => {
    if (href) {
      return disabled ? 'span' : 'a';
    }
    return 'button';
  };

  const RootElement = Root(getElement());

  return (
    <ThemeProvider theme={ innerTheme }>
      <RootElement
        isRTL={ isRTL }
        ref={ buttonRef }
        disabled={ disabled }
        onClick={ onClick }
        { ...(href ? { href } : null) }
        { ...rest }
      >

        { !!prefix && (<Prefix isRTL={ isRTL }>{ prefix }</Prefix>) }

        <ContentWrapper>
          <Content textPosition={ textPosition } isRTL={ isRTL }>
            { children }
          </Content>
        </ContentWrapper>

        { !!postfix && (<Postfix isRTL={ isRTL }>{ postfix }</Postfix>) }
      </RootElement>
    </ThemeProvider>
  );
};


PureButton.defaultProps = defaultProps;

export const Button = memo(PureButton);
