import React, { ReactElement } from 'react';
import { HeaderStyled } from '../styled/styled';
import { IHeader, IHeaderPros } from '../interfaces';


export const Header: React.FC<IHeader> = React.memo((props: IHeaderPros): ReactElement => {
  const { columnName, width, theme } = props;
  return <HeaderStyled width={ width } theme={ theme.head }>{ columnName }</HeaderStyled>;
});
