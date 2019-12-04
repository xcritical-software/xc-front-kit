import React from 'react';
import styled from 'styled-components';
import { Blanket, Menu } from './components';


export const Dropdown = ({
  children, isOpen, target, onClose,
}: any) => (
  <div style={ { position: 'relative', paddingRight: '10px' } }>
    { target }
    { isOpen ? <Menu>{ children }</Menu> : null }
    { isOpen ? <Blanket onClick={ onClose } /> : null }
  </div>
);

export const DropdownItem = styled.div`
  padding-bottom: 10px;
`;

export const DropdownButtons = styled.div`
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #F0F0F0;
  & > * {
    margin-right: 10px;
  }
`;
