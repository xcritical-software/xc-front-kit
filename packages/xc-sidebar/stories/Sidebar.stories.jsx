import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import Sidebar from '../src';


const Content = styled.div`
  width: 100%;
  height: 100vh;
  background-color: white;
  display: flex;
`;
const LeftPanel = styled.div`
  color: red;
`;
const content = new Array(20).fill(`
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been 
the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of 
type and scrambled it to make a type specimen book. It has survived not only five centuries, 
but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised
 in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more 
 recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`).join(' ');
const RightPanel = styled.div`
  flex: 1 1 0;
  color: blue;
`;

const props = {
  maxWidth: 600,
  minWidth: 80,
  startWidth: 400,
};

storiesOf('Sidebar', module)
  .add('Basic', () => (
    <Content>
      <LeftPanel>
        <Sidebar { ...props }>
          { content }
        </Sidebar>
      </LeftPanel>
      <RightPanel>
        { content }
      </RightPanel>
    </Content>
  ));
