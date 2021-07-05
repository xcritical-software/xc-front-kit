/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import styled, { ThemeProvider } from 'styled-components';

import {
  Notification,
  notify,
  Bounce,
  Slide,
  Flip,
  Zoom,
  notificationThemeNamespace,
} from '../src';

const theme = {
  [notificationThemeNamespace]: {
    container: {
      padding: '5px',
      border: '1px solid #eee',
    },
    toast: {
      padding: '20px',
    },
    default: {
      toast: {
        background: '#ccc',
        color: '#5a5a5a',
        boxShadow: 'none',
      },
      closeButton: {
        opacity: 0.7,
      },
      progressBar: {
        background: 'rgba(255, 255, 255, 0.5)',
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
  color: #31394c;
  border: 1px solid rgba(49, 57, 76, 0.1);
  border-radius: 5px;
`;

const AnimationNotification: React.FC = () => (
  <>
    <Notification />
    <StyledButton onClick={() => notify('Bounce', { transition: Bounce })}>
      Show Bounce Notification
    </StyledButton>
    <StyledButton onClick={() => notify('Slide', { transition: Slide })}>
      Show Slide Notification
    </StyledButton>
    <StyledButton onClick={() => notify('Flip', { transition: Flip })}>
      Show Flip Notification
    </StyledButton>
    <StyledButton onClick={() => notify('Zoom', { transition: Zoom })}>
      Show Zoom Notification
    </StyledButton>
  </>
);

const TypeNotification: React.FC = () => (
  <>
    <Notification />
    <StyledButton onClick={() => notify('Default', { type: 'default' })}>
      Show Default Notification
    </StyledButton>
    <StyledButton onClick={() => notify('Info', { type: 'info' })}>
      Show Info Notification
    </StyledButton>
    <StyledButton onClick={() => notify('Warning', { type: 'warning' })}>
      Show Warning Notification
    </StyledButton>
    <StyledButton onClick={() => notify('Success', { type: 'success' })}>
      Show Success Notification
    </StyledButton>
    <StyledButton onClick={() => notify('Error', { type: 'error' })}>
      Show Error Notification
    </StyledButton>
  </>
);

const ThemedNotification: React.FC = () => (
  <ThemeProvider theme={theme}>
    <>
      <Notification />
      <StyledButton onClick={() => notify('Themed')}>
        Show Themed Notification
      </StyledButton>
    </>
  </ThemeProvider>
);

storiesOf('Notification', module)
  .add('Animation', () => <AnimationNotification />)
  .add('Type', () => <TypeNotification />)
  .add('Themed', () => <ThemedNotification />);
