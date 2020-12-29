import { css } from 'styled-components';
import memoize from 'micro-memoize';

import {
  getAppearanceTheme,
  getThemedState,
  IReturnThemeFunction,
  IThemeNamespace,
} from '@xcritical/theme';

import {
  inputThemeNamespace,
  inputThemeStyle,
} from '../theme';
import {
  InputTheme, IInputProps, IBaseInputTheme, ISubComponentProps,
} from '../interfaces';


export const inputTheme = memoize((
  theme: IThemeNamespace<InputTheme> = {},
  propertyPath?: string | string[],
): InputTheme | any => {
  const func = getThemedState(inputThemeNamespace, inputThemeStyle);

  return func(theme, propertyPath);
});


export const inputApperanceTheme = memoize((
  theme: IThemeNamespace<InputTheme> = {},
  appearanceName: string,
  baseAppearance: string,
  propertyPath?: string | string[],
): InputTheme | any => {
  const func = getAppearanceTheme(inputThemeNamespace, inputThemeStyle);

  return func(theme, appearanceName, propertyPath, baseAppearance);
});


export const getComponentStyle: IReturnThemeFunction<IBaseInputTheme, string> = memoize((
  theme,
  appearance,
  baseAppearance,
  elementName,
) => ({
  ...inputTheme(theme, [elementName]),
  ...inputApperanceTheme(theme, appearance, baseAppearance, [elementName]),
}));

export const getPaddingStyle: IReturnThemeFunction<IBaseInputTheme, any> = memoize((
  theme,
  appearance,
  baseAppearance,
  isRTL,
  isDivided,
  hasPrefix,
  hasSuffix,
  elementName,
) => {
  const {
    bottom = 0,
    left = 0,
    right = 0,
    top = 0,
  } = inputApperanceTheme(theme, appearance, baseAppearance, 'padding');

  const element = inputApperanceTheme(theme, appearance, baseAppearance, elementName);
  const commonBottom = (element?.padding?.bottom !== undefined)
    ? element.padding.bottom
    : bottom;

  const commonLeft = (element?.padding?.left !== undefined)
    ? element.padding.left
    : left;

  const commonRight = (element?.padding?.right !== undefined)
    ? element.padding.right
    : right;

  const commonTop = (element?.padding?.top !== undefined)
    ? element.padding.top
    : top;

  if (hasPrefix && hasSuffix) {
    return css`
      padding: ${commonTop}px ${isDivided ? right : 0}px ${commonBottom}px ${isDivided ? commonLeft : 0}px;
    `;
  }

  if (hasPrefix) {
    return isRTL
      ? css`
          padding: ${commonTop}px ${isDivided ? commonRight : 0}px ${commonBottom}px ${commonLeft}px;
        `
      : css`
          padding: ${commonTop}px ${commonRight}px ${commonBottom}px ${isDivided ? commonLeft : 0}px;
        `;
  }

  if (hasSuffix) {
    return isRTL
      ? css`
          padding: ${commonTop}px ${commonRight}px ${commonBottom}px ${isDivided ? commonLeft : 0}px;
        `
      : css`
          padding: ${commonTop}px ${isDivided ? commonRight : 0}px ${commonBottom}px ${commonLeft}px;
        `;
  }

  return css`
    padding: ${commonTop}px ${isRTL ? commonLeft : commonRight}px ${commonBottom}px ${isRTL ? commonRight : commonLeft}px;
  `;
});


export const getRootInputStyles = memoize(({
  theme,
  appearance = 'default',
  baseAppearance = 'default',
}: IInputProps): any => ({
  ...inputTheme(theme),
  ...inputApperanceTheme(theme, appearance, baseAppearance),
}));

export const getRootInputStatesStyle = (statePath: string[]) => memoize(({
  theme,
  baseAppearance,
  appearance,
}: ISubComponentProps): any => inputApperanceTheme(theme, appearance, baseAppearance, statePath));

export const getRootInputInteractiveStyles = memoize(({
  disabled,
  invalid,
}: IInputProps): any => {
  const disabledHover = css`
    &:hover {
      ${getRootInputStatesStyle(['disabled', 'hover'])}
    }
  `;

  if (disabled) {
    return css`
      cursor: not-allowed;
      opacity: 0.65;
      box-shadow: none;
      ${getRootInputStatesStyle(['disabled'])}
      ${disabledHover}
    `;
  }

  const invalidFocus = css`
    &:focus {
      ${getRootInputStatesStyle(['invalid', 'focus'])}
    }
  `;
  const invalidActive = css`
    &:active {
      ${getRootInputStatesStyle(['invalid', 'active'])};
    }
  `;
  const invalidtHover = css`
    &:hover {
      ${getRootInputStatesStyle(['invalid', 'hover'])}
    }
  `;

  if (invalid) {
    return css`
      cursor: text;
      ${getRootInputStatesStyle(['invalid'])}

      ${invalidFocus}
      ${invalidActive}
      ${invalidtHover};
    `;
  }

  const standartFocus = css`
    &:focus {
      ${getRootInputStatesStyle(['focus'])}
    }
  `;

  const standartActive = css`
    &:active {
      ${getRootInputStatesStyle(['active'])};
    }
  `;

  const standartHover = css`
    &:hover {
      ${getRootInputStatesStyle(['hover'])}
    }
  `;

  return css`
    cursor: text;

    ${standartActive}
    ${standartHover}
    ${standartFocus}
  `;
});

export const getStatesStyle = (componentName: string, statePath: string[]) => memoize(({
  theme,
  baseAppearance,
  appearance,
}: IInputProps): any => inputApperanceTheme(theme, appearance ?? '', baseAppearance ?? '', [componentName, ...statePath]));

const getInputStateStyles = (statePath: string[]) => getStatesStyle('input', statePath);

export const getInputInteractiveStyles = memoize(({
  disabled,
  invalid,
}: IInputProps): any => {
  if (disabled) {
    return css`
      cursor: not-allowed;
      opacity: 0.65;
      box-shadow: none;
      ${getInputStateStyles(['disabled'])}
    `;
  }

  if (invalid) {
    return css`
      cursor: text;
      ${getInputStateStyles(['invalid'])}
      &:active {
        background: inherit;
      }
    `;
  }

  return css`
    cursor: text;

    &:active {
      background: inherit;
    }
  `;
});

const getCleanWrapperStateStyles = (statePath: string[]) => getStatesStyle('clearWrapper', statePath);

export const getCloseIconInteractiveStyles = memoize(({
  disabled,
  invalid,
}: IInputProps): any => {
  const disabledHover = css`
    &:hover {
      ${getCleanWrapperStateStyles(['disabled', 'hover'])}
    }
  `;

  if (disabled) {
    return css`
      cursor: not-allowed;
      opacity: 0.65;
      box-shadow: none;
      ${getCleanWrapperStateStyles(['disabled'])}

      ${disabledHover}
    `;
  }

  const invalidFocus = css`
    &:focus {
      ${getCleanWrapperStateStyles(['invalid', 'focus'])}
    }
  `;
  const invalidActive = css`
    &:active {
      ${getCleanWrapperStateStyles(['invalid', 'active'])};
    }
  `;
  const invalidHover = css`
    &:hover {
      ${getCleanWrapperStateStyles(['invalid', 'hover'])}
    }
  `;

  if (invalid) {
    return css`
      ${getCleanWrapperStateStyles(['invalid'])}
      ${invalidFocus}
      ${invalidActive}
      ${invalidHover}
    `;
  }

  const standartFocus = css`
    &:focus {
      ${getCleanWrapperStateStyles(['focus'])}
    }
  `;
  const standartActive = css`
    &:active {
      ${getCleanWrapperStateStyles(['active'])};
    }
  `;
  const standartHover = css`
    &:hover {
      ${getCleanWrapperStateStyles(['hover'])}
    }
  `;

  return css`
    ${standartFocus}
    ${standartActive}
    ${standartHover}
  `;
});
