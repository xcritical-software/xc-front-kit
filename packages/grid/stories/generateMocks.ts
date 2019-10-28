import namor from 'namor';
import { IRow } from '../.publish/interfaces.d';
import { IColumn } from '../src/interfaces';


const guid = (): string => {
  function s4(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

const generateMockRow = (columns: string[]): IRow => {
  const row: any = {};
  columns.forEach((field: string) => {
    row[field] = namor.generate({
      words: Math.floor(Math.random() * 4 + 1),
      numbers: Math.floor(Math.random() * 10),
    });
  });
  row.id = guid();

  return row;
};
const generateMockRows = (rowsNumber: number, columns: string[]): IRow[] => new Array(rowsNumber).fill('').map(() => generateMockRow(columns));

const generateChildren = (row: any, columns: string[]): void => {
  if (Math.random() > 0.8) {
    row.children = generateMockRows(Math.floor(Math.random() * 5 + 1), columns);
  }
};

const generateColumnsData = (columnsNumber: number): string[] => new Array(columnsNumber).fill('').map(() => namor
  .generate({ words: 1, numbers: 0 }));

const generateMockColumns = (mockColumns:
string[]): IColumn[] => mockColumns
  .map((el: string, i: number) => (
    {
      title: el.toUpperCase(),
      order: i,
      field: el,
      isExpandable: i === 0,
      render: /* Math.random() > 0.3 ? */ null/* : returnOne */,
      width: 200,
    }
  ));

export const generateMockData = (cellNumber: number,
  rowsNumber: number): { rows: IRow[]; columns: IColumn[] } => {
  const columnsData = generateColumnsData(cellNumber);
  const rows = generateMockRows(rowsNumber, columnsData);
  rows.forEach((row: IRow) => {
    generateChildren(row, columnsData);
  });

  const columns = generateMockColumns(columnsData);

  return {
    rows,
    columns,
  };
};
