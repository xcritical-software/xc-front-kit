/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

// eslint-disable-next-line import/no-unresolved
import Popper from '@xcritical/popper';
import { IPopperProps } from '../src/interfaces';


const targetStyle: any = {
  display: 'inline-block',
  position: 'relative',
  top: '100px',
  left: '150px',
  background: 'red',
  padding: '50px',
};

const layerStyles = {
  background: 'green',
  padding: '5px',
};

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
`;

const StyledRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const AlignmentContainer = styled.div`
  position: relative;
  height: 100px;
  width: 100px;
  background-color: #eee;
  display: inline-block;
  margin: 25px 0;
`;

const Content = (): React.ReactElement => <div style={ layerStyles }>LayerContent</div>;

const ExampleAlignment = (props: IPopperProps): React.ReactElement => (
  <Popper
    { ...props }
    content={ () => (
      <div style={ { background: '#fca' } }>
        { props.position }
      </div>
    ) }
  >
    <AlignmentContainer />
  </Popper>
);

storiesOf('Popper', module)
  .add('Fixed Position', () => (
    <StyledRoot>
      <StyledRow>
        <ExampleAlignment autoFlip={ false } position="left top" />
        <ExampleAlignment autoFlip={ false } position="left middle" />
        <ExampleAlignment autoFlip={ false } position="left bottom" />
      </StyledRow>

      <StyledRow>
        <ExampleAlignment autoFlip={ false } position="right top" />
        <ExampleAlignment autoFlip={ false } position="right middle" />
        <ExampleAlignment autoFlip={ false } position="right bottom" />
      </StyledRow>

      <StyledRow>
        <ExampleAlignment autoFlip={ false } position="top left" />
        <ExampleAlignment autoFlip={ false } position="top center" />
        <ExampleAlignment autoFlip={ false } position="top right" />
      </StyledRow>

      <StyledRow>
        <ExampleAlignment autoFlip={ false } position="bottom left" />
        <ExampleAlignment autoFlip={ false } position="bottom center" />
        <ExampleAlignment autoFlip={ false } position="bottom right" />
      </StyledRow>
    </StyledRoot>
  )).add('Custom Flip', () => (
    <div>
      <div
        style={ {
          border: '1px solid black',
          height: '300px',
          width: '300px',
          overflow: 'scroll',
        } }
      >
        <div style={ { width: '500px', height: '500px' } }>
          <Popper
            autoFlip
            content={ Content }
            position="right middle"
            modifiers={ { flip: { boundariesElement: 'scrollParent' } } }
          >
            <div style={ targetStyle }>Target</div>
          </Popper>
        </div>
      </div>
    </div>
  ));
