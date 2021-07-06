import React, { memo, FunctionComponent } from 'react';
import { withTheme } from 'styled-components';

import { IItemProps } from './interfaces';
import { Root, Prefix, Postfix, Wrapper, ContentWrapper } from './styled';

export const PureItem: FunctionComponent<IItemProps> = memo(
  ({
    divided = false,
    disabled = false,
    selected = false,
    hidden = false,
    prefix,
    postfix,
    appearance = 'default',
    baseAppearance = 'default',
    textPosition = 'left',
    children,
    isRTL = false,
    shouldAllowMultiline = false,
    role = 'button',
    value,
    title,
    onClick: propsOnClick,
  }: IItemProps) => {
    const onClick = (event: Event): void => {
      if (!disabled && propsOnClick) {
        propsOnClick(value, event);
      }
    };

    return (
      <Root
        role={role}
        divided={divided}
        isHidden={hidden}
        disabled={disabled}
        isRTL={isRTL}
        appearance={appearance}
        baseAppearance={baseAppearance}
        selected={selected}
        onClick={onClick}
        tabIndex={disabled || hidden ? null : 0}
        title={title}>
        {!!prefix && (
          <Prefix
            isRTL={isRTL}
            appearance={appearance}
            baseAppearance={baseAppearance}>
            {prefix}
          </Prefix>
        )}
        <Wrapper appearance={appearance} baseAppearance={baseAppearance}>
          <ContentWrapper
            appearance={appearance}
            baseAppearance={baseAppearance}
            isRTL={isRTL}
            textPosition={textPosition}
            allowMultiline={shouldAllowMultiline}>
            {children}
          </ContentWrapper>
        </Wrapper>
        {!!postfix && (
          <Postfix
            isRTL={isRTL}
            appearance={appearance}
            baseAppearance={baseAppearance}>
            {postfix}
          </Postfix>
        )}
      </Root>
    );
  }
);

export const Item = withTheme(PureItem);
