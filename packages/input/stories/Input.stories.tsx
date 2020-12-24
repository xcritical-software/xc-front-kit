/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { action } from '@storybook/addon-actions';

import { withKnobs, boolean } from '@storybook/addon-knobs';

import Input, { inputThemeNamespace, inputThemeStyle } from '@xcritical/input';

import { customTheme } from './customThemes';
import { SearchIcon, ErrorIcon } from './Icons';


const theme = {
  [inputThemeNamespace]: {
    ...inputThemeStyle,
  },
};

const gradient = `repeating-linear-gradient(
  to right,
  #51cadb 0 43px,
  transparent 1ch 53px)
  bottom/100% 3px content-box no-repeat`;

  const codeTheme = {
  [inputThemeNamespace]: {
    height: '48px',
    borderRadius: 3,
    padding: '0px',
    width: '310px',
    border: 'none',
    background: gradient,
    input: {
      fontSize: '34px',
      width: '310px',
      padding: '0 0 0 14px',
      letterSpacing: '33.5px',
      background: 'rgba(0,0,0,0)',
    },

    active: {
      background: gradient,
      input: {
        background: 'rgba(0,0,0,0)',
      },
    },
    disabled: {
      background: gradient,
      input: {
        background: 'rgba(0,0,0,0)',
      },
    },
  }
}

const appearances = [
  'default',
  'dark',
];

const Table = (props: any) => (
  <div style={{ display: 'table', minWidth: '280px', float: props.isRTL ? 'right' : 'left' }} {...props} />
);

const Row = (props: any) => (
  <div style={{ display: 'table-row' }} {...props} />
);

const Cell = (props: any) => (
  <div style={{ display: 'table-cell', padding: 4 }} {...props} />
);

const Flex = (props: any) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} {...props} />
);

const BasicInput = () => {
  const [value, setValue] = React.useState('');

  const handleChange = (v: string): void => {
    setValue(v);
    action('Value Changed');
  };

  return (
    <ThemeProvider theme={theme}>
      <Input
        disabled={boolean('Disabled', false)}
        invalid={boolean('Invalid', false)}
        id="input-basic"
        name="input-basic"
        placeholder="Enter basic value"
        value={value}
        onChange={handleChange}
        onFocus={() => action('onFocused')}
      />
    </ThemeProvider>
  );
};

const ValidationInput = () => {
  const [value, setValue] = React.useState('');
  const [isValid, setIsValid] = React.useState<null | boolean>(null);

  const handleChange = (v: string): void => {
    setValue(v);

    if (v.length === 0) {
      setIsValid(null);
    }
  };

  const handleValidate = (v: boolean): void => {
    setIsValid(v);
  };

  const getValidationNote = () => {
    if (isValid === null) return null;

    return !isValid ? 'IP is not valid' : 'IP is valid';
  };

  return (
    <div>
      <Input
        id="input-validation"
        name="input-validation"
        placeholder="Enter validation value"
        value={value}
        pattern="^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
        onChange={handleChange}
        onValidate={handleValidate}
        invalid={isValid !== null && !isValid}
      />
      <div style={{ marginLeft: '10px', marginTop: '10px' }}>
        {getValidationNote()}
      </div>
    </div>
  );
};

storiesOf('Input', module)
  .addDecorator(withKnobs)
  .add('Basic', () => (
    <BasicInput />
  ))
  .add('With value', () => (
    <Input
      id="input-with-value"
      name="input-with-value"
      value="Input with value"
      placeholder="Enter value"
    />
  ))
  .add('With prefix and suffix', () => (
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
            prefix={<SearchIcon />}
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
            postfix={<ErrorIcon />}
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
            prefix={<SearchIcon />}
            postfix={<ErrorIcon />}
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
            prefix={<ErrorIcon />}
            postfix={<ErrorIcon />}
          />
        </Cell>
      </Row>
    </Table>
  ))
  .add('RTL', () => (
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
            prefix={<SearchIcon />}
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
            postfix={<ErrorIcon />}
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
            prefix={<SearchIcon />}
            postfix={<ErrorIcon />}
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
            prefix={<SearchIcon />}
            postfix={<ErrorIcon />}
            isRTL
          />
        </Cell>
      </Row>
    </Table>
  ))
  .add('With Divided Text prefix and suffix', () => (
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
              postfix="Suffix"
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
              postfix="Suffix"
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
              postfix="Suffix"
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
              postfix="Suffix"
              isDivided
              isRTL
            />
          </Cell>
        </Row>
      </Table>
    </>
  ))
  .add('In row', () => (
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
            prefix={<SearchIcon />}
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
            postfix={<ErrorIcon />}
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
            prefix={<SearchIcon />}
            postfix={<ErrorIcon />}
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
            postfix="Suffix"
            isDivided
          />
        </Cell>
      </Flex>
    </Table>
  ))
  .add('With validation (IP address', () => (
    <ValidationInput />
  ))
  .add('Themed', () => (
    <ThemeProvider theme={customTheme}>
      <Table>
        {
          appearances.map((appearance) => (
            <Row>
              <Cell>
                {appearance}
              </Cell>
              <Cell>
                <Input
                  appearance={appearance}
                  baseAppearance="default"
                  id="input-default-state"
                  name="input-default state"
                  value="Default State Input"
                  placeholder="Enter value"
                />
              </Cell>
              <Cell>
                <Input
                  appearance={appearance}
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
                  appearance={appearance}
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
  ))
  .add('With Forwarding ref', () => {
    const inputRef = React.useRef<HTMLInputElement>();

    const handleFocus = () => {
      inputRef.current.focus();
    };
    const handleBlur = () => {
      inputRef.current.blur();
    };

    return (
      <>
        <button onClick={handleFocus}>Focus</button>
        <button onClick={handleBlur}>Blur</button>
        <br />
        <Input
          id="input-with-value"
          name="input-with-value"
          value="Input with value"
          placeholder="Enter value"
          ref={inputRef}
        />
      </>
    );
  })
  .add('Code input', () => {


    return (
      <ThemeProvider theme={codeTheme} >
        <Input
          value="123456"
          disabled
        />
      </ThemeProvider>
    );
  })
