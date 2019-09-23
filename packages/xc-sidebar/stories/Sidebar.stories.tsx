import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { Sidebar } from '../src';


const Content = styled.div`
  background-color: white;
  display: flex; 
  min-height: 100vh;
`;

const colors = [
  'blue', 'lightblue', 'pink', 'indigo', 'red'
]

const Block = styled.div`
  width: 100px;
  height: 100px ;
  margin: 20px;
  background-color: ${({ color }) => color};
  float: left;

`

const Navigation = styled.div`
  width: 80px;
  float: left;
  height: 100vh ;
  div {
    width: 80px;
    background-color: yellow;
    height: 100vh ;
    top: 0;
    position: fixed;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
`

const list = (n: number) => {
  return (
    <>
      <ul style={{ listStyleType: 'none' }} >
        {new Array(n).fill(true).map((el, i) => (
          <li
            style={{ padding: '10px 0 10px 0' }}
          >This is list item number {i}</li>
        ))}
      </ul>
    </>
  )
}


const content = new Array(20).fill(true).map(() => <Block color={ colors[Math.floor(Math.random() * colors.length)] }  />)
const RightPanel = styled.div`
  flex: 1 1 0;
  color: blue;
`;

const props = {
  maxWidth: 400,
  minWidth: 30,
};

storiesOf('Sidebar', module)
.add('Basic', () => (
  <Content>
    <Sidebar { ...props } >
      { list(100) }
    </Sidebar>
    <RightPanel>
      { content }
    </RightPanel>
  </Content>
  ))
  
  .add('With left nav', () => (
    <>
    <Navigation>
      <div>
        <ul>
          <li>Link 1</li>
          <li>Link 2</li>
          <li>Link 3</li>
          <li>Link 4</li>
        </ul>
      </div>
    </Navigation>
    <Content>
        <Sidebar { ...props } >
          { list(100) }
        </Sidebar>
      <RightPanel>
        { content }
      </RightPanel>
    </Content>
  </>
  ))