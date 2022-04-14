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
  zIndex,
  className,
  classNamePrefix,
}) => {
  if (!isOpen) {
    return null;
  }

  const modalBlanketTheme = getModalBlanketTheme(theme);

  return (
    <Portal
      className={classNamePrefix && `${classNamePrefix}--portal`}
      id={name}
      zIndex="unset">
      <Blanket
        className={classNamePrefix && `${classNamePrefix}--blanket`}
        isTinted
        zIndex={zIndex}
        theme={modalBlanketTheme}
        onBlanketClicked={onModalCancel}
      />
      <ModalContent
        className={className}
        width={width}
        maxWidth={maxWidth}
        minWidth={minWidth}
        height={height}
        maxHeight={maxHeight}
        minHeight={minHeight}
        appearance={appearance}>
        <ModalHeaderWrapper
          className={classNamePrefix && `${classNamePrefix}--header-wrapper`}
          appearance={appearance}>
          <ModalHeader
            className={classNamePrefix && `${classNamePrefix}--header`}
            appearance={appearance}>
            {title}
          </ModalHeader>
          <ModalIconClose
            className={
              classNamePrefix && `${classNamePrefix}--icon-close-wrapper`
            }
            onClick={onModalCancel}
            appearance={appearance}>
            {iconClose || (
              <IconClose
                className={classNamePrefix && `${classNamePrefix}--icon-close`}
              />
            )}
          </ModalIconClose>
        </ModalHeaderWrapper>
        <ModalBody
          className={classNamePrefix && `${classNamePrefix}--body`}
          appearance={appearance}>
          {children}
        </ModalBody>
      </ModalContent>
    </Portal>
  );
};
