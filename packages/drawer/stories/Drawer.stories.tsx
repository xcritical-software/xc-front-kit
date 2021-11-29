/* eslint-disable import/no-extraneous-dependencies */
import React, { ReactNode, useMemo, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { darken, mix, lighten } from 'polished';

import Modal from '@xcritical/modal';

import Drawer, { drawerThemeNamespace, DrawerTheme } from '../src';

interface IBasicDrawerProps {
  appearance?: string;
  isRTL?: boolean;
  isMovable?: boolean;
  withCloseButton?: boolean;
  closeIconComponent?: ReactNode;
  onClose?: () => void;
  withBlanket?: boolean;
}

const generateTheme = (
  padding: number,
  baseBgColor: string,
  textColor: string
): DrawerTheme => ({
  appearance: {
    default: {
      drawerWrapper: {
        backgroundColor: baseBgColor,
        display: 'flex',
        height: '100vh',
        top: 0,
        overflow: 'hidden',
        position: 'fixed',
        zIndex: 100,
      },
    },
    myaccount: {
      paddingTop: padding,
      paddingRight: padding,
      paddingBottom: padding,
      paddingLeft: padding,
      borderRadius: 0,
      backgroundColor: baseBgColor,
      color: textColor,
      fontWeight: 600,
      hover: {
        backgroundColor: baseBgColor,
        color: textColor,
        fontWeight: 600,
      },
      active: {
        backgroundColor: baseBgColor,
        color: textColor,
        fontWeight: 600,
      },
      disabled: {
        backgroundColor: baseBgColor,
        color: mix(0.5, baseBgColor, textColor),
        fontWeight: 600,
      },
    },
    dark: {
      backgroundColor: darken(0.75, baseBgColor),
      color: lighten(0.75, textColor),
      drawerWrapper: {
        backgroundColor: darken(0.75, baseBgColor),
        color: lighten(0.75, textColor),
      },
      separatorWrapper: {
        backgroundColor: darken(0.75, baseBgColor),
        color: lighten(0.75, textColor),
      },
      iconWrapper: {
        background: 'red',
      },
    },
  },
});

const theme = generateTheme(20, '#fff', '#000');

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    margin: 0;
  }
  
  html {
    box-sizing: border-box;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
`;

const BasicDrawer = ({
  appearance = 'myaccount',
  isRTL = false,
  isMovable = false,
  withCloseButton = false,
  closeIconComponent,
  onClose,
  withBlanket,
}: IBasicDrawerProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <ThemeProvider theme={{ [drawerThemeNamespace]: theme }}>
      <Drawer
        isOpen={isOpen}
        onOutsideClick={handleClick}
        appearance={appearance}
        isRTL={isRTL}
        isMovable={isMovable}
        withCloseButton={withCloseButton}
        closeIconComponent={closeIconComponent}
        onClose={onClose}
        withBlanket={withBlanket}
        className="at-custom-class">
        <div>Content</div>
      </Drawer>
      <button type="button" onClick={handleClick}>
        Click for show/hide Drawer
      </button>
    </ThemeProvider>
  );
};

const DynamicDrawer = ({
  appearance = 'myaccount',
  isRTL = false,
  isMovable = true,
  withCloseButton = false,
  closeIconComponent,
  onClose,
  withBlanket,
}: IBasicDrawerProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = (): void => {
    setIsOpen(!isOpen);
  };

  const minWidthProp = 340;

  const maxWidthProp = useMemo(() => {
    const maxWidth = window.innerWidth - 400;

    if (maxWidth < minWidthProp) return minWidthProp;

    return maxWidth;
  }, [isOpen]);

  return (
    <ThemeProvider theme={{ [drawerThemeNamespace]: theme }}>
      <Drawer
        isOpen={isOpen}
        onOutsideClick={handleClick}
        appearance={appearance}
        isRTL={isRTL}
        isMovable={isMovable}
        withCloseButton={withCloseButton}
        closeIconComponent={closeIconComponent}
        onClose={onClose}
        withBlanket={withBlanket}
        minWidth={minWidthProp}
        maxWidth={maxWidthProp}>
        {maxWidthProp > 1000 && <div style={{ fontSize: '450px' }}>MAX</div>}
        {maxWidthProp < 1000 && maxWidthProp > 650 && (
          <div style={{ fontSize: '170px' }}>MIDDLE</div>
        )}
        {maxWidthProp < 650 && <div style={{ fontSize: '170px' }}>MIN</div>}
      </Drawer>
      <button type="button" onClick={handleClick}>
        Click for show Drawer
      </button>
    </ThemeProvider>
  );
};

storiesOf('Drawer', module)
  .add('Basic', () => (
    <div>
      <GlobalStyle />
      <BasicDrawer />
    </div>
  ))
  .add('Dark', () => (
    <div>
      <GlobalStyle />
      <BasicDrawer appearance="dark" withCloseButton />
    </div>
  ))
  .add('Right', () => (
    <div>
      <GlobalStyle />
      <BasicDrawer isRTL />
    </div>
  ))
  .add('Movable', () => (
    <div>
      <GlobalStyle />
      <BasicDrawer isMovable />
    </div>
  ))
  .add('Movable and Right', () => (
    <div>
      <GlobalStyle />
      <BasicDrawer isRTL isMovable />
    </div>
  ))
  .add('With left close button', () => (
    <div>
      <GlobalStyle />
      <BasicDrawer withCloseButton />
    </div>
  ))
  .add('With right close button', () => (
    <div>
      <GlobalStyle />
      <BasicDrawer withCloseButton isRTL />
    </div>
  ))
  .add('With custom close icon', () => (
    <div>
      <GlobalStyle />
      <BasicDrawer withCloseButton closeIconComponent={<div>X</div>} />
    </div>
  ))
  .add('Do something after closing Drawer', () => {
    const [isOpen, changeModalState] = useState(false);
    const onCloseModal = () => changeModalState(false);
    const onCloseDrawer = () => changeModalState(true);

    return (
      <div>
        <BasicDrawer withCloseButton onClose={onCloseDrawer} />
        <Modal
          name="modal"
          title="☠️"
          isOpen={isOpen}
          onModalCancel={onCloseModal}>
          <div>Bye-bye, Drawer!</div>
        </Modal>
      </div>
    );
  })
  .add('Without Blanket', () => (
    <div>
      <GlobalStyle />
      <BasicDrawer
        withBlanket={false}
        withCloseButton
        closeIconComponent={<div>X</div>}
      />
      <p>{'lorem impsum long text '.repeat(600)}</p>
    </div>
  ))
  .add('With dynamic maxWidth', () => (
    <div>
      <GlobalStyle />
      <DynamicDrawer withCloseButton closeIconComponent={<div>X</div>} />
      <p>Try to change browser width and then to open the Drawer again!</p>
    </div>
  ));
