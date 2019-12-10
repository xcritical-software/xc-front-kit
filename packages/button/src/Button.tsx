import React, {
  useRef, memo, useMemo, useContext, useCallback,
} from 'react';
import { ThemeContext, ThemeProvider } from 'styled-components';

import { IThemeNamespace } from '@xcritical/theme';
import {
  Root,
  Prefix,
  Postfix,
  ContentWrapper,
  Content,
} from './styled/Button';
import { IButtonProps, ButtonTheme } from './interfaces';
import { getElement } from './utils';


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
};

export const PureButton = ({
  prefix,
  postfix,
  children,
  href,
  disabled,
  appearance,
  baseAppearance,
  theme,
  textPosition,
  component: CustomComponent,
  isRTL,
  onClick: onClickProps,
  ...rest
}: IButtonProps): React.ReactElement => {
  const themeContext = useContext<IThemeNamespace<ButtonTheme>>(ThemeContext);
  const innerTheme = theme || themeContext || {};
  const buttonRef = useRef();

  const onClick = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    if (onClickProps && !disabled) {
      onClickProps(e);
    }
  }, [disabled, onClickProps]);


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const RootElement = useMemo(() => Root(
    CustomComponent
    || getElement(disabled as boolean, href),
  ), [CustomComponent, disabled, href]);

  return (
    <ThemeProvider theme={ innerTheme }>
      <RootElement
        isRTL={ isRTL }
        ref={ buttonRef }
        disabled={ disabled }
        onClick={ onClick }
        appearance={ appearance }
        baseAppearance={ baseAppearance }
        { ...(href ? { href } : null) }
        { ...rest }
      >

        { !!prefix && (
          <Prefix
            isRTL={ isRTL }
            appearance={ appearance }
            baseAppearance={ baseAppearance }
          >
            { prefix }
          </Prefix>
        ) }

        <ContentWrapper>
          <Content textPosition={ textPosition } isRTL={ isRTL }>
            { children }
          </Content>
        </ContentWrapper>

        { !!postfix && (
          <Postfix
            isRTL={ isRTL }
            appearance={ appearance }
            baseAppearance={ baseAppearance }
          >
            { postfix }
          </Postfix>
        ) }
      </RootElement>
    </ThemeProvider>
  );
};


PureButton.defaultProps = defaultProps;

export const Button = memo(PureButton);
