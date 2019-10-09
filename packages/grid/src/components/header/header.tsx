import React, { ReactElement } from 'react';
import { HeaderStyled } from '../styled/styled';
import { IHeader, HeaderPros } from '../../interfaces';


export const Header: React.FC<IHeader> = React.memo((props: HeaderPros): ReactElement => {
  const { columnName, width, theme } = props;
  return <HeaderStyled width={ width } theme={ theme }>{ columnName }</HeaderStyled>;
});
