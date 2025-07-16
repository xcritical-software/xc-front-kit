import styled from 'styled-components';
import { lighten } from 'polished';

import { InlineEditTheme } from '../src';

const generateTheme = (
  baseBgColor: string,
  textColor: string
): InlineEditTheme => ({
  backgroundColor: baseBgColor,
  color: textColor,
  appearance: {
    crm: {
      readViewContentWrapper: {
        padding: 0,
      },
      editButton: {
        focus: {
          border: `2px solid ${lighten(0.6, '#003e6c')}`,
          backgroundColor: '#003e6c',
        },
      },
      actionButtonWrapper: {
        backgroundColor: '#003e6c',
      },
      button: {
        backgroundColor: 'white',
        border: '1px solid blue',
      },
      hover: {
        backgroundColor: lighten(0.6, '#003e6c'),
      },
      confirmIcon: {
        fill: 'green',
      },
      cancelIcon: {
        fill: 'red',
      },
    },
  },
});

export const theme = generateTheme('#fff', '#000');

export const options = [
  { value: 'firstCard', label: '1234 1234 1234 1234' },
  { value: 'secondCard', label: '4321 4321 4321 4321' },
  { value: 'thirdCard', label: '4567 4567 4567 4567' },
  { value: 'fourthCard', label: '0123 0123 0123 0123' },
];

export const ErrorMessage = styled.p`
  color: red;
  padding: 2px 5px 2px;
  margin: 0;
  font-size: 0.9em;
  word-break: break-word;
  text-align: justify;
`;
