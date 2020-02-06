import styled from 'styled-components';

import { checkboxTheme } from '../utils';

import { ICheckboxProps } from '../interfaces';


export const CheckboxLabel = styled.label<ICheckboxProps>`
  ${({ theme }) => checkboxTheme(theme, 'checkboxLabel')}
`;

export const CheckboxWrapper = styled.div<ICheckboxProps>`
  ${({ theme }) => checkboxTheme(theme, 'checkboxWrapper')}
`;

export const DefaultCheckbox = styled.div<ICheckboxProps>`
  ${({ theme }) => checkboxTheme(theme, 'checkbox')}
  background-color: ${({ theme, checked }) => (checked
    ? checkboxTheme(theme, ['checkbox', 'backgroundColor']) : 'transparent')};
`;

export const Checkbox = styled.div<ICheckboxProps>`
  width: ${({ theme }) => checkboxTheme(theme, ['checkbox', 'width'])};
  height: ${({ theme }) => checkboxTheme(theme, ['checkbox', 'height'])};
`;

export const HiddenCheckbox = styled.input`
  display: none;
`;
