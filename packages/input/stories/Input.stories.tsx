/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { action } from '@storybook/addon-actions';

import Input, { inputThemeNamespace, inputThemeStyle } from '@xcritical-old/xc-input';

import { customTheme } from './customThemes';
import { SearchIcon, ErrorIcon } from './Icons';


const theme = {
  [inputThemeNamespace]: {
    ...inputThemeStyle,
  },
};

const appearances = [
  'default',
  'dark',
];

const Table = (props) => (
  <div style={ { display: 'table', minWidth: '280px', float: props.isRTL ? 'right' : 'left' } } { ...props } />
);

const Row = (props) => (
  <div style={ { display: 'table-row' } } { ...props } />
);

const Cell = (props) => (
  <div style={ { display: 'table-cell', padding: 4 } } { ...props } />
);

const Flex = (props) => (
  <div style={ { display: 'flex', alignItems: 'center', justifyContent: 'center' } } { ...props } />
);

const BasicInput = () => {
  const [value, setValue] = React.useState('');

  const handleChange = (v) => {
    setValue(v);
  };

  return (
    <ThemeProvider theme={ theme }>
      <Input
        id="input-basic"
        name="input-basic"
        placeholder="Enter basic value"
        value={ value }
        onChange={ handleChange }
      />
    </ThemeProvider>
  );
};

const ValidationInput = () => {
  const [value, setValue] = React.useState('');
  const [isValid, setIsValid] = React.useState(null);

  const handleChange = (v) => {
    setValue(v);

    if (v.length === 0) {
      setIsValid(null);
    }
  };

  const handleValidate = (v) => {
    setIsValid(v);
  };

  const getValidationNote = () => {
    if (isValid === null) return null;

    return !isValid ? 'IP is not valid' : 'IP is valid';
  };

  return (
    <ThemeProvider theme={ customTheme }>
      <div>
        <Input
          id="input-validation"
          name="input-validation"
          placeholder="Enter validation value"
          value={ value }
          pattern={ /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/ }
          onChange={ handleChange }
          onValidate={ handleValidate }
          invalid={ isValid !== null && !isValid }
        />
        <div style={ { marginLeft: '10px', marginTop: '10px' } }>
          { getValidationNote() }
        </div>
      </div>
    </ThemeProvider>
  );
};

storiesOf('Input', module)
  .add('Basic', () => (
    <BasicInput />
  ))
  .add('With value', () => (
    <ThemeProvider theme={ customTheme }>
      <Input
        id="input-with-value"
        name="input-with-value"
        value="Input with value"
        placeholder="Enter value"
      />
    </ThemeProvider>
  ))
  .add('Actions', () => (
    <ThemeProvider theme={ customTheme }>
      <Input
        appearance="default"
        baseAppearance="default"
        id="input-action"
        name="input-action"
        value="Action Input"
        placeholder="Enter action value"
        onChange={ action('value changed') }
        onFocus={ action('input focused') }
      />
    </ThemeProvider>
  ))
  .add('With prefix and suffix', () => (
    <ThemeProvider theme={ customTheme }>
      <Table>
        <Row>
          <Cell>
            <Input
              appearance="default"
              baseAppearance="default"
              id="input-with-prefix"
              name="input-with-prefix"
              value="Input with prefix"
              placeholder="Enter value with prefix"
              prefix={ <SearchIcon /> }
            />
          </Cell>
        </Row>
        <Row>
          <Cell>
            <Input
              appearance="default"
              baseAppearance="default"
              id="input-with-suffix"
              name="input-with-suffix"
              value="Input with suffix"
              placeholder="Enter value with suffix"
              suffix={ <ErrorIcon /> }
            />
          </Cell>
        </Row>
        <Row>
          <Cell>
            <Input
              appearance="default"
              baseAppearance="default"
              id="input-with-prefix-suffix"
              name="input-with-prefix-suffix"
              value="Input with prefix/suffix"
              placeholder="Enter value with prefix/suffix"
              prefix={ <SearchIcon /> }
              suffix={ <ErrorIcon /> }
            />
          </Cell>
        </Row>
        <Row>
          <Cell>
            <Input
              appearance="default"
              baseAppearance="default"
              id="input-long-text-with-prefix-suffix"
              name="input-long-text-with-prefix-suffix"
              value="Input long text with prefix/suffix"
              placeholder="Enter long value with prefix/suffix"
              prefix={ <SearchIcon /> }
              suffix={ <ErrorIcon /> }
            />
          </Cell>
        </Row>
      </Table>
    </ThemeProvider>
  ))
  .add('RTL', () => (
    <ThemeProvider theme={ customTheme }>
      <Table isRTL>
        <Row>
          <Cell>
            <Input
              appearance="default"
              baseAppearance="default"
              id="input-rtl"
              name="input-rtl"
              value="RTL Input"
              placeholder="Enter RTL value"
              isRTL
            />
          </Cell>
        </Row>
        <Row>
          <Cell>
            <Input
              appearance="default"
              baseAppearance="default"
              id="input-rtl-with-prefix"
              name="input-rtl-with-prefix"
              value="Input RTL with prefix"
              placeholder="Enter RTL value with prefix"
              prefix={ <SearchIcon /> }
              isRTL
            />
          </Cell>
        </Row>
        <Row>
          <Cell>
            <Input
              appearance="default"
              baseAppearance="default"
              id="input-rtl-with-suffix"
              name="input-rtl-with-suffix"
              value="Input RTL with suffix"
              placeholder="Enter RTL value with suffix"
              suffix={ <ErrorIcon /> }
              isRTL
            />
          </Cell>
        </Row>
        <Row>
          <Cell>
            <Input
              appearance="default"
              baseAppearance="default"
              id="input-rtl-with-prefix-suffix"
              name="input-rtl-with-prefix-suffix"
              value="Input RTL with prefix/suffix"
              placeholder="Enter RTL value with prefix/suffix"
              prefix={ <SearchIcon /> }
              suffix={ <ErrorIcon /> }
              isRTL
            />
          </Cell>
        </Row>
        <Row>
          <Cell>
            <Input
              appearance="default"
              baseAppearance="default"
              id="input-rtl-long-text-with-prefix-suffix"
              name="input-rtl-long-text-with-prefix-suffix"
              value="Input RTL long text with prefix/suffix"
              placeholder="Enter RTL long value with prefix/suffix"
              prefix={ <SearchIcon /> }
              suffix={ <ErrorIcon /> }
              isRTL
            />
          </Cell>
        </Row>
      </Table>
    </ThemeProvider>
  ))
  .add('With Divided Text prefix and suffix', () => (
    <ThemeProvider theme={ customTheme }>
      <>
        <Table>
          <Row>
            <Cell>
              <Input
                appearance="withCustomPrefixSuffix"
                baseAppearance="default"
                id="input-with-divided-text-prefix"
                name="input-with-divided-text-prefix"
                value="Input with divided text prefix"
                placeholder="Enter Input with divided text prefix value"
                prefix="Prefix"
                isDivided
              />
            </Cell>
          </Row>
          <Row>
            <Cell>
              <Input
                appearance="default"
                baseAppearance="default"
                id="input-with-divided-text-suffix"
                name="input-with-divided-text-suffix"
                value="Input with divided text suffix (long text)"
                placeholder="Enter Input with divided text suffix value"
                suffix="Suffix"
                isDivided
              />
            </Cell>
          </Row>
          <Row>
            <Cell>
              <Input
                appearance="default"
                baseAppearance="default"
                id="input-with-divided-text-prefix-suffix"
                name="input-with-divided-text-prefix-suffix"
                value="Input with divided text prefix/suffix"
                placeholder="Enter Input with divided text prefix/suffix value"
                prefix="Prefix"
                suffix="Suffix"
                isDivided
              />
            </Cell>
          </Row>
        </Table>
        <Table isRTL>
          <Row>
            <Cell>
              <Input
                appearance="default"
                baseAppearance="default"
                id="input-rtl-with-divided-text-prefix"
                name="input-rtl-with-divided-text-prefix"
                value="Input RTL with divided text prefix"
                placeholder="Enter Input RTL with divided text prefix value"
                prefix="Prefix"
                isDivided
                isRTL
              />
            </Cell>
          </Row>
          <Row>
            <Cell>
              <Input
                appearance="default"
                baseAppearance="default"
                id="input-rtl-with-divided-text-suffix"
                name="input-rtl-with-divided-text-suffix"
                value="Input RTL with divided text suffix (long text)"
                placeholder="Enter Input RTL with divided text suffix value"
                suffix="Suffix"
                isDivided
                isRTL
              />
            </Cell>
          </Row>
          <Row>
            <Cell>
              <Input
                appearance="default"
                baseAppearance="default"
                id="input-rtl-with-divided-text-prefix-suffix"
                name="input-rtl-with-divided-text-prefix-suffix"
                value="Input RTL with divided text prefix/suffix"
                placeholder="Enter Input RTL with divided text prefix/suffix value"
                prefix="Prefix"
                suffix="Suffix"
                isDivided
                isRTL
              />
            </Cell>
          </Row>
        </Table>
      </>
    </ThemeProvider>
  ))
  .add('In row', () => (
    <ThemeProvider theme={ customTheme }>
      <Table>
        <Flex>
          <Cell>
            <Input
              appearance="default"
              baseAppearance="default"
              id="input-in-row"
              name="input-in-row"
              value="RTL Input in row"
              placeholder="Enter Input in row value"
            />
          </Cell>
          <Cell>
            <Input
              appearance="default"
              baseAppearance="default"
              id="input-in-row-with-prefix"
              name="input-in-row-with-prefix"
              value="Input in row with prefix"
              placeholder="Enter Input in row value with prefix"
              prefix={ <SearchIcon /> }
            />
          </Cell>
          <Cell>
            <Input
              appearance="default"
              baseAppearance="default"
              id="input-in-row-with-suffix"
              name="input-in-row-with-suffix"
              value="Input in row with suffix"
              placeholder="Enter input in row value with suffix"
              suffix={ <ErrorIcon /> }
            />
          </Cell>
          <Cell>
            <Input
              appearance="default"
              baseAppearance="default"
              id="input-in-row-with-prefix-suffix"
              name="input-in-row-with-prefix-suffix"
              value="Input in row with prefix/suffix"
              placeholder="Enter Input in row value with prefix/suffix"
              prefix={ <SearchIcon /> }
              suffix={ <ErrorIcon /> }
            />
          </Cell>
          <Cell>
            <Input
              appearance="default"
              baseAppearance="default"
              id="input-in-row-with-divided-text-prefix"
              name="input-in-row-with-divided-text-prefix"
              value="Input in row with divided text prefix"
              placeholder="Enter Input in row with divided text prefix value"
              prefix="Prefix"
              isDivided
            />
          </Cell>
          <Cell>
            <Input
              appearance="default"
              baseAppearance="default"
              id="input-in-row-with-divided-text-suffix"
              name="input-in-row-with-divided-text-suffix"
              value="Input in row with divided text suffix"
              placeholder="Enter Input in row with divided text suffix value"
              suffix="Suffix"
              isDivided
            />
          </Cell>
        </Flex>
      </Table>
    </ThemeProvider>
  ))
  .add('With validation (IP address', () => (
    <ValidationInput />
  ))
  .add('Themed', () => (
    <ThemeProvider theme={ customTheme }>
      <Table>
        {
          appearances.map((appearance) => (
            <Row>
              <Cell>
                { appearance }
              </Cell>
              <Cell>
                <Input
                  appearance={ appearance }
                  baseAppearance="default"
                  id="input-default-state"
                  name="input-default state"
                  value="Default State Input"
                  placeholder="Enter value"
                />
              </Cell>
              <Cell>
                <Input
                  appearance={ appearance }
                  baseAppearance="default"
                  id="input-disabled-state"
                  name="input-disabled state"
                  value="Disabled State Input"
                  placeholder="Enter value"
                  disabled
                />
              </Cell>
              <Cell>
                <Input
                  appearance={ appearance }
                  baseAppearance="default"
                  id="input-invalid-state"
                  name="input-invalid state"
                  value="Invalid State Input"
                  placeholder="Enter value"
                  invalid
                />
              </Cell>
            </Row>
          ))
        }
      </Table>
    </ThemeProvider>
  ));
