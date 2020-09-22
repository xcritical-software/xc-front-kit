/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useCallback } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Provider, connect } from 'react-redux';
import { storiesOf } from '@storybook/react';
import CloseCircleOutlineIcon from 'mdi-react/CloseCircleOutlineIcon';
import { withKnobs, text } from '@storybook/addon-knobs';

import { colors } from '@xcritical/theme';

import ModalPortal, {
  Modal,
  ConnectedModal,
  ModalProvider,
  modalThemeNamespace,
  xcriticalModalOpen,
  getModalByName,
  IModalTheme,
} from '../src';

import { store } from './store';


const emptyTheme = {};

const theme = {
  [modalThemeNamespace]: {
    blanket: {
      opacity: 0.7,
    },
    content: {
      maxWidth: '500px',
    },
    headerWrapper: {
      padding: '20px',
      borderBottom: `1px solid ${colors.GRAY}`,
    },
    iconClose: {
      width: '30px',
      height: '30px',
    },
    header: {
      fontSize: '18px',
      color: colors.GRAY_BLUE,
    },
    body: {
      padding: '20px',
    },
  } as IModalTheme,
};


const StyledButton = styled.button`
  display: block;
  cursor: pointer;
  font-weight: 600;
  width: 300px;
  padding: 10px;
  margin-bottom: 15px;
  background: #f8f9fa;
  color: #31394C;
  border: 1px solid rgba(49, 57, 76, 0.1);
  border-radius: 5px;
`;

const ModalWithPayload: React.FC<{id?: number}> = ({ id }) => (
  <>
    <StyledButton
      onClick={ () => store.dispatch(xcriticalModalOpen('modalWithPayload', {
        id: 1,
      })) }
    >
      Open Modal With Payload
    </StyledButton>

    <ConnectedModal title="Modal With Payload" name="modalWithPayload">
      <div>{ `Payload value: ${id}` }</div>
    </ConnectedModal>
  </>
);

const mapStateToProps = (state) => {
  const modal = getModalByName(state, 'modalWithPayload');

  return {
    id: modal.id,
  };
};

const ConnectedModalWithPayload = connect(mapStateToProps)(ModalWithPayload);

const Modals = ({ component: ModalComponent }): React.ReactElement => {
  const [isFirstOpen, setIsFirstOpen] = useState(false);
  const [isSecondOpen, setIsSecondOpen] = useState(false);

  const handleFirstOpen = useCallback(() => {
    setIsFirstOpen(true);
  }, []);

  const handleSecondOpen = useCallback(() => {
    setIsSecondOpen(true);
  }, []);

  const handleFirstClose = useCallback(() => {
    setIsFirstOpen(false);
  }, []);

  const handleSecondClose = useCallback(() => {
    setIsSecondOpen(false);
  }, []);

  return (
    <>
      <button type="button" onClick={ handleFirstOpen }>Open first</button>
      <ModalComponent isOpen={ isFirstOpen } title="First Modal" name="first" onModalCancel={ handleFirstClose }>
        <button type="button" onClick={ handleSecondOpen }>Open second</button>
      </ModalComponent>
      {
        ModalComponent === Modal ? (
          <ModalProvider>
            <ModalComponent isOpen={ isSecondOpen } title="Second Modal" name="second" onModalCancel={ handleSecondClose }>
              Second
            </ModalComponent>
          </ModalProvider>
        ) : (
          <ModalComponent isOpen={ isSecondOpen } title="Second Modal" name="second" onModalCancel={ handleSecondClose }>
            Second
          </ModalComponent>
        )
      }
    </>
  );
};

storiesOf('ConnectedModal', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <Provider store={ store }>
      <ThemeProvider theme={ emptyTheme }>
        <StyledButton onClick={ () => store.dispatch(xcriticalModalOpen('defaultModal')) }>
          Open Default Modal
        </StyledButton>

        <ConnectedModal
          title="Default Modal"
          name="defaultModal"
          widths={ {
            width: text('Width', '500px'),
            minWidth: text('Min width', '400px'),
            maxWidth: text('Max width', '800px'),
          } }
        >
          <div>Body example</div>
          <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, rem!</div>
        </ConnectedModal>
      </ThemeProvider>
    </Provider>
  ))
  .add('With custom icon close', () => (
    <Provider store={ store }>
      <ThemeProvider theme={ emptyTheme }>
        <StyledButton onClick={ () => store.dispatch(xcriticalModalOpen('withCustomIconClose')) }>
          Open Modal With Custom Close Icon
        </StyledButton>

        <ConnectedModal
          title="Modal With Custom Icon Close"
          name="withCustomIconClose"
          iconClose={ <CloseCircleOutlineIcon size="100%" /> }
        >
          <div>Body example</div>
          <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, rem!</div>
        </ConnectedModal>
      </ThemeProvider>
    </Provider>
  ))
  .add('With payload', () => (
    <Provider store={ store }>
      <ThemeProvider theme={ emptyTheme }>
        <ConnectedModalWithPayload />
      </ThemeProvider>
    </Provider>
  ))
  .add('With Theme', () => (
    <Provider store={ store }>
      <ThemeProvider theme={ theme }>
        <StyledButton onClick={ () => store.dispatch(xcriticalModalOpen('themedModal')) }>
          Open Themed Modal
        </StyledButton>

        <ConnectedModal title="Themed Modal" name="themedModal">
          <div>Body example</div>
          <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, rem!</div>
        </ConnectedModal>
      </ThemeProvider>
    </Provider>
  ))
  .add('Two Modals', () => (
    <ThemeProvider theme={ emptyTheme }>
      <Modals component={ Modal } />
    </ThemeProvider>
  ))
  .add('Two Modals Portal', () => (
    <ThemeProvider theme={ emptyTheme }>
      <Modals component={ ModalPortal } />
    </ThemeProvider>
  ));
