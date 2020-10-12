import React from 'react';

import Blanket from '@xcritical/blanket';
import Portal from '@xcritical/portal';

import {
  ModalHeaderWrapper,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalIconClose,
} from './styled';

import { IModalProps } from './interfaces';
import { getModalBlanketTheme } from './utils';
import { IconClose } from './IconClose';


export const ModalPortal: React.FC<IModalProps> = ({
  name,
  isOpen,
  title,
  children,
  iconClose,
  theme,
  onModalCancel,
  width,
  maxWidth,
  minWidth,
}) => {
  if (!isOpen) {
    return null;
  }

  const modalBlanketTheme = getModalBlanketTheme(theme);

  return (
    <Portal id={ name } zIndex="unset">
      <Blanket
        isTinted
        theme={ modalBlanketTheme }
        onBlanketClicked={ onModalCancel }
      />
      <ModalContent
        width={ width }
        maxWidth={ maxWidth }
        minWidth={ minWidth }
      >
        <ModalHeaderWrapper>
          <ModalHeader>
            { title }
          </ModalHeader>
          <ModalIconClose onClick={ onModalCancel }>
            { iconClose || <IconClose /> }
          </ModalIconClose>
        </ModalHeaderWrapper>
        <ModalBody>
          { children }
        </ModalBody>
      </ModalContent>
    </Portal>
  );
};
