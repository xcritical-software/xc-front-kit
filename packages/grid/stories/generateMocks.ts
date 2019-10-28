import namor from 'namor';


const guid = (): string => {
  function s4(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};


const generateMockRow = (columns: any): any => {
  const row: any = {};
  columns.forEach((field: any) => {
    row[field] = namor.generate({
      words: Math.floor(Math.random() * 4 + 1),
      numbers: Math.floor(Math.random() * 10),
    });
  });
  row.id = guid();

  return row;
};
const generateMockRows = (rowsNumber: number, cellsNumber: number, columns: any): any => new Array(rowsNumber).fill('').map(() => generateMockRow(columns));

const generateChildren = (cellsNumber: number, row: any, columns: any): any => {
  if (Math.random() > 0.8) {
    row.children = generateMockRows(cellsNumber, Math.floor(Math.random() * 5 + 1), columns);
  }
};

const generateColumns = (columnsNumber: number): any => new Array(columnsNumber).fill('').map(() => namor.generate({ words: 1, numbers: 0 }));

export const generateMockData = (cellNumber: any, rowsNumber: any): any => {
  const columns = generateColumns(cellNumber);
  const rows = generateMockRows(rowsNumber, cellNumber, columns);
  rows.forEach((row: any) => {
    generateChildren(cellNumber, row, columns);
  });

  return {
    rows,
    columns,
  };
};
