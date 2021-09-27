/* eslint-disable import/no-extraneous-dependencies */
import React, { ReactNode, useMemo, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, number } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import { darken, mix, lighten } from 'polished';

import Modal from '@xcritical/modal';

import Drawer, { drawerThemeNamespace, DrawerTheme } from '../src';
import { defaultDrawerTheme } from '../src/theme';

storiesOf('Drawer', module)
  .addDecorator(withKnobs)
  .add('Basic', () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleChangeState = (): void => {
      setIsOpen(!isOpen);
    };

    return (
      <>
        <Drawer
          isOpen={isOpen}
          appearance={text('appearance', 'default')}
          isRTL={boolean('isRTL', false)}
          isMovable={boolean('isMovable', true)}
          withCloseButton={boolean('withCloseButton', true)}
          onClose={handleChangeState}
          closeIconComponent={
            boolean('With Custom Close Icon', true) ? <div>X</div> : undefined
          }
          withBlanket={boolean('withBlanket', true)}>
          <div>Content</div>
          <div>
            <p>
              {'lorem impsum long text '.repeat(
                number('Repeat children text', 10)
              )}
            </p>
          </div>
        </Drawer>
        <button type="button" onClick={handleChangeState}>
          Click for show/hide Drawer
        </button>
      </>
    );
  })
  .add('Do something after closing Drawer', () => {
    const [isDrawerOpen, setIsOpen] = React.useState(false);
    const [isModalOpen, changeModalState] = useState(false);
    const onCloseModal = () => changeModalState(false);

    const handleChangeState = () => {
      setIsOpen(!isDrawerOpen);

      if (isDrawerOpen) changeModalState(true);
    };

    return (
      <div>
        <Drawer isOpen={isDrawerOpen} onClose={handleChangeState} withBlanket>
          <div>Content</div>
          <div>
            <p>
              {'lorem impsum long text '.repeat(
                number('Repeat children text', 10)
              )}
            </p>
          </div>
        </Drawer>
        <button type="button" onClick={handleChangeState}>
          Click for show/hide Drawer
        </button>
        <Modal
          name="modal"
          title="☠️"
          isOpen={isModalOpen}
          onModalCancel={onCloseModal}>
          <div>Bye-bye, Drawer!</div>
        </Modal>
      </div>
    );
  })
  .add('Themed', () => {
    const defaultTheme = useMemo(() => {
      const themeWithAppearance = {
        appearance: {
          red: {
            wrapper: {
              background: 'red',
            },
          },
          ...defaultDrawerTheme.appearance,
        },
      };

      const theme = { [drawerThemeNamespace]: themeWithAppearance };

      return JSON.stringify(theme, null, 2);
    }, []);

    const [isDrawerOpen, setIsOpen] = React.useState(false);
    const [draftTheme, setDraftTheme] = useState(defaultTheme);
    const [theme, setTheme] = useState(JSON.parse(defaultTheme));
    const [error, setError] = useState(false);
    const handleChangeState = () => {
      setIsOpen(!isDrawerOpen);
    };

    const handleChangeTheme = (e) => {
      setDraftTheme(e.target.value);
      setError(false);
    };

    const handleConfirmTheme = () => {
      try {
        const theme = JSON.parse(draftTheme);
        setDraftTheme(JSON.stringify(theme, null, 2));
        setTheme(theme);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };

    return (
      <ThemeProvider theme={theme}>
        <Drawer
          isOpen={isDrawerOpen}
          appearance={text('appearance', 'red')}
          isRTL={boolean('isRTL', false)}
          isMovable={boolean('isMovable', true)}
          withCloseButton={boolean('withCloseButton', true)}
          onClose={handleChangeState}
          closeIconComponent={
            boolean('With Custom Close Icon', true) ? <div>X</div> : undefined
          }
          withBlanket={boolean('withBlanket', true)}>
          <div>Content</div>
          <div>
            <textarea
              value={draftTheme}
              onChange={handleChangeTheme}
              style={{
                width: '600px',
                height: '600px',
                border: error ? '1px solid red' : '1px solid green',
              }}
            />
            <button onClick={handleConfirmTheme}>Confirm theme</button>
          </div>
        </Drawer>
        <button type="button" onClick={handleChangeState}>
          Click for show/hide Drawer
        </button>
      </ThemeProvider>
    );
  })
  .add('Open with prev width', () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [width, setWidth] = React.useState(800);

    const handleChangeState = (): void => {
      setIsOpen(!isOpen);
    };

    return (
      <>
        <Drawer
          isOpen={isOpen}
          appearance={text('appearance', 'default')}
          isRTL={boolean('isRTL', false)}
          isMovable={boolean('isMovable', true)}
          withCloseButton={boolean('withCloseButton', true)}
          onClose={handleChangeState}
          onChangeWidth={setWidth}
          width={width}
          closeIconComponent={
            boolean('With Custom Close Icon', true) ? <div>X</div> : undefined
          }
          withBlanket={boolean('withBlanket', true)}>
          <div>Content</div>
          <div>
            <p>
              {'lorem impsum long text '.repeat(
                number('Repeat children text', 10)
              )}
            </p>
          </div>
        </Drawer>
        <button type="button" onClick={handleChangeState}>
          Click for show/hide Drawer
        </button>
      </>
    );
  });
