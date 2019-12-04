import React from 'react';
import { Blanket, Menu } from './components';


export const Dropdown = ({
  children, isOpen, target, onClose,
}: any) => (
  <div css={ { position: 'relative' } }>
    { target }
    { isOpen ? <Menu>{ children }</Menu> : null }
    { isOpen ? <Blanket onClick={ onClose } /> : null }
  </div>
);
