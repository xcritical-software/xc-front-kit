/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Badge from '@xcritical/badge';
import { withKnobs } from '@storybook/addon-knobs';
import styled from 'styled-components';


const Head = styled.h1<any>`
  font-size: ${({ size }: any) => `${size}px`}
`;

storiesOf('Badge', module)
  .addDecorator(withKnobs)
  .add('Basic', () => (
    <>
     A simple text with

      <Badge>badge</Badge>
      <Head size={ 13 }>
Example heading
        <Badge>New</Badge>
      </Head>
      <Head size={ 15 }>
Example heading
        <Badge>New</Badge>
      </Head>
      <Head size={ 16 }>
Example heading
        <Badge>New</Badge>
      </Head>
      <Head size={ 17 }>
Example heading
        <Badge>New</Badge>
      </Head>
      <Head size={ 18 }>
Example heading
        <Badge>New</Badge>
      </Head>
      <Head size={ 19 }>
Example heading
        <Badge>New</Badge>
      </Head>
    </>
  ));
