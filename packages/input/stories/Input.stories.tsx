/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { action } from '@storybook/addon-actions';

import { withKnobs, boolean } from '@storybook/addon-knobs';

import Input from '@xcritical/input';

import { customTheme1, additionalTheme } from './customThemes';
import { SearchIcon, ErrorIcon } from './Icons';


const CustomIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,10.84 21.79,9.69 21.39,8.61L19.79,10.21C19.93,10.8 20,11.4 20,12C20,16.42 16.42,20 12,20C7.58,20 4,16.42 4,12C4,7.58 7.58,4 12,4C12.6,4 13.2,4.07 13.79,4.21L15.4,2.6C14.31,2.21 13.16,2 12,2M19,2L15,6V7.5L12.45,10.05C12.3,10 12.15,10 12,10C10.9,10 10,10.9 10,12C10,13.1 10.9,14 12,14C13.1,14 14,13.1 14,12C14,11.85 14,11.7 13.95,11.55L16.5,9H18L22,5H19V2M12,6C8.69,6 6,8.69 6,12C6,15.31 8.69,18 12,18C15.31,18 18,15.31 18,12H16C16,14.21 14.21,16 12,16C9.79,16 8,14.21 8,12C8,9.79 9.79,8 12,8V6Z" />
  </svg>
);


const Table = (props: any) => (
  <div style={ { display: 'table', minWidth: '280px', float: props.isRTL ? 'right' : 'left' } } { ...props } />
);

const Row = (props: any) => (
  <div style={ { display: 'table-row' } } { ...props } />
);

const Cell = (props: any) => (
  <div style={ { display: 'table-cell', padding: 4 } } { ...props } />
);

const Flex = (props: any) => (
  <div style={ { display: 'flex', alignItems: 'center', justifyContent: 'center' } } { ...props } />
);

const BasicInput = () => {
  const [value, setValue] = useState('');

  const handleChange = (v: string): void => {
    setValue(v);
    action('Value Changed');
  };

  return (
    <Input
      disabled={ boolean('Disabled', false) }
      invalid={ boolean('Invalid', false) }
      isClearable={ boolean('isClearable', false) }
      id="input-basic"
      name="input-basic"
      placeholder="Enter basic value"
      value={ value }
      onChange={ handleChange }
      onFocus={ () => action('onFocused') }
    />
  );
};

const ValidationInput = () => {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState<null | boolean>(null);

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
        disabled={ boolean('Disabled', false) }
        isClearable={ boolean('isClearable', false) }
        isRTL={ boolean('isRTL', false) }
        id="input-validation"
        name="input-validation"
        placeholder="Enter validation value"
        value={ value }
        pattern="^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
        onChange={ handleChange }
        onValidate={ handleValidate }
        invalid={ isValid !== null && !isValid }
      />
      <div style={ { marginLeft: '10px', marginTop: '10px' } }>
        { getValidationNote() }
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
      disabled={ boolean('Disabled', false) }
      invalid={ boolean('Invalid', false) }
      id="input-with-value"
      name="input-with-value"
      value="Input with value"
      placeholder="Enter value"
    />
  ))
  .add('Number type', () => (
    <Table>
      <Row>
        <Cell>Standard number type</Cell>
        <Cell>
          <Input
            id="standard-number-type"
            name="standard-number-type"
            placeholder="Enter value or use spin"
            type="number"
            showArrows
          />
        </Cell>
      </Row>
      <Row>
        <Cell>Number type without spin</Cell>
        <Cell>
          <Input
            id="number-type"
            name="number-type"
            placeholder="Enter value"
            type="number"
          />
        </Cell>
      </Row>
    </Table>
  ))
  .add('With prefix and suffix', () => {
    const [prefixValue, setPrefixValue] = useState('Input with prefix');
    const [suffixValue, setSuffixValue] = useState('Input with suffix');
    const [prefixSuffixValue, setPrefixSuffixValue] = useState('Input with prefix/suffix');
    const [longValue, setLongValue] = useState('Input long text with prefix/suffix');

    return (
      <Table>
        <Row>
          <Cell>Prefix</Cell>
          <Cell>
            <Input
              disabled={ boolean('Disabled', false) }
              invalid={ boolean('Invalid', false) }
              isClearable={ boolean('isClearable', false) }
              isRTL={ boolean('isRTL', false) }
              appearance="default"
              baseAppearance="default"
              id="input-with-prefix"
              name="input-with-prefix"
              value={ prefixValue }
              onChange={ setPrefixValue }
              placeholder="Enter value with prefix"
              prefix={ <SearchIcon /> }
            />
          </Cell>
        </Row>
        <Row>
          <Cell>Suffix</Cell>
          <Cell>
            <Input
              disabled={ boolean('Disabled', false) }
              invalid={ boolean('Invalid', false) }
              isClearable={ boolean('isClearable', false) }
              isRTL={ boolean('isRTL', false) }
              appearance="default"
              baseAppearance="default"
              id="input-with-suffix"
              name="input-with-suffix"
              value={ suffixValue }
              onChange={ setSuffixValue }
              placeholder="Enter value with suffix"
              postfix={ <ErrorIcon /> }
            />
          </Cell>
        </Row>
        <Row>
          <Cell>Prefix + Suffix</Cell>
          <Cell>
            <Input
              disabled={ boolean('Disabled', false) }
              invalid={ boolean('Invalid', false) }
              isClearable={ boolean('isClearable', false) }
              isRTL={ boolean('isRTL', false) }
              appearance="default"
              baseAppearance="default"
              id="input-with-prefix-suffix"
              name="input-with-prefix-suffix"
              value={ prefixSuffixValue }
              onChange={ setPrefixSuffixValue }
              placeholder="Enter value with prefix/suffix"
              prefix={ <SearchIcon /> }
              postfix={ <ErrorIcon /> }
            />
          </Cell>
        </Row>
        <Row>
          <Cell>Long Value Prefix + Suffix</Cell>
          <Cell>
            <Input
              disabled={ boolean('Disabled', false) }
              invalid={ boolean('Invalid', false) }
              isClearable={ boolean('isClearable', false) }
              isRTL={ boolean('isRTL', false) }
              appearance="default"
              baseAppearance="default"
              id="input-long-text-with-prefix-suffix"
              name="input-long-text-with-prefix-suffix"
              value={ longValue }
              onChange={ setLongValue }
              placeholder="Enter long value with prefix/suffix"
              prefix={ <ErrorIcon /> }
              postfix={ <ErrorIcon /> }
            />
          </Cell>
        </Row>
      </Table>
    );
  })
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
            postfix={ <ErrorIcon /> }
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
            postfix={ <ErrorIcon /> }
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
            postfix={ <ErrorIcon /> }
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
            disabled={ boolean('Disabled', false) }
            invalid={ boolean('Invalid', false) }
            isClearable={ boolean('isClearable', false) }
            isRTL={ boolean('isRTL', false) }
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
            disabled={ boolean('Disabled', false) }
            invalid={ boolean('Invalid', false) }
            isClearable={ boolean('isClearable', false) }
            isRTL={ boolean('isRTL', false) }
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
            postfix={ <ErrorIcon /> }
            disabled={ boolean('Disabled', false) }
            invalid={ boolean('Invalid', false) }
            isClearable={ boolean('isClearable', false) }
            isRTL={ boolean('isRTL', false) }
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
            postfix={ <ErrorIcon /> }
            disabled={ boolean('Disabled', false) }
            invalid={ boolean('Invalid', false) }
            isClearable={ boolean('isClearable', false) }
            isRTL={ boolean('isRTL', false) }
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
            disabled={ boolean('Disabled', false) }
            invalid={ boolean('Invalid', false) }
            isClearable={ boolean('isClearable', false) }
            isRTL={ boolean('isRTL', false) }
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
            disabled={ boolean('Disabled', false) }
            invalid={ boolean('Invalid', false) }
            isClearable={ boolean('isClearable', false) }
            isRTL={ boolean('isRTL', false) }
          />
        </Cell>
      </Flex>
    </Table>
  ))
  .add('With validation (IP address', () => (
    <ValidationInput />
  ))
  .add('Themed', () => {
    const [value, setValue] = useState('Default State Input');

    return (
      <ThemeProvider theme={ customTheme1 }>
        <Table>
          <Row>
            <Cell>
              Default theme
            </Cell>
            <Cell>
              <Cell>
                <Input
                  disabled={ boolean('Disabled', false) }
                  invalid={ boolean('Invalid', false) }
                  isClearable={ boolean('isClearable', false) }
                  isRTL={ boolean('isRTL', false) }
                  baseAppearance="default"
                  id="input-default-state"
                  name="input-default state"
                  value={ value }
                  onChange={ setValue }
                  placeholder="Enter value"
                />
              </Cell>
            </Cell>
          </Row>
          <Row>
            <Cell>
              Custom theme
            </Cell>
            <Cell>
              <Cell>
                <Input
                  disabled={ boolean('Disabled', false) }
                  invalid={ boolean('Invalid', false) }
                  isClearable={ boolean('isClearable', false) }
                  isRTL={ boolean('isRTL', false) }
                  appearance="custom"
                  baseAppearance="default"
                  id="input-custom-theme"
                  name="input-default state"
                  value={ value }
                  onChange={ setValue }
                  placeholder="Enter value"
                />
              </Cell>
            </Cell>
          </Row>
          <Row>
            <Cell>
              Custom theme + Icon
            </Cell>
            <Cell>
              <Cell>
                <Input
                  disabled={ boolean('Disabled', false) }
                  invalid={ boolean('Invalid', false) }
                  isClearable
                  clearIcon={ CustomIcon }
                  isRTL={ boolean('isRTL', false) }
                  appearance="custom"
                  baseAppearance="default"
                  id="input-custom-theme-icon"
                  name="input-default state"
                  value={ value }
                  onChange={ setValue }
                  placeholder="Enter value"
                />
              </Cell>
            </Cell>
          </Row>
        </Table>
      </ThemeProvider>
    );
  })
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
        <button onClick={ handleFocus }>Focus</button>
        <button onClick={ handleBlur }>Blur</button>
        <br />
        <Input
          id="input-with-value"
          name="input-with-value"
          value="Input with value"
          placeholder="Enter value"
          ref={ inputRef }
        />
      </>
    );
  })
  .add('Additional Theme', () => {
    const [value, setValue] = useState('');

    return (
      <ThemeProvider theme={ additionalTheme }>
        <Table>
          <Row>
            <Cell>
              Basic
            </Cell>
            <Cell>
              <Input
                disabled={ boolean('Disabled', false) }
                invalid={ boolean('Invalid', false) }
                isRTL={ boolean('isRTL', false) }
                placeholder="Enter value"
                value={ value }
                onChange={ setValue }
                isClearable
                appearance="custom"
              />
            </Cell>
          </Row>
          <Row>
            <Cell>
              Filled
            </Cell>
            <Cell>
              <Input
                disabled={ boolean('Disabled', false) }
                invalid={ boolean('Invalid', false) }
                isRTL={ boolean('isRTL', false) }
                placeholder="Enter value"
                value="Lorem impsum"
                isClearable
                appearance="custom"
              />
            </Cell>
          </Row>
          <Row>
            <Cell>
              Invalid
            </Cell>
            <Cell>
              <Input
                disabled={ boolean('Disabled', false) }
                isRTL={ boolean('isRTL', false) }
                placeholder="Enter value"
                value={ value }
                onChange={ setValue }
                isClearable
                appearance="custom"
                invalid
              />
            </Cell>
          </Row>
          <Row>
            <Cell>
              Disabled
            </Cell>
            <Cell>
              <Input
                disabled
                invalid={ boolean('Invalid', false) }
                isRTL={ boolean('isRTL', false) }
                placeholder="Enter value"
                value={ value }
                onChange={ setValue }
                isClearable
                appearance="custom"
              />
            </Cell>
          </Row>
        </Table>
      </ThemeProvider>
    );
  });
