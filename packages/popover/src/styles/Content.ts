import styled from 'styled-components';

import { IContent } from '../interfaces';
import { getPopperProperty, getContentStyles } from './utils';


export const Content = styled.div<IContent>`
  box-sizing: border-box;
  
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
  
  width: ${({ shouldFitContainer }) => (shouldFitContainer ? '100%' : 'auto')};

  ${(props) => getContentStyles(props)}
`;
