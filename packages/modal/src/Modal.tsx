import React from 'react';
import IconClose from 'mdi-react/CloseIcon';
import Blanket from '@xcritical/blanket';

import {
  ModalHeaderWrapper,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalIconClose,
} from './styles';

import { IModalProps } from './interfaces';
import { getModalBlanketTheme } from './utils';


export const PureModal: React.FC<IModalProps> = ({
  isOpen,
  title,
  children,
  theme,
  onModalCancel,
}) => {
  if (!isOpen) {
    return null;
  }

  const modalBlanketTheme = getModalBlanketTheme(theme);

  return (
    <>
      <Blanket isTinted theme={ modalBlanketTheme } onBlanketClicked={ onModalCancel } />
      <ModalContent>
        <ModalHeaderWrapper>
          <ModalHeader>
            { title }
          </ModalHeader>
          <ModalIconClose onClick={ onModalCancel }>
            <IconClose size="100%" />
          </ModalIconClose>
        </ModalHeaderWrapper>
        <ModalBody>
          { children }
        </ModalBody>
      </ModalContent>
    </>
  );
};
