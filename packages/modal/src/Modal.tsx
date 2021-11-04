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
  width,
  maxWidth,
  minWidth,
  height,
  maxHeight,
  minHeight,
  appearance = 'default',
}) => {
  const maxZIndex: number = useContext(MaxZIndexContext);
  const zIndex = useMemo(() => zIndexProp ?? maxZIndex + 1, [
    maxZIndex,
    zIndexProp,
  ]);

  if (!isOpen) {
    return null;
  }

  const modalBlanketTheme = getModalBlanketTheme(theme);

  return (
    <>
      <Blanket
        isTinted
        zIndex={zIndex}
        theme={modalBlanketTheme}
        onBlanketClicked={onModalCancel}
      />
      <ModalContent
        className="at-modal__content"
        zIndex={zIndex}
        width={width}
        maxWidth={maxWidth}
        minWidth={minWidth}
        height={height}
        maxHeight={maxHeight}
        minHeight={minHeight}
        appearance={appearance}>
        <ModalHeaderWrapper
          className="at-modal__header-wrapper"
          appearance={appearance}>
          <ModalHeader className="at-modal__header" appearance={appearance}>
            {title}
          </ModalHeader>
          <ModalIconClose
            className="at-modal__icon-close-wrapper"
            onClick={onModalCancel}
            appearance={appearance}>
            {iconClose || <IconClose />}
          </ModalIconClose>
        </ModalHeaderWrapper>
        <ModalBody className="at-modal__body" appearance={appearance}>
          {children}
        </ModalBody>
      </ModalContent>
    </>
  );
};
