/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import React, { forwardRef, AllHTMLAttributes } from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { Link, MemoryRouter } from 'react-router-dom';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';

// eslint-disable-next-line import/no-unresolved
import { IThemeNamespace } from '@xcritical/theme';
import Button, { buttonThemeNamespace } from '../src';

import { MasterCardIcon, ChevronDown, ChevronUp } from './Icons';
import { ButtonTheme } from '../src/interfaces';


const appearances = [
  'default',
  'primary',
  'secondary',
  'success',
  'link',
  'warning',
  'danger',
  'info',
  'light',
  'dark',
];

const Table = (props: any) => (
  <div style={ { display: 'table', minWidth: '280px' } } { ...props } />
);
const Row = (props: any) => (
  <div style={ { display: 'table-row' } } { ...props } />
);
const Cell = (props: any) => (
  <div style={ { display: 'table-cell', padding: 4 } } { ...props } />
);

function capitalize(str: string) {
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  return str.charAt(0).toUpperCase() + str.slice(1);
}


const theme: IThemeNamespace<ButtonTheme> = {
  [buttonThemeNamespace]: {
    fontSize: '15px',
    appearance: {
      pay: {
        prefixSpacing: 15,
        postfixSpacing: 15,
        background: 'linear-gradient(to top,  #337e29, #66a436)',
        color: '#fff',
        fontSize: '15px',
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        hover: {
          background: 'linear-gradient(to top,  #66a436, #337e29)',
          color: '#fff',
        },
        active: {
          background: 'linear-gradient(to top,  #66a436, #337e29)',
          color: '#fff',
        },
        selected: {
          background: 'linear-gradient(to top,  #66a436, #337e29)',
          color: '#fff',
        },
        disabled: {
          background: 'linear-gradient(to top,  #66a436, #337e29)',
          color: '#fff',
        },
      },
      select: {
        borderColor: '#575857',
        background: 'linear-gradient(to top,  #474747, #383838)',
        color: '#fff',

        selected: {
          borderColor: '#62aaff',
          background: 'linear-gradient(to top,  #474747, #383838)',
        },
        hover: {
          borderColor: '#62aaff',
          background: 'linear-gradient(to top,  #474747, #383838)',
        },
        disabled: {
          background: 'linear-gradient(to top,  #66a436, #337e29)',
          color: '#fff',
        },
      },
      default: {
        fontWeight: 400,
        color: '#a7a7a7',
        background: '#575857',
        borderColor: 'transparent',
        boxShadowColor: '#62AAFF',
        hover: {
          color: '#a7a7a7',
          background: '#575857',
          borderColor: 'transparent',
          boxShadowColor: '#62AAFF',
        },
        active: {
          color: '#a7a7a7',
          background: '#575857',
          borderColor: 'transparent',
          boxShadowColor: '#62AAFF',
        },
        disabled: {
          color: '#a7a7a7',
          background: '#575857',
          borderColor: 'transparent',
        },
      },
      primary: {
        paddingBottom: '10px',
        paddingLeft: '10px',
        paddingRight: '10px',
        paddingTop: '10px',
        fontWeight: 600,
        color: '#fff',
        background: 'linear-gradient(to top, #337e29, #66a436)',
        borderColor: 'transparent',
        boxShadowColor: '#62AAFF',
        // default: {
        //   color: '#fff',
        //   background: 'linear-gradient(to top, #337e29, #66a436)',
        //   borderColor: 'transparent',
        //   boxShadowColor: '#62AAFF',
        // },
        hover: {
          color: '#fff',
          background: 'linear-gradient(to top, #337e29, #66a436)',
          borderColor: 'transparent',
          boxShadowColor: '#62AAFF',
        },
        active: {
          color: '#fff',
          background: 'linear-gradient(to top, #337e29, #66a436)',
          borderColor: 'transparent',
          boxShadowColor: '#62AAFF',
        },
        disabled: {
          color: '#fff',
          background: 'linear-gradient(to top, #337e29, #66a436)',
          borderColor: 'transparent',
        },
      },
    },
  },
};

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('Basic', () => (
    <Button
      key="button"
      disabled={ boolean('Disabled', false) }
      outline={ boolean('Outline', false) }
    >
      { text('Button Text', 'Button') }
    </Button>
  ))
  .add('Other', () => (
    <Table>
      <Row>
        <Cell>
          <span>
          You need to click
            <Button
              onClick={ () => console.log('clicking the Component') }
            >
            Pay
            </Button>
          button
          </span>

        </Cell>

      </Row>

    </Table>
  ))

  .add('Link', () => (
    <Table>
      <Row><Cell><Button href="/ro" target="_blank">Pay</Button></Cell></Row>
      <Row><Cell><Button href="/ro" disabled target="_blank">Pay</Button></Cell></Row>
    </Table>
  ))
  .add('Router Link', () => (
    <ThemeProvider theme={ {} }>
      <MemoryRouter>
        <Table>
          <Row>
            <Cell>
              <Button
                href="/ro"
                component={
                  forwardRef<HTMLAnchorElement, Link & AllHTMLAttributes<HTMLAnchorElement>>(({ href = '', children, ...rest }, ref) => (
                    <Link { ...rest } to={ href } innerRef={ ref }>
                      { children }
                    </Link>
                  ))
                }
              >
              Go to
              </Button>
            </Cell>
          </Row>
        </Table>
      </MemoryRouter>
    </ThemeProvider>
  ))
  .add('Themed', () => (
    <ThemeProvider theme={ theme }>
      <Table>
        <Row><Cell><Button height="45px" appearance="primary" shouldFitContent>Pay</Button></Cell></Row>
        <Row><Cell><Button height="45px" appearance="pay" shouldFitContent selected>Pay</Button></Cell></Row>
        <Row><Cell><Button height="45px" appearance="pay" shouldFitContent disabled>Pay</Button></Cell></Row>
        <Row>
          <Cell>
            <Button

              postfix={ <MasterCardIcon /> }
              height="45px"
              appearance="pay"
              theme={
                theme
              }
            >
            Pay
            </Button>
          </Cell>
        </Row>
        <Row>
          <Cell>
            <Button

              postfix={ <MasterCardIcon /> }
              height="45px"
              appearance="pay"
              shouldFitContent
              theme={
                theme
              }
            >
            Pay
            </Button>
          </Cell>
        </Row>
        <Row>
          <Cell>
            <Button
              prefix={ <MasterCardIcon /> }
              height="45px"
              appearance="pay"
              textPosition="left"
              shouldFitContent
              theme={
                theme
              }
            >
            Pay
            </Button>
          </Cell>
        </Row>
        <Row>
          <Cell>
            <Button
              prefix={ <MasterCardIcon /> }
              postfix={ <MasterCardIcon /> }
              height="45px"
              appearance="pay"
              shouldFitContent
              theme={
                theme
              }
            >
            Pay
            </Button>
          </Cell>
        </Row>
      </Table>
    </ThemeProvider>
  ))
  .add('Apperance', () => (
    <ThemeProvider theme={ {} }>
      <Table>
        { appearances.map((a) => (
          <Row key={ a }>
            <Cell>
              <Button appearance={ a } key={ `${a}` }>
                { capitalize(a) }
              </Button>
            </Cell>

            <Cell>
              <Button
                key={ `${a}_disabled` }
                appearance={ a }
                disabled
              >
                  Disabled
              </Button>
            </Cell>
            <Cell>
              <Button
                key={ `${a}_disabled_selected` }
                appearance={ a }
                selected
              >
                  Selected
              </Button>
            </Cell>
            <Cell>
              <Button appearance={ a } outline key={ `${a}_outline` }>
                { capitalize(a) }
              </Button>
            </Cell>

            <Cell>
              <Button
                appearance={ a }
                outline
                key={ `${a}_outline_disabled` }
                disabled
              >
                  Disabled
              </Button>
            </Cell>
            <Cell>
              <Button
                appearance={ a }
                outline
                selected
                key={ `${a}_outline_selected` }
              >
                  Selected
              </Button>
            </Cell>
          </Row>
        )) }
      </Table>
    </ThemeProvider>
  ))
  .add('Select', () => (
    <ThemeProvider theme={ theme }>
      <Table>
        <Row>
          <Cell>
            <Button
              appearance="select"
              shouldFitContent
              postfix={
                <ChevronDown />
              }
            >
            5536 91** **** 8402
            </Button>
          </Cell>
        </Row>
        <Row>
          <Cell>
            <Button
              appearance="select"
              shouldFitContent
              selected
              postfix={
                <ChevronUp />
              }
            >
            5536 91** **** 8402
            </Button>
          </Cell>
        </Row>
        <Row>
          <Cell>
            <Button
              prefix={ <MasterCardIcon /> }
              appearance="select"
              shouldFitContent
              textPosition="left"
              postfix={
                <ChevronDown />
              }
            >
            5536 91** **** 8402
            </Button>
          </Cell>
        </Row>
        <Row>
          <Cell>
            <Button
              prefix={ <MasterCardIcon /> }
              appearance="select"
              shouldFitContent
              selected
              textPosition="left"
              postfix={
                <ChevronUp />
              }
            >
            5536 91** **** 8402
            </Button>
          </Cell>
        </Row>
      </Table>
    </ThemeProvider>
  ))
  .add('RTL Support', () => (
    <Table>
      <Row>
        <Cell>
          <Button
            isRTL
            height="45px"
            shouldFitContent
          >
Pay
          </Button>
        </Cell>
      </Row>
      <Row>
        <Cell>
          <Button
            isRTL
            height="45px"
            shouldFitContent
            selected
          >
Pay
          </Button>
        </Cell>
      </Row>
      <Row>
        <Cell>
          <Button
            isRTL
            height="45px"
            shouldFitContent
            disabled
          >
Pay
          </Button>
        </Cell>
      </Row>
      <Row>
        <Cell>
          <Button
            isRTL
            postfix={ <MasterCardIcon /> }
            height="45px"
          >
            Pay
          </Button>
        </Cell>
      </Row>
      <Row>
        <Cell>
          <Button
            isRTL
            postfix={ <MasterCardIcon /> }
            height="45px"
            shouldFitContent
          >
            Pay
          </Button>
        </Cell>
      </Row>
      <Row>
        <Cell>
          <Button
            isRTL
            prefix={ <MasterCardIcon /> }
            height="45px"
            textPosition="left"
            shouldFitContent
          >
            Pay
          </Button>
        </Cell>
      </Row>
      <Row>
        <Cell>
          <Button
            isRTL
            prefix={ <MasterCardIcon /> }
            postfix={ <MasterCardIcon /> }
            height="45px"
            shouldFitContent
          >
            Pay
          </Button>
        </Cell>
      </Row>
    </Table>
  ));
