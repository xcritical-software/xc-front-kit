import React from 'react';
import { Blanket, DropdownContent } from './styled';


export const Dropdown = ({
  children,
  isOpen,
  target,
  onClose,
}: any) => (
  <div style={ { position: 'relative', paddingRight: '10px', paddingBottom: '10px' } }>
    { target }
    { isOpen ? <DropdownContent>{ children }</DropdownContent> : null }
    { isOpen ? <Blanket onClick={ onClose } /> : null }
  </div>
);
