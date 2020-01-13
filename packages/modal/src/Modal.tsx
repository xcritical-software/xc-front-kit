import React from 'react';
import Blanket from '@xcritical/blanket';

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


export const PureModal: React.FC<IModalProps> = ({
  isOpen,
  title,
  children,
  iconClose,
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
            { iconClose || <IconClose /> }
          </ModalIconClose>
        </ModalHeaderWrapper>
        <ModalBody>
          { children }
        </ModalBody>
      </ModalContent>
    </>
  );
};
