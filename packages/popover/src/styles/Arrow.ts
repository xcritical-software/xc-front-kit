import styled from 'styled-components';

import { IThemed } from '../interfaces';
import { getPopperProperty, getArrowSizes, getArrowBorderWidth } from './utils';


export const Arrow = styled.div<IThemed>`
  position: absolute;
  display: block;

  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    border-color: transparent;
    border-style: solid;
  }

  &[data-arrow-position^='top'] {
    ${(props) => getArrowSizes(props, 'top')};
    margin: 0 ${(props) => getPopperProperty(props)('arrow.offset')};
    bottom: 0;
  
    &:before {
      border-width: ${(props) => getArrowBorderWidth(props, 'top')};
      border-top-color: ${(props) => getPopperProperty(props)('arrow.border.color')};
    }
  
    &:after {
      bottom: ${(props) => getPopperProperty(props)('arrow.border.width')};
      border-width: ${(props) => getArrowBorderWidth(props, 'top')};
      border-top-color: ${(props) => getPopperProperty(props)('arrow.background')};
    }
  }

  &[data-arrow-position^='right'] {
    ${(props) => getArrowSizes(props, 'right')};
    margin: ${(props) => getPopperProperty(props)('arrow.offset')} 0;
    left: 0;
  
    &:before {
      border-width: ${(props) => getArrowBorderWidth(props, 'right')};
      border-right-color: ${(props) => getPopperProperty(props)('arrow.border.color')};
    }
  
    &:after {
      left: ${(props) => getPopperProperty(props)('arrow.border.width')};
      border-width: ${(props) => getArrowBorderWidth(props, 'right')};
      border-right-color: ${(props) => getPopperProperty(props)('arrow.background')};
    }
  }

  &[data-arrow-position^='bottom'] {
    ${(props) => getArrowSizes(props, 'bottom')};
    margin: 0 ${(props) => getPopperProperty(props)('arrow.offset')};
    top: 0;
  
    &:before {
      border-width: ${(props) => getArrowBorderWidth(props, 'bottom')};
      border-bottom-color: ${(props) => getPopperProperty(props)('arrow.border.color')};
    }
  
    &:after {
      top: ${(props) => getPopperProperty(props)('arrow.border.width')};
      border-width: ${(props) => getArrowBorderWidth(props, 'bottom')};
      border-bottom-color: ${(props) => getPopperProperty(props)('arrow.background')};
    }
  }

  &[data-arrow-position^='left'] {
    ${(props) => getArrowSizes(props, 'left')};
    margin: ${(props) => getPopperProperty(props)('arrow.offset')} 0;
    right: 0;
  
    &:before {
      border-width: ${(props) => getArrowBorderWidth(props, 'left')};
      border-left-color: ${(props) => getPopperProperty(props)('arrow.border.color')};
    }
    
    &:after {
      right: ${(props) => getPopperProperty(props)('arrow.border.width')};
      border-width: ${(props) => getArrowBorderWidth(props, 'left')};
      border-left-color: ${(props) => getPopperProperty(props)('arrow.background')};
    }
  }
`;
