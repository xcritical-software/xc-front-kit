import styled from 'styled-components';

import { switchAppearanceTheme } from './utils';
import { StyledSwitchProps } from './interfaces';


export const SwitchLabel = styled.label<StyledSwitchProps>`
  ${({ theme, appearance, baseAppearance }) => switchAppearanceTheme(theme, appearance, baseAppearance, 'label')};
  ${({
    theme, appearance, baseAppearance, disabled,
  }) => disabled && switchAppearanceTheme(
    theme,
    appearance,
    baseAppearance,
    ['label', 'disabled'],
  )
};
  display: inline-flex;
  flex-direction: ${({ labelPosition }) => (labelPosition === 'left' ? 'row-reverse' : 'row')};
`;

export const SwitchLabelText = styled.span<StyledSwitchProps>`
  ${({ theme, appearance, baseAppearance }) => switchAppearanceTheme(theme, appearance, baseAppearance, ['labelText'])};
  ${({
    theme, appearance, baseAppearance, labelPosition = 'right',
  }) => switchAppearanceTheme(theme, appearance, baseAppearance, ['labelText', `${labelPosition}Position`])};
  user-select: none;
`;

export const SwitchHiddenCheckbox = styled.input`
  appearance: none;
  position: absolute;
        
  &:disabled {
    display: none;
  }
`;

export const SwitchContainer = styled.span<StyledSwitchProps>`
  ${({ theme, appearance, baseAppearance }) => switchAppearanceTheme(theme, appearance, baseAppearance, 'container')};
  
  ${({
    theme, appearance, baseAppearance, checked,
  }) => checked && switchAppearanceTheme(theme, appearance, baseAppearance, ['container', 'checked'])};
  ${({
    theme, appearance, baseAppearance, disabled,
  }) => disabled && switchAppearanceTheme(theme, appearance, baseAppearance, ['container', 'disabled'])};
`;

export const SwitchHandle = styled.span<StyledSwitchProps>`
   ${({ theme, appearance, baseAppearance }) => switchAppearanceTheme(theme, appearance, baseAppearance, 'handle')}; 
   ${({
    theme, appearance, baseAppearance, checked,
  }) => checked && switchAppearanceTheme(theme, appearance, baseAppearance, ['handle', 'checked'])};
`;
