import styled from 'styled-components';

import { checkboxAppearanceTheme, getCheckboxInteractiveStyles } from '../utils';

import { IStyledCheckboxProps } from '../interfaces';


export const CheckboxLabel = styled.label<IStyledCheckboxProps>`
  ${({ theme, appearance, baseAppearance }) => checkboxAppearanceTheme(theme, appearance, baseAppearance, 'checkboxLabel')}
  ${({
    disabled,
    theme,
    appearance,
    baseAppearance,
  }) => getCheckboxInteractiveStyles({
    disabled, theme, appearance, baseAppearance,
  })};
`;

export const CheckboxWrapper = styled.div<IStyledCheckboxProps>`
  ${({ theme, appearance, baseAppearance }) => checkboxAppearanceTheme(theme, appearance, baseAppearance, 'checkboxWrapper')}
  border-radius: ${({
    theme,
    appearance,
    baseAppearance,
    type,
  }) => (type === 'radio'
    ? '50%' : checkboxAppearanceTheme(theme, appearance, baseAppearance, ['checkboxWrapper', 'borderRadius']))};
`;

export const DefaultCheckbox = styled.div<IStyledCheckboxProps>`
  ${({ theme, appearance, baseAppearance }) => checkboxAppearanceTheme(theme, appearance, baseAppearance, 'checkbox')}
  background-color: ${({
    theme,
    appearance,
    baseAppearance,
    checked,
  }) => (checked
    ? checkboxAppearanceTheme(theme, appearance, baseAppearance, ['checkbox', 'backgroundColor']) : 'transparent')};
  border-radius: ${({
    theme,
    appearance,
    baseAppearance,
    type,
  }) => (type === 'radio'
    ? '50%' : checkboxAppearanceTheme(theme, appearance, baseAppearance, ['checkbox', 'borderRadius']))};
`;

export const Checkbox = styled.div<IStyledCheckboxProps>`
  width: ${({ theme, appearance, baseAppearance }) => checkboxAppearanceTheme(theme, appearance, baseAppearance, ['checkbox', 'width'])};
  height: ${({ theme, appearance, baseAppearance }) => checkboxAppearanceTheme(theme, appearance, baseAppearance, ['checkbox', 'height'])};
  color: ${({ theme, appearance, baseAppearance }) => checkboxAppearanceTheme(theme, appearance, baseAppearance, ['checkbox', 'color'])};
`;

export const HiddenCheckbox = styled.input`
  display: none;
`;

export const LabelWrapper = styled.div<IStyledCheckboxProps>`
  ${({ theme, appearance, baseAppearance }) => checkboxAppearanceTheme(theme, appearance, baseAppearance, 'labelWrapper')}
`;

export const SwitchGroupWrapper = styled.div<IStyledCheckboxProps>`
  ${({ theme, appearance, baseAppearance }) => checkboxAppearanceTheme(theme, appearance, baseAppearance, 'switchGroupWrapper')}
`;
