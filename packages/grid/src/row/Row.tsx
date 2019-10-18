import React, { useState, ReactElement } from 'react';
import PlusBoxOutlineIcon from 'mdi-react/PlusBoxOutlineIcon';
import MinusBoxOutlineIcon from 'mdi-react/MinusBoxOutlineIcon';
import { StyledCell, RowStyled, ToggleButton } from '../styled/styled';
import { IColumn, IRow } from '../interfaces';


export const Row: React.FC<IRow> = React.memo(({
  row,
  isSelected,
  rowId,
  onChangeActiveRow,
  columns,
  theme,
  level,
}: IRow) => {
  const [expand, changeExpand] = useState(false);

  const onToggle = (): void => changeExpand(!expand);

  const getExpandButton = (): ReactElement => (
    <ToggleButton
      onClick={ onToggle }
    >
      { expand ? <MinusBoxOutlineIcon size="20" /> : <PlusBoxOutlineIcon size="20" /> }
    </ToggleButton>
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
        { row.children && i === 0 ? getExpandButton()
          : i === 0 && <div style={ { width: '20px', height: 'auto', padding: '6px' } } /> }
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
