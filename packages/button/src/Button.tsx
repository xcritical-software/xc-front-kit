import React, { memo, useRef, useMemo, useContext, useCallback } from 'react';
import { ThemeContext, ThemeProvider } from 'styled-components';

import { useCombinedRefs } from '@xcritical/utils';
import { IThemeNamespace } from '@xcritical/theme';

import {
  StyledButton,
  Prefix,
  Postfix,
  ContentWrapper,
  Content,
} from './styled';
import { IButtonProps, ButtonTheme } from './interfaces';
import { getElement } from './utils';

export const PureButton = React.forwardRef<HTMLButtonElement, IButtonProps>(({
  prefix,
  postfix,
  children,
  href,
  theme,
  type = 'button',
  role = 'button',
  textPosition = 'center',
  appearance = 'default',
  baseAppearance = 'default',
  spacing = 'default',
  ghost = false,
  disabled = false,
  selected = false,
  isRTL = false,
  shouldFitContent = false,
  component: CustomComponent,
  onClick: onClickProps,
  className,
  classNamePrefix,
  ...rest
},
ref: React.MutableRefObject<HTMLButtonElement>
) => {
  const themeContext = useContext<IThemeNamespace<ButtonTheme>>(ThemeContext);
  const innerTheme = (theme ?? themeContext) || {};
  const innerRef = useRef<HTMLButtonElement>(null);
  const combinedRef = useCombinedRefs(null, ref, innerRef);


  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
      if (onClickProps && !disabled) {
        onClickProps(e);
      }
    },
    [disabled, onClickProps]
  );

  const element = useMemo(
    () => CustomComponent ?? getElement(disabled, href),
    [CustomComponent, disabled, href]
  );

  return (
    <ThemeProvider theme={innerTheme}>
      <StyledButton
        className={className}
        as={element}
        ref={combinedRef}
        role={role}
        spacing={spacing}
        isRTL={isRTL}
        ghost={ghost}
        disabled={disabled}
        selected={selected}
        shouldFitContent={shouldFitContent}
        baseAppearance={baseAppearance}
        appearance={appearance}
        onClick={onClick}
        type={type}
        {...(href ? { href } : null)}
        {...rest}>
        {!!prefix && (
          <Prefix
            className={classNamePrefix && `${classNamePrefix}__prefix`}
            isRTL={isRTL}
            appearance={appearance}
            baseAppearance={baseAppearance}>
            {prefix}
          </Prefix>
        )}

        <ContentWrapper
          className={classNamePrefix && `${classNamePrefix}__content-wrapper`}
          appearance={appearance}
          baseAppearance={baseAppearance}>
          <Content
            className={classNamePrefix && `${classNamePrefix}__content`}
            textPosition={textPosition}
            isRTL={isRTL}
            appearance={appearance}
            baseAppearance={baseAppearance}>
            {children}
          </Content>
        </ContentWrapper>

        {!!postfix && (
          <Postfix
            className={classNamePrefix && `${classNamePrefix}__postfix`}
            isRTL={isRTL}
            appearance={appearance}
            baseAppearance={baseAppearance}>
            {postfix}
          </Postfix>
        )}
      </StyledButton>
    </ThemeProvider>
  );
}
);

export const Button = memo(PureButton);
