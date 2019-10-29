/* eslint-disable import/no-extraneous-dependencies */
import React, { ReactElement, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import { storiesOf } from '@storybook/react';

import { Popover } from '../src';

import { popperThemeNamespace } from '../src/theme';


const theme = {
  [popperThemeNamespace]: {
    appearance: {
      default: {
        content: {
          background: '#ddd',
          padding: {
            left: '10px',
            right: '10px',
          },
          border: {
            color: '#777',
            radius: '5px',
          },
        },
        arrow: {
          background: '#ddd',
          border: {
            color: '#777',
          },
        },
      },
    },
  },
};

const ComponentWithPopover = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  color: #fff;
  background-color: #7b7b7b;
  margin: 0 auto 40px auto;
`;

const Wrapper = styled.div`
  width: 300px;
  display: inline-block;
`;

const popoverContent = <div>Popover Content</div>;

const Controlled = (): ReactElement => {
  const [controlledVisible, setControlledVisible] = useState(false);

  return (
    <>
      <button type="button" onClick={ () => setControlledVisible(!controlledVisible) }>Toggle</button>
      <hr />
      <Popover
        position="bottom center"
        content={ popoverContent }
        visible={ controlledVisible }
      >
        <ComponentWithPopover>Right Top</ComponentWithPopover>
      </Popover>
    </>
  );
};

storiesOf('Popover', module)
  .add('Default', () => (
    <Grid columns={ 2 }>
      <Cell center>
        <h1>Top</h1>
        <Wrapper>
          <Popover position="top left" visible content={ popoverContent }>
            <ComponentWithPopover>Top Left</ComponentWithPopover>
          </Popover>
          <Popover position="top center" visible content={ popoverContent }>
            <ComponentWithPopover>Top Center</ComponentWithPopover>
          </Popover>
          <Popover position="top right" visible content={ popoverContent }>
            <ComponentWithPopover>Top Right</ComponentWithPopover>
          </Popover>
        </Wrapper>
      </Cell>
      <Cell center>
        <h1>Bottom</h1>
        <Wrapper>
          <Popover position="bottom left" visible content={ popoverContent }>
            <ComponentWithPopover>Bottom Left</ComponentWithPopover>
          </Popover>
          <Popover position="bottom center" visible content={ popoverContent }>
            <ComponentWithPopover>Bottom Center</ComponentWithPopover>
          </Popover>
          <Popover position="bottom right" visible content={ popoverContent }>
            <ComponentWithPopover>Bottom Right</ComponentWithPopover>
          </Popover>
        </Wrapper>
      </Cell>
      <Cell center>
        <h1>Left</h1>
        <Wrapper>
          <Popover position="left top" visible content={ popoverContent }>
            <ComponentWithPopover>Left Top</ComponentWithPopover>
          </Popover>
          <Popover position="left middle" visible content={ popoverContent }>
            <ComponentWithPopover>Left Middle</ComponentWithPopover>
          </Popover>
          <Popover position="left bottom" visible content={ popoverContent }>
            <ComponentWithPopover>Left Bottom</ComponentWithPopover>
          </Popover>
        </Wrapper>
      </Cell>
      <Cell center>
        <h1>Right</h1>
        <Wrapper>
          <Popover position="right top" visible content={ popoverContent }>
            <ComponentWithPopover>Right Top</ComponentWithPopover>
          </Popover>
          <Popover position="right middle" visible content={ popoverContent }>
            <ComponentWithPopover>Right Middle</ComponentWithPopover>
          </Popover>
          <Popover position="right bottom" visible content={ popoverContent }>
            <ComponentWithPopover>Right Bottom</ComponentWithPopover>
          </Popover>
        </Wrapper>
      </Cell>
    </Grid>
  ))
  .add('Without arrow', () => (
    <Grid columns={ 2 }>
      <Cell center>
        <h1>Top</h1>
        <Wrapper>
          <Popover position="top left" visible withArrow={ false } content={ popoverContent }>
            <ComponentWithPopover>Top Left</ComponentWithPopover>
          </Popover>
          <Popover position="top center" visible withArrow={ false } content={ popoverContent }>
            <ComponentWithPopover>Top Center</ComponentWithPopover>
          </Popover>
          <Popover position="top right" visible withArrow={ false } content={ popoverContent }>
            <ComponentWithPopover>Top Right</ComponentWithPopover>
          </Popover>
        </Wrapper>
      </Cell>
      <Cell center>
        <h1>Bottom</h1>
        <Wrapper>
          <Popover position="bottom left" visible withArrow={ false } content={ popoverContent }>
            <ComponentWithPopover>Bottom Left</ComponentWithPopover>
          </Popover>
          <Popover position="bottom center" visible withArrow={ false } content={ popoverContent }>
            <ComponentWithPopover>Bottom Center</ComponentWithPopover>
          </Popover>
          <Popover position="bottom right" visible withArrow={ false } content={ popoverContent }>
            <ComponentWithPopover>Bottom Right</ComponentWithPopover>
          </Popover>
        </Wrapper>
      </Cell>
      <Cell center>
        <h1>Left</h1>
        <Wrapper>
          <Popover position="left top" visible withArrow={ false } content={ popoverContent }>
            <ComponentWithPopover>Left Top</ComponentWithPopover>
          </Popover>
          <Popover position="left middle" visible withArrow={ false } content={ popoverContent }>
            <ComponentWithPopover>Left Middle</ComponentWithPopover>
          </Popover>
          <Popover position="left bottom" visible withArrow={ false } content={ popoverContent }>
            <ComponentWithPopover>Left Bottom</ComponentWithPopover>
          </Popover>
        </Wrapper>
      </Cell>
      <Cell center>
        <h1>Right</h1>
        <Wrapper>
          <Popover position="right top" visible withArrow={ false } content={ popoverContent }>
            <ComponentWithPopover>Right Top</ComponentWithPopover>
          </Popover>
          <Popover position="right middle" visible withArrow={ false } content={ popoverContent }>
            <ComponentWithPopover>Right Middle</ComponentWithPopover>
          </Popover>
          <Popover position="right bottom" visible withArrow={ false } content={ popoverContent }>
            <ComponentWithPopover>Right Bottom</ComponentWithPopover>
          </Popover>
        </Wrapper>
      </Cell>
    </Grid>
  ))
  .add('Themed', () => (
    <ThemeProvider theme={ theme }>
      <Popover position="bottom center" visible content={ popoverContent }>
        <ComponentWithPopover>Right Top</ComponentWithPopover>
      </Popover>
    </ThemeProvider>
  ))
  .add('Controlled', () => (
    <Controlled />
  ));
