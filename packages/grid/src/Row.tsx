/* eslint-disable no-nested-ternary */
import React, {
  useState, ReactElement, useCallback, useMemo,
} from 'react';
import PlusBoxOutlineIcon from 'mdi-react/PlusBoxOutlineIcon';
import MinusBoxOutlineIcon from 'mdi-react/MinusBoxOutlineIcon';
import {
  StyledCell, RowStyled, ToggleButton, RowShift, TableDataStyled,
} from './styled';
import {
  IColumn, IRow, IRowData,
} from './interfaces';


const getGridRow = ({
  columns,
  row,
  theme, level, getExpandButton,
}: any): ReactElement[] => columns.map(({
  render, field, width, isExpandable,
}: IColumn) => {
  const cellContent = render ? render(row) : row[field];
  const { buttonShift, nexLevelLineShift } = theme;

  return (
    <StyledCell
      key={ `${row.id}${field}` }
      theme={ theme.cell }
      width={ width }
    >
      {
        isExpandable
          ? (row.children ? getExpandButton : <RowShift width={ buttonShift } />)
          : null
      }
      { level > 0 && isExpandable ? (
        <RowShift
          width={ `${level * nexLevelLineShift}px` }
        />
      ) : null }
      <TableDataStyled title={ cellContent } theme={ theme.tableData }>
        { cellContent }
      </TableDataStyled>
    </StyledCell>
  );
});

export const Row: React.FC<IRow> = React.memo<IRow>(({
  row,
  columns,
  theme,
  level,
  handleSelectRows,
}) => {
  const { rowSwitchButtonSize } = theme;
  const [expand, changeExpand] = useState(false);
  const [isSelected, setSelected] = useState(false);

  const handleRowClick = (): void => {
    setSelected(!isSelected);
    handleSelectRows(row);
  };

  const onToggle = useCallback((): void => changeExpand(!expand), [expand]);

  const getExpandButton = useMemo((): ReactElement => (
    <ToggleButton
      onClick={ onToggle }
    >
      { expand ? (
        <MinusBoxOutlineIcon
          size={ rowSwitchButtonSize }
        />
      ) : <PlusBoxOutlineIcon size={ rowSwitchButtonSize } /> }
    </ToggleButton>
  ), [expand, onToggle, rowSwitchButtonSize]);

  const renderChildren = useCallback((children: any): ReactElement => (Array.isArray(children)
    ? children.map((el: IRowData) => (
      <Row
        row={ el }
        columns={ columns }
        theme={ theme }
        key={ `${el.id}` }
        level={ level + 1 }
        handleSelectRows={ handleSelectRows }
      />
    )) : children), [columns, handleSelectRows, level, theme]);

  const renderChildrenMemo = useMemo<ReactElement>(() => (renderChildren(row.children)),
    [renderChildren, row.children]);

  const gridRowMemo = useMemo(() => getGridRow({
    columns,
    row,
    theme,
    level,
    getExpandButton,
  }), [columns, getExpandButton, level, row, theme]);

  return (
    <>
      <RowStyled
        isSelected={ isSelected }
        theme={ theme }
        tabIndex={ 0 }
        onClick={ handleRowClick }
      >
        { gridRowMemo }
      </RowStyled>
      { expand && renderChildrenMemo }
    </>
  );
});
