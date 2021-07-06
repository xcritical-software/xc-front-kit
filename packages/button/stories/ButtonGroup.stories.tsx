/* eslint-disable import/no-extraneous-dependencies */
import React, { forwardRef, RefObject } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { storiesOf } from '@storybook/react';
import { Link, MemoryRouter } from 'react-router-dom';

import { colors } from '@xcritical/theme';

import Button, {
  ButtonGroup,
  buttonGroupThemeNamespace,
  buttonThemeNamespace,
} from '../src';

const buttonTheme = {
  appearance: {
    pagination: {
      borderColor: colors.PRIMARY,
      disabled: {
        borderColor: colors.PRIMARY,
      },
      selected: {
        borderColor: colors.PRIMARY,
      },
    },
  },
};

const themeWithButton = {
  [buttonThemeNamespace]: buttonTheme,
};

const complexTheme = {
  [buttonThemeNamespace]: buttonTheme,
  [buttonGroupThemeNamespace]: {
    borderRadius: '0',
  },
};

const specificButtonGroupTheme = {
  [buttonGroupThemeNamespace]: {
    borderRadius: '15px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
  },
};

const Wrapper = styled.div`
  margin-bottom: 15px;
`;

storiesOf('ButtonGroup', module)
  .add('One button', () => (
    <ThemeProvider theme={themeWithButton}>
      <ButtonGroup>
        <Button appearance="pagination">1</Button>
      </ButtonGroup>
    </ThemeProvider>
  ))
  .add('Two buttons (with states)', () => (
    <ThemeProvider theme={themeWithButton}>
      <ButtonGroup>
        <Button appearance="pagination" disabled>
          1
        </Button>
        <Button appearance="pagination" selected>
          2
        </Button>
      </ButtonGroup>
    </ThemeProvider>
  ))
  .add('Three buttons (with links)', () => (
    <MemoryRouter>
      <ThemeProvider theme={themeWithButton}>
        <ButtonGroup>
          <Button appearance="pagination">1</Button>
          <Button appearance="pagination" href="/2">
            2
          </Button>
          <Button
            appearance="pagination"
            component={forwardRef(
              ({ children, className }, ref: RefObject<HTMLAnchorElement>) => (
                <Link innerRef={ref} className={className} to="/3">
                  {children}
                </Link>
              )
            )}>
            3
          </Button>
        </ButtonGroup>
      </ThemeProvider>
    </MemoryRouter>
  ))
  .add('Themed', () => (
    <ThemeProvider theme={complexTheme}>
      <Wrapper>
        <ButtonGroup>
          <Button appearance="pagination">1</Button>
          <Button appearance="pagination">2</Button>
          <Button appearance="pagination">3</Button>
        </ButtonGroup>
      </Wrapper>
      <Wrapper>
        <ButtonGroup theme={specificButtonGroupTheme}>
          <Button appearance="pagination">1</Button>
          <Button appearance="pagination">2</Button>
          <Button appearance="pagination">3</Button>
        </ButtonGroup>
      </Wrapper>
    </ThemeProvider>
  ));
