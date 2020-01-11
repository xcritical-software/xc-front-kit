/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { colors } from '@xcritical/theme';

import {
  Modal,
  modalThemeNamespace,
  xcriticalModalOpen,
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

storiesOf('Modal', module)
  .add('Default', () => (
    <Provider store={ store }>
      <ThemeProvider theme={ emptyTheme }>
        <StyledButton onClick={ () => store.dispatch(xcriticalModalOpen('defaultModal')) }>
            Open Default Modal
        </StyledButton>

        <Modal title="Default Modal" name="defaultModal">
          <div>Body example</div>
          <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, rem!</div>
        </Modal>
      </ThemeProvider>
    </Provider>
  ))
  .add('With Theme', () => (
    <Provider store={ store }>
      <ThemeProvider theme={ theme }>
        <StyledButton onClick={ () => store.dispatch(xcriticalModalOpen('themedModal')) }>
          Open Themed Modal
        </StyledButton>

        <Modal title="Themed Modal" name="themedModal">
          <div>Body example</div>
          <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, rem!</div>
        </Modal>
      </ThemeProvider>
    </Provider>
  ));
