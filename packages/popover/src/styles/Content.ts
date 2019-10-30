import styled from 'styled-components';

import { IThemed } from '../interfaces';
import { getPopperProperty } from './utils';


export const Content = styled.div<IThemed>`
  padding-top: ${(props) => getPopperProperty(props)(['content', 'padding', 'top'])};
  padding-right: ${(props) => getPopperProperty(props)(['content', 'padding', 'right'])};
  padding-bottom: ${(props) => getPopperProperty(props)(['content', 'padding', 'bottom'])};
  padding-left: ${(props) => getPopperProperty(props)(['content', 'padding', 'left'])};
  
  background: ${(props) => getPopperProperty(props)(['content', 'background'])};
  
  border-radius: ${(props) => getPopperProperty(props)(['content', 'border', 'radius'])};
  border: ${(props) => {
    const borderWidth = getPopperProperty(props)(['content', 'border', 'width']);
    const borderColor = getPopperProperty(props)(['content', 'border', 'color']);
    return `${borderWidth} solid ${borderColor}`;
  }};
  
  &[data-content-position^='top'] {
    margin-bottom: ${(props) => getPopperProperty(props)(['content', 'offset'])};
  }
  
  &[data-content-position^='right'] {
    margin-left: ${(props) => getPopperProperty(props)(['content', 'offset'])};
  }
  
  &[data-content-position^='bottom'] {
    margin-top: ${(props) => getPopperProperty(props)(['content', 'offset'])};
  }
  
  &[data-content-position^='left'] {
    margin-right: ${(props) => getPopperProperty(props)(['content', 'offset'])};
  }
`;
