import styled from 'styled-components';

import { IThemed } from '../interfaces';
import { getButtonGroupProperty } from '../utils/buttonGroupUtils';
import { StyledButton } from './Button';


export const StyledButtonGroup = styled.div<IThemed>`
  ${StyledButton} {
    border-radius: 0;
    border: ${(props) => getButtonGroupProperty(props)(['_border'])};
    float: left;
  }
  
  ${StyledButton}:first-child {
    border-top-left-radius: ${(props) => getButtonGroupProperty(props)(['_borderRadius'])};
    border-bottom-left-radius: ${(props) => getButtonGroupProperty(props)(['_borderRadius'])};
  }
  
  ${StyledButton}:last-child {
    border-top-right-radius: ${(props) => getButtonGroupProperty(props)(['_borderRadius'])};
    border-bottom-right-radius: ${(props) => getButtonGroupProperty(props)(['_borderRadius'])};
  }
  
  ${StyledButton}:not(:last-child) {
    border-right: none;
  }

  ${(props) => getButtonGroupProperty(props)(['buttonGroup'])};
  
  &:after {
    content: '';
    clear: both;
    display: table;
  }
`;
