/* eslint-disable import/no-extraneous-dependencies */
import React, { AllHTMLAttributes, forwardRef } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { storiesOf } from '@storybook/react';
import { Link, MemoryRouter } from 'react-router-dom';
import { colors } from '@xcritical/theme';

import Button, { ButtonGroup, buttonGroupThemeNamespace } from '../src';


const theme = {
  [buttonGroupThemeNamespace]: {
    appearance: {
      default: {
        _border: `1px solid ${colors.GREEN}`,
        _borderRadius: '0',
      },
      primary: {
        _border: `1px solid ${colors.PRIMARY}`,
      },
      rounded: {
        _borderRadius: '15px',
      },
      general: {
        buttonGroup: {
          display: 'inline-flex',
          padding: '5px',
          border: '1px solid black',
        },
      },
    },
  },
};

const Wrapper = styled.div`
  margin-bottom: 15px;
`;

storiesOf('ButtonGroup', module)
  .add('One button', () => (
    <ButtonGroup>
      <Button>1</Button>
    </ButtonGroup>
  ))
  .add('Two buttons (with states)', () => (
    <ButtonGroup>
      <Button disabled>1</Button>
      <Button selected>2</Button>
    </ButtonGroup>
  ))
  .add('Three buttons (with links)', () => (
    <MemoryRouter>
      <ButtonGroup>
        <Button>1</Button>
        <Button href="/2">2</Button>
        <Button
          href="/3"
          component={
            forwardRef<HTMLAnchorElement, Link & AllHTMLAttributes<HTMLAnchorElement>>(({ href = '', children, ...rest }, ref) => (
              <Link { ...rest } to={ href } innerRef={ ref }>
                { children }
              </Link>
            ))
          }
        >
          3
        </Button>
      </ButtonGroup>
    </MemoryRouter>
  ))
  .add('Themed', () => (
    <ThemeProvider theme={ theme }>
      <Wrapper>
        <ButtonGroup appearance="rounded">
          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>
        </ButtonGroup>
      </Wrapper>
      <Wrapper>
        <ButtonGroup appearance="primary">
          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>
        </ButtonGroup>
      </Wrapper>
      <Wrapper>
        <ButtonGroup baseAppearance="primary" appearance="rounded">
          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>
        </ButtonGroup>
      </Wrapper>
      <Wrapper>
        <ButtonGroup appearance="general">
          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>
        </ButtonGroup>
      </Wrapper>
    </ThemeProvider>
  ));
