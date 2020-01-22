import React from 'react';
import styled from 'styled-components';

import { Blanket, DropdownContent } from './styled';


export const DropdownRoot = styled.div`
  position: relative;
  padding-right: 10px; 
  padding-bottom: 10px;
`;


export const Dropdown = ({
  children,
  isOpen,
  target,
  onClose,
}: any) => (
  <DropdownRoot>
    { target }
    { isOpen
      ? (
        <>
          <DropdownContent>{ children }</DropdownContent>
          <Blanket onClick={ onClose } />
        </>
      ) : null }
  </DropdownRoot>
);
