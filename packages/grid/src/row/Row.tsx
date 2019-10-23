import React, { useState, ReactElement } from 'react';
import PlusBoxOutlineIcon from 'mdi-react/PlusBoxOutlineIcon';
import MinusBoxOutlineIcon from 'mdi-react/MinusBoxOutlineIcon';
import { StyledCell, RowStyled, ToggleButton } from '../styled/styled';
import { IColumn, IRow } from '../interfaces';


export const Row: React.FC<IRow> = React.memo(({
  row,
  columns,
  theme,
  level,
  handleSelectRows,
}: IRow) => {
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
    ? children.map((el) => (
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
