import styled from 'styled-components';

import { getButtonGroupStyles } from '../utils/buttonGroupUtils';

import { StyledButton } from './Button';

export const StyledButtonGroup = styled.div`
  ${StyledButton} {
    border-radius: 0;
  }

  ${StyledButton}:first-child {
    border-top-left-radius: ${({ theme }) =>
      getButtonGroupStyles(theme, 'borderRadius')};
    border-bottom-left-radius: ${({ theme }) =>
      getButtonGroupStyles(theme, 'borderRadius')};
  }

  ${StyledButton}:last-child {
    border-top-right-radius: ${({ theme }) =>
      getButtonGroupStyles(theme, 'borderRadius')};
    border-bottom-right-radius: ${({ theme }) =>
      getButtonGroupStyles(theme, 'borderRadius')};
  }

  ${StyledButton}:not(:last-child) {
    border-right: none;
  }

  ${({ theme }) => getButtonGroupStyles(theme)};
`;
