/* eslint-disable import/no-extraneous-dependencies */
import React, {
  useState, useCallback, useMemo,
} from 'react';
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
} from '../src';

import { store } from './store';


const emptyTheme = {};

const theme = {
  [modalThemeNamespace]: {
    blanket: {
      opacity: 1,
    },
    appearance: {
      default: {
        content: {
        },
        headerWrapper: {
          padding: '24px',
          borderBottom: `1px solid ${colors.GRAY}`,
        },
        iconClose: {
          width: '50px',
          height: '50px',
        },
        header: {
          fontSize: '18px',
          color: colors.GRAY_BLUE,
        },
        body: {
          padding: '20px',
        },
      },
      mobile: {
        content: {
          position: 'absolute',
          minWidth: '100%',
          minHeight: '100%',
          height: '100%',
          width: '100%',
          color: 'red',
          top: '0px',
          left: '0px',
          transform: 'translate(0%, 0%)',
          backgroundColor: colors.LIGHT,
          borderRadius: '0px',
        },
        headerWrapper: {
          padding: '6px',
          borderBottom: `1px solid ${colors.GOLDENROD}`,
        },
        iconClose: {
          width: '16px',
          height: '16px',
        },
        header: {
          fontSize: '18px',
          color: colors.DARK_LIME,
        },
        body: {
          padding: '14px',
        },
      },
    },
  },
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

const ThemedModal = ({ appearance }: { appearance: string }) => (
  <>
    <StyledButton onClick={ () => store.dispatch(xcriticalModalOpen(appearance)) }>
      Open
      { ' ' }
      { appearance }
      { ' ' }
      Modal
    </StyledButton>
    <ConnectedModal title={ `Appearance: ${appearance}` } name={ appearance } appearance={ appearance }>
      <div>Body example</div>
      <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, rem!</div>
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
          width={ text('Width', 'auto') }
          minWidth={ text('Min width', '100px') }
          maxWidth={ text('Max width', '300px') }
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
        <ThemedModal appearance="themedModal" />

        <ThemedModal appearance="mobile" />

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
  ))
  .add('Full Screen', () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(true);

    const handleOpen = useCallback(() => {
      setIsOpen(true);
    }, []);
    const handleClose = useCallback(() => {
      setIsOpen(false);
    }, []);

    const handleChangeFullScreen = useCallback(() => {
      setIsFullScreen(!isFullScreen);
    }, [isFullScreen]);


    const modalSizes = useMemo(() => {
      if (isFullScreen) {
        return {
          width: '100%',
          height: '100%',
          maxWidth: '100%',

        };
      }

      return { };
    }, [isFullScreen]);

    return (
      <ThemeProvider theme={ theme }>
        <button type="button" onClick={ handleOpen }>Open modal</button>
        <br />
        <label htmlFor="change-fullscreen">
          <input id="change-fullscreen" type="checkbox" onChange={ handleChangeFullScreen } checked={ isFullScreen } />
          Is Full Screen
        </label>
        <ModalPortal
          name="full-screen"
          title="Full Screen"
          isOpen={ isOpen }
          onModalCancel={ handleClose }
          { ...modalSizes }
        >
          <div>
            <h1>
              This is Full Screen Modal
            </h1>
          </div>
        </ModalPortal>
      </ThemeProvider>
    );
  });
