import React, { useContext } from 'react';
import Blanket from '@xcritical/blanket';

import {
  ModalHeaderWrapper,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalIconClose,
} from './styled';

import { ZIndexContext } from './ModalProvider';

import { IModalProps } from './interfaces';
import { getModalBlanketTheme } from './utils';
import { IconClose } from './IconClose';


export const Modal: React.FC<IModalProps> = ({
  isOpen,
  title,
  children,
  iconClose,
  theme,
  onModalCancel,
  zIndex: zIndexProp,
}) => {
  const zIndex = useContext(ZIndexContext);

  if (!isOpen) {
    return null;
  }

  const modalBlanketTheme = getModalBlanketTheme(theme);

  return (
    <>
      <Blanket
        isTinted
        zIndex={ zIndex || zIndexProp }
        theme={ modalBlanketTheme }
        onBlanketClicked={ onModalCancel }
      />
      <ModalContent zIndex={ zIndex }>
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
