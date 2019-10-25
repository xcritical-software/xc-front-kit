/* eslint-disable no-nested-ternary */
import React, { useState, ReactElement } from 'react';
import PlusBoxOutlineIcon from 'mdi-react/PlusBoxOutlineIcon';
import MinusBoxOutlineIcon from 'mdi-react/MinusBoxOutlineIcon';
import {
  StyledCell, RowStyled, ToggleButton, RowShift,
} from '../styled/styled';
import { IColumn, IRow, IRowData } from '../interfaces';


export const Row: React.FC<IRow> = React.memo(({
  row,
  columns,
  theme,
  level,
  handleSelectRows,
}: IRow) => {
  const { buttonShift, nexLevelLineSift = 0, rowSwitchButtonSize } = theme;
  const [expand, changeExpand] = useState(false);
  const [isSelected, setSelected] = useState(false);
  const handleRowClick = (): void => {
    setSelected(!isSelected);
    handleSelectRows(row);
  };

  const onToggle = (): void => changeExpand(!expand);
  const getExpandButton = (): ReactElement => (
    <ToggleButton
      onClick={ onToggle }
    >
      { expand ? (
        <MinusBoxOutlineIcon
          size={ rowSwitchButtonSize }
        />
      ) : <PlusBoxOutlineIcon size={ rowSwitchButtonSize } /> }
    </ToggleButton>
  );

  const getGridRow = (): ReactElement[] => columns.map(({
    render, field, width, isExpandable,
  }: IColumn) => {
    const cellContent = render ? render(row) : row[field];
    return (
      <StyledCell
        key={ field }
        theme={ theme.cell }
        width={ width }
      >
        {
          isExpandable
            ? (row.children ? getExpandButton() : <RowShift width={ buttonShift } />)
            : null
        }
        { level > 0 && isExpandable ? (
          <RowShift
            width={ `${level * nexLevelLineSift}px` }
          />
        ) : null }
        { cellContent }
      </StyledCell>
    );
  });
  const renderChildren = (children: any): ReactElement => (Array.isArray(children)
    ? children.map((el: IRowData) => (
      <Row
        row={ el }
        columns={ columns }
        theme={ theme }
        key={ el.id }
        level={ level + 1 }
        handleSelectRows={ handleSelectRows }
      />
    )) : children);

  return (
    <>
      <RowStyled
        isSelected={ isSelected }
        theme={ theme }
        tabIndex={ 0 }
        onClick={ handleRowClick }
      >
        { getGridRow() }
      </RowStyled>
      { expand && renderChildren(row.children) }
    </>
  );
});
