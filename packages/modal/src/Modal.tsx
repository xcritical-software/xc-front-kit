import React, { useContext, useMemo } from 'react';

import Blanket from '@xcritical/blanket';

import {
  ModalHeaderWrapper,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalIconClose,
} from './styled';

import { MaxZIndexContext } from './ModalProvider';

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
  widths,
}) => {
  const maxZIndex: number = useContext(MaxZIndexContext);
  const zIndex = useMemo(() => (maxZIndex ? maxZIndex + 1 : zIndexProp), [maxZIndex, zIndexProp]);

  if (!isOpen) {
    return null;
  }

  const modalBlanketTheme = getModalBlanketTheme(theme);

  return (
    <>
      <Blanket
        isTinted
        zIndex={ zIndex }
        theme={ modalBlanketTheme }
        onBlanketClicked={ onModalCancel }
      />
      <ModalContent zIndex={ zIndex } widths={ widths }>
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
