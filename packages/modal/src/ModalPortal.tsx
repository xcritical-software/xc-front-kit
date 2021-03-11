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
  height,
  maxHeight,
  minHeight,
  appearance = 'default',
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
        height={ height }
        maxHeight={ maxHeight }
        minHeight={ minHeight }
        appearance={ appearance }
      >
        <ModalHeaderWrapper
          appearance={ appearance }
        >
          <ModalHeader
            appearance={ appearance }
          >
            { title }
          </ModalHeader>
          <ModalIconClose
            onClick={ onModalCancel }
            appearance={ appearance }
          >
            { iconClose || <IconClose /> }
          </ModalIconClose>
        </ModalHeaderWrapper>
        <ModalBody
          appearance={ appearance }
        >
          { children }
        </ModalBody>
      </ModalContent>
    </Portal>
  );
};
