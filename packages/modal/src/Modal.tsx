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
  className,
  classNamePrefix,
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
        className={classNamePrefix && `${classNamePrefix}--blanket`}
        isTinted
        zIndex={zIndex}
        theme={modalBlanketTheme}
        onBlanketClicked={onModalCancel}
      />
      <ModalContent
        className={className}
        zIndex={zIndex}
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
              classNamePrefix && `${classNamePrefix}--icon-wrapper-close`
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
    </>
  );
};
