import React, { useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import {
  Root,
  Prefix,
  Postfix,
  ContentWrapper,
  Content,
} from './styled/Button';


const defaultProps = {
  outline: false,
  prefix: null,
  postfix: null,
  component: null,
  disabled: false,
  selected: false,
  role: 'button',
  title: null,
  height: null,
  href: null,
  appearance: 'default',
  baseAppearance: 'default',
  spacing: 'default',
  shouldFitContent: false,
  isRTL: false,
  textPosition: 'center',
  onClick: () => {},
};

const propTypes = {
  children: PropTypes.node.isRequired,
  prefix: PropTypes.node,
  postfix: PropTypes.node,
  component: PropTypes.node,
  shouldFitContent: PropTypes.bool,
  isRTL: PropTypes.bool,
  outline: PropTypes.bool,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  spacing: PropTypes.oneOf(['compact', 'default', 'none']),
  href: PropTypes.string,
  appearance: PropTypes.string,
  baseAppearance: PropTypes.string,
  height: PropTypes.string,
  role: PropTypes.string,
  title: PropTypes.string,
  textPosition: PropTypes.string,
  onClick: PropTypes.func,
};


export const PureButton = memo(({
  prefix,
  postfix,
  children,
  href,
  disabled,
  textPosition,
  isRTL,
  onClick: onClickProps,
  ...rest
}) => {
  const buttonRef = useRef();

  const onClick = () => {
    if (onClickProps && !disabled) {
      onClickProps();
    }
  };

  const getElement = () => {
    if (href) {
      return disabled ? 'span' : 'a';
    }
    return 'button';
  };

  const RootElement = Root(getElement());

  return (
    <RootElement
      isRTL={ isRTL }
      ref={ buttonRef }
      disabled={ disabled }
      onClick={ onClick }
      { ...(href ? { href } : null) }
      { ...rest }
    >

      { !!prefix && (<Prefix isRTL={ isRTL }>{ prefix }</Prefix>) }

      <ContentWrapper isRTL={ isRTL }>
        <Content textPosition={ textPosition } isRTL={ isRTL }>
          { children }
        </Content>
      </ContentWrapper>

      { !!postfix && (<Postfix isRTL={ isRTL }>{ postfix }</Postfix>) }
    </RootElement>
  );
});


PureButton.defaultProps = defaultProps;
PureButton.propTypes = propTypes;
export const Button = withTheme(PureButton);
