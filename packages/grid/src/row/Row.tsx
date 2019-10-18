import React, { useState, ReactElement } from 'react';
import { StyledCell, RowStyled } from '../styled/styled';
import { IColumn, IRow } from '../interfaces';


export const Row: React.FC<IRow> = React.memo((props: IRow) => {
  const {
    row,
    isSelected,
    rowId,
    onChangeActiveRow,
    columns,
    theme,
    level,
  } = props;
  const [expand, changeExpand] = useState(false);

  const onToggle = (): void => changeExpand(!expand);
  const getExpandButton = (): ReactElement => (
    <button
      onClick={ onToggle }
    >
      { expand ? '+' : '-' }
    </button>
  );
  const getGridRow = (): ReactElement[] => columns.map((column: IColumn, i) => {
    const { render, field, width } = column;
    const cellContent = render ? render(row) : row[field];
    return (
      <StyledCell
        key={ field }
        theme={ theme.cell }
        width={ width }
      >
        { props.row.children ? getExpandButton() : null }
        { level > 0 && i === 0 ? (
          <div style={ {
            width: `${(level) * 40}px`, height: '1px', backgroundColor: 'rgba(0,0,0,0)', float: 'left',
          } }
          />
        ) : null }
        { cellContent }
      </StyledCell>
    );
  });
  const renderChildren = (children: any): ReactElement => (Array.isArray(children)
    ? children.map((el, index) => (
      <Row
        row={ el }
        isSelected={ false }
        rowId={ index }
        onChangeActiveRow={ () => {} }
        columns={ columns }
        theme={ theme }
        level={ level + 1 }
      />
    )) : children);


  return (
    <>
      <RowStyled
        isSelected={ isSelected }
        theme={ theme }
        onClick={ (): undefined => onChangeActiveRow(rowId) }
      >
        { getGridRow() }
      </RowStyled>
      { expand && renderChildren(row.children) }
    </>
  );
});
