import styled from 'styled-components';

import { switchAppearanceTheme } from './utils';
import { StyledSwitchProps, StyledSwitchLabelTextProps } from './interfaces';


export const SwitchLabel = styled.label<StyledSwitchProps>`
  ${({ theme, appearance, baseAppearance }) => switchAppearanceTheme(theme, appearance, baseAppearance, 'label')};
`;

export const SwitchLabelText = styled.span<StyledSwitchLabelTextProps>`
  ${({ theme, appearance, baseAppearance }) => switchAppearanceTheme(theme, appearance, baseAppearance, ['labelText'])};
  ${({
    theme, appearance, baseAppearance, labelPosition,
  }) => switchAppearanceTheme(theme, appearance, baseAppearance, ['labelText', labelPosition])};
  user-select: none;
`;

export const SwitchHiddenCheckbox = styled.input`
  width: 0;
  height: 0;
  font-size: 0;
  line-height: 0;
  overflow: hidden;
  margin: 0;
  padding: 0;
  appearance: none;
  position: absolute;
        
  &:disabled {
    display: none;
  }
`;

export const SwitchContainer = styled.span<StyledSwitchProps>`
  ${({ theme, appearance, baseAppearance }) => switchAppearanceTheme(theme, appearance, baseAppearance, 'container')};
  

  ${SwitchHiddenCheckbox}:checked + & {
     ${({ theme, appearance, baseAppearance }) => switchAppearanceTheme(theme, appearance, baseAppearance, ['container', 'checked'])};
  }
  
  ${SwitchHiddenCheckbox}:disabled + & {
     ${({ theme, appearance, baseAppearance }) => switchAppearanceTheme(theme, appearance, baseAppearance, ['container', 'disabled'])};
     cursor: not-allowed;
  }
`;

export const SwitchHandle = styled.span<StyledSwitchProps>`
   ${({ theme, appearance, baseAppearance }) => switchAppearanceTheme(theme, appearance, baseAppearance, 'handle')};
        
   ${SwitchHiddenCheckbox}:checked + ${SwitchContainer}  & {
     ${({ theme, appearance, baseAppearance }) => switchAppearanceTheme(theme, appearance, baseAppearance, ['handle', 'checked'])};
   }
`;

export const SwitchHandleItem = styled.span<StyledSwitchProps>`
   ${({ theme, appearance, baseAppearance }) => switchAppearanceTheme(theme, appearance, baseAppearance, 'handleItem')};

   ${SwitchHiddenCheckbox}:active:not(:disabled) + ${SwitchContainer} & {
      right: -30%;
   }
    
   ${SwitchHiddenCheckbox}:checked:active:not(:disabled) + ${SwitchContainer} & {
     left: -30%;
     right: 0;
   }
`;
