import React from 'react';
import styled from 'styled-components';
import EqualIcon from 'mdi-react/EqualIcon';
import KeyboardArrowDownIcon from 'mdi-react/KeyboardArrowDownIcon';
import KeyboardArrowUpIcon from 'mdi-react/KeyboardArrowUpIcon';

import {
  ICellRenderParams,
  IColumn,
  IMappedItem, IItem,
} from '../src/interfaces';
import { Popover, popoverThemeNamespace } from '../../popover';
import { GridPositions } from '../src/consts';


const renderFunc = (
  field: any,
  fieldName: string,
  _: IMappedItem,
  rowIndex: number,
  { parentItem }: ICellRenderParams,
) => {
  console.log(fieldName, rowIndex, parentItem);

  return (
    <>
      { field.current }
      { field.diff > 0 ? <KeyboardArrowUpIcon color="green" size="16px" className="color-jungle-green" /> : null }
      { field.diff < 0 ? <KeyboardArrowDownIcon color="red" size="16px" className="color-rose-madder" /> : null }
      { !(field.diff < 0 || field.diff > 0) ? <EqualIcon size="16px" color="transparent" /> : null }
    </>
  );
};

const width = 150;
const center = true;
export const totals = {
  price: 6000,
  col1: 200,
  col2: 150,
  col3: 9578,
  col4: 999999999,
  col5: 132465,
  col6: 1,
  col7: 159753,
};

export const columns = [
  {
    center,
    width,
    headerName: 'Number row',
    field: 'row',
  },
  {
    center,
    width,
    headerName: 'Make',
    field: 'make',
  },
  {
    isExpandable: true,
    width,
    headerName: 'Model',
    field: 'model',
  },
  { width, headerName: 'Col 1', field: 'col1' },
  {
    center,
    width,
    headerName: 'Price',
    field: 'price',
  },
  {
    center,
    width,
    headerName: 'Col 2',
    field: 'col2',
  },
  { width, headerName: 'Col 3', field: 'col3' },
  {
    center,
    width,
    headerName: 'Col 4',
    field: 'col4',
  },
  { width, headerName: 'Col 5', field: 'col5' },
  {
    center,
    width,
    headerName: 'Col 6',
    field: 'col6',
  },
  { width, headerName: 'Col 7', field: 'col7' },
  {
    center,
    width,
    headerName: 'Col 8',
    field: 'col8',
  },
  { width, headerName: 'Col 9', field: 'col9' },
  {
    center,
    width,
    headerName: 'Col 10',
    field: 'col10',
  },
].map((el) => ({ ...el, visible: true }));

export const generateLorem = (n: any) => {
  const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Mauris tristique tortor quam, eget iaculis dolor facilisis vitae. Aenean et blandit sapien.
    Quisque sed placerat tortor, egestas tincidunt arcu. Quisque ac justo eu lacus imperdiet
    vestibulum quis egestas ligula. Integer orci nunc, viverra at vehicula vel, iaculis et enim.
    Cras sagittis eleifend pharetra. Integer odio leo, fermentum sed odio in, faucibus ornare nisi.
    Morbi urna enim, sollicitudin vel commodo sed, pellentesque in velit. Phasellus aliquet lectus
     eu nunc sollicitudin tempus. Aliquam a turpis eget ex imperdiet ullamcorper vitae id nisi.
     Donec rhoncus elit sit amet sodales efficitur. Nam iaculis, est et gravida congue, mauris nulla
      pulvinar sem, ac congue dui nisl vitae orci. Aliquam venenatis nunc sit amet dignissim viverra.`;
  const words = text.split(' ').slice(0, 100);

  if (n < 100) return words.slice(0, n).join(' ');

  const mult = +String(n / 100).split('.')[0];
  const remains = n % 100;
  const res: any[] = [];
  for (let i = 0; i < mult; i++) {
    res.push(text);
  }
  res.push(words.slice(0, remains).join(' '));

  return res.join(' ');
};

const popoverTheme = {
  [popoverThemeNamespace]: {
    content: {
      offset: '5px',
      background: 'red',
      padding: '5px',
      border: '1px solid #ddd',
      borderRadius: '2px',
      zIndex: 100,
    },
    arrow: {
      offset: '10px',
      size: '5px',
      background: '#fff',
      border: {
        width: '1px',
        color: '#ddd',
      },
    },
  },
};

const convertStyles = (styles) => {
  const newStyles = { ...styles };
  delete newStyles.top;
  delete newStyles.left;
  delete newStyles.transform;
  delete newStyles.willChange;

  return newStyles;
};

const PopoverContent = styled.div`
  width: 200px;
  color: black;
  overflow: auto;
  white-space: normal;
`;

const PopoverCell = ({ content }) => (
  <Popover
    position="bottom center"
    trigger="click"
    theme={ popoverTheme }
    positionFixed
    convertStyles={ convertStyles }
    content={ (
      <PopoverContent>
        { content }
      </PopoverContent>
    ) }
  >
    <div style={ { cursor: 'pointer' } }>
      col 2 popover
    </div>
  </Popover>
);


const createDublicateRows = (n: any) => {
  const res: any[] = [];
  for (let i = 0; i < n; i++) {
    res.push({
      price: Math.floor(Math.random() * 100000 + 10000),
      make: generateLorem(Math.floor(Math.random() * 10 + 1)),
      model: generateLorem(Math.floor(Math.random() * 10 + 1)),
      col1: <PopoverCell content={ generateLorem(Math.floor(Math.random() * 60 + 1)) } />,
      col2: generateLorem(Math.floor(Math.random() * 3 + 1)),
      col3: generateLorem(Math.floor(Math.random() * 5 + 1)),
      col4: generateLorem(Math.floor(Math.random() * 10 + 1)),
      col5: generateLorem(Math.floor(Math.random() * 3 + 1)),
      col6: generateLorem(Math.floor(Math.random() * 7 + 1)),
      col7: generateLorem(Math.floor(Math.random() * 2 + 1)),
      col8: generateLorem(Math.floor(Math.random() * 0 + 1)),
      col10: generateLorem(Math.floor(Math.random() * 10 + 1)),
      row: i,
    });
  }

  return res;
};

export const rows = createDublicateRows(100);

export const rowsWithChildren = [
  {
    price: Math.floor(Math.random() * 100000 + 10000),
    make: generateLorem(Math.floor(Math.random() * 20 + 1)),
    model: generateLorem(Math.floor(Math.random() * 10 + 1)),
    col1: generateLorem(Math.floor(Math.random() * 20 + 1)),
    col2: generateLorem(Math.floor(Math.random() * 3 + 1)),
    col3: generateLorem(Math.floor(Math.random() * 5 + 1)),
    col4: generateLorem(Math.floor(Math.random() * 15 + 1)),
    col5: generateLorem(Math.floor(Math.random() * 10 + 1)),
    col6: generateLorem(Math.floor(Math.random() * 15 + 1)),
    col7: generateLorem(Math.floor(Math.random() * 2 + 1)),
    col8: generateLorem(Math.floor(Math.random() * 0 + 1)),
    col10: generateLorem(Math.floor(Math.random() * 10 + 1)),
    row: 1,
    children: [
      {
        price: Math.floor(Math.random() * 100000 + 10000),
        make: generateLorem(Math.floor(Math.random() * 40 + 1)),
        model: generateLorem(Math.floor(Math.random() * 10 + 1)),
        col1: generateLorem(Math.floor(Math.random() * 20 + 1)),
        col2: generateLorem(Math.floor(Math.random() * 3 + 1)),
        col3: generateLorem(Math.floor(Math.random() * 5 + 1)),
        col4: generateLorem(Math.floor(Math.random() * 15 + 1)),
        col5: generateLorem(Math.floor(Math.random() * 10 + 1)),
        col6: generateLorem(Math.floor(Math.random() * 15 + 1)),
        col7: generateLorem(Math.floor(Math.random() * 2 + 1)),
        col8: generateLorem(Math.floor(Math.random() * 0 + 1)),
        col10: generateLorem(Math.floor(Math.random() * 10 + 1)),
        row: 1.1,
      },
      {
        price: Math.floor(Math.random() * 100000 + 10000),
        make: generateLorem(Math.floor(Math.random() * 40 + 1)),
        model: generateLorem(Math.floor(Math.random() * 10 + 1)),
        col1: generateLorem(Math.floor(Math.random() * 20 + 1)),
        col2: generateLorem(Math.floor(Math.random() * 3 + 1)),
        col3: generateLorem(Math.floor(Math.random() * 5 + 1)),
        col4: generateLorem(Math.floor(Math.random() * 15 + 1)),
        col5: generateLorem(Math.floor(Math.random() * 10 + 1)),
        col6: generateLorem(Math.floor(Math.random() * 15 + 1)),
        col7: generateLorem(Math.floor(Math.random() * 2 + 1)),
        col8: generateLorem(Math.floor(Math.random() * 0 + 1)),
        col10: generateLorem(Math.floor(Math.random() * 10 + 1)),
        row: 1.2,
      },
    ],
  },
  {
    price: Math.floor(Math.random() * 100000 + 10000),
    make: generateLorem(Math.floor(Math.random() * 40 + 1)),
    model: generateLorem(Math.floor(Math.random() * 10 + 1)),
    col1: generateLorem(Math.floor(Math.random() * 20 + 1)),
    col2: generateLorem(Math.floor(Math.random() * 3 + 1)),
    col3: generateLorem(Math.floor(Math.random() * 5 + 1)),
    col4: generateLorem(Math.floor(Math.random() * 15 + 1)),
    col5: generateLorem(Math.floor(Math.random() * 10 + 1)),
    col6: generateLorem(Math.floor(Math.random() * 15 + 1)),
    col7: generateLorem(Math.floor(Math.random() * 2 + 1)),
    col8: generateLorem(Math.floor(Math.random() * 0 + 1)),
    col10: generateLorem(Math.floor(Math.random() * 10 + 1)),
    row: 2,
  },
  {
    price: Math.floor(Math.random() * 100000 + 10000),
    make: generateLorem(Math.floor(Math.random() * 40 + 1)),
    model: generateLorem(Math.floor(Math.random() * 10 + 1)),
    col1: generateLorem(Math.floor(Math.random() * 20 + 1)),
    col2: generateLorem(Math.floor(Math.random() * 3 + 1)),
    col3: generateLorem(Math.floor(Math.random() * 5 + 1)),
    col4: generateLorem(Math.floor(Math.random() * 15 + 1)),
    col5: generateLorem(Math.floor(Math.random() * 10 + 1)),
    col6: generateLorem(Math.floor(Math.random() * 15 + 1)),
    col7: generateLorem(Math.floor(Math.random() * 2 + 1)),
    col8: generateLorem(Math.floor(Math.random() * 0 + 1)),
    col10: generateLorem(Math.floor(Math.random() * 10 + 1)),
    row: 3,
    children: [
      {
        price: Math.floor(Math.random() * 100000 + 10000),
        make: generateLorem(Math.floor(Math.random() * 40 + 1)),
        model: generateLorem(Math.floor(Math.random() * 10 + 1)),
        col1: generateLorem(Math.floor(Math.random() * 20 + 1)),
        col2: generateLorem(Math.floor(Math.random() * 3 + 1)),
        col3: generateLorem(Math.floor(Math.random() * 5 + 1)),
        col4: generateLorem(Math.floor(Math.random() * 15 + 1)),
        col5: generateLorem(Math.floor(Math.random() * 10 + 1)),
        col6: generateLorem(Math.floor(Math.random() * 15 + 1)),
        col7: generateLorem(Math.floor(Math.random() * 2 + 1)),
        col8: generateLorem(Math.floor(Math.random() * 0 + 1)),
        col10: generateLorem(Math.floor(Math.random() * 10 + 1)),
        row: 3.1,
      },
      {
        price: Math.floor(Math.random() * 100000 + 10000),
        make: generateLorem(Math.floor(Math.random() * 40 + 1)),
        model: generateLorem(Math.floor(Math.random() * 10 + 1)),
        col1: generateLorem(Math.floor(Math.random() * 20 + 1)),
        col2: generateLorem(Math.floor(Math.random() * 3 + 1)),
        col3: generateLorem(Math.floor(Math.random() * 5 + 1)),
        col4: generateLorem(Math.floor(Math.random() * 15 + 1)),
        col5: generateLorem(Math.floor(Math.random() * 10 + 1)),
        col6: generateLorem(Math.floor(Math.random() * 15 + 1)),
        col7: generateLorem(Math.floor(Math.random() * 2 + 1)),
        col8: generateLorem(Math.floor(Math.random() * 0 + 1)),
        col10: generateLorem(Math.floor(Math.random() * 10 + 1)),
        row: 3.2,
        children: [
          {
            price: Math.floor(Math.random() * 100000 + 10000),
            make: generateLorem(Math.floor(Math.random() * 40 + 1)),
            model: generateLorem(Math.floor(Math.random() * 10 + 1)),
            col1: generateLorem(Math.floor(Math.random() * 20 + 1)),
            col2: generateLorem(Math.floor(Math.random() * 3 + 1)),
            col3: generateLorem(Math.floor(Math.random() * 5 + 1)),
            col4: generateLorem(Math.floor(Math.random() * 15 + 1)),
            col5: generateLorem(Math.floor(Math.random() * 10 + 1)),
            col6: generateLorem(Math.floor(Math.random() * 15 + 1)),
            col7: generateLorem(Math.floor(Math.random() * 2 + 1)),
            col8: generateLorem(Math.floor(Math.random() * 0 + 1)),
            col10: generateLorem(Math.floor(Math.random() * 10 + 1)),
            row: '3.2.1',
          },
          {
            price: Math.floor(Math.random() * 100000 + 10000),
            make: generateLorem(Math.floor(Math.random() * 40 + 1)),
            model: generateLorem(Math.floor(Math.random() * 10 + 1)),
            col1: generateLorem(Math.floor(Math.random() * 20 + 1)),
            col2: generateLorem(Math.floor(Math.random() * 3 + 1)),
            col3: generateLorem(Math.floor(Math.random() * 5 + 1)),
            col4: generateLorem(Math.floor(Math.random() * 15 + 1)),
            col5: generateLorem(Math.floor(Math.random() * 10 + 1)),
            col6: generateLorem(Math.floor(Math.random() * 15 + 1)),
            col7: generateLorem(Math.floor(Math.random() * 2 + 1)),
            col8: generateLorem(Math.floor(Math.random() * 0 + 1)),
            col10: generateLorem(Math.floor(Math.random() * 10 + 1)),
            row: '3.2.2',
            children: [
              {
                price: Math.floor(Math.random() * 100000 + 10000),
                make: generateLorem(Math.floor(Math.random() * 40 + 1)),
                model: generateLorem(Math.floor(Math.random() * 10 + 1)),
                col1: generateLorem(Math.floor(Math.random() * 20 + 1)),
                col2: generateLorem(Math.floor(Math.random() * 3 + 1)),
                col3: generateLorem(Math.floor(Math.random() * 5 + 1)),
                col4: generateLorem(Math.floor(Math.random() * 15 + 1)),
                col5: generateLorem(Math.floor(Math.random() * 10 + 1)),
                col6: generateLorem(Math.floor(Math.random() * 15 + 1)),
                col7: generateLorem(Math.floor(Math.random() * 2 + 1)),
                col8: generateLorem(Math.floor(Math.random() * 0 + 1)),
                col10: generateLorem(Math.floor(Math.random() * 10 + 1)),
                row: '3.2.2.1',
              },
              {
                price: Math.floor(Math.random() * 100000 + 10000),
                make: generateLorem(Math.floor(Math.random() * 40 + 1)),
                model: generateLorem(Math.floor(Math.random() * 10 + 1)),
                col1: generateLorem(Math.floor(Math.random() * 20 + 1)),
                col2: generateLorem(Math.floor(Math.random() * 3 + 1)),
                col3: generateLorem(Math.floor(Math.random() * 5 + 1)),
                col4: generateLorem(Math.floor(Math.random() * 15 + 1)),
                col5: generateLorem(Math.floor(Math.random() * 10 + 1)),
                col6: generateLorem(Math.floor(Math.random() * 15 + 1)),
                col7: generateLorem(Math.floor(Math.random() * 2 + 1)),
                col8: generateLorem(Math.floor(Math.random() * 0 + 1)),
                col10: generateLorem(Math.floor(Math.random() * 10 + 1)),
                row: '3.2.2.2',
                children: [
                  {
                    price: Math.floor(Math.random() * 100000 + 10000),
                    make: generateLorem(Math.floor(Math.random() * 40 + 1)),
                    model: generateLorem(Math.floor(Math.random() * 10 + 1)),
                    col1: generateLorem(Math.floor(Math.random() * 20 + 1)),
                    col2: generateLorem(Math.floor(Math.random() * 3 + 1)),
                    col3: generateLorem(Math.floor(Math.random() * 5 + 1)),
                    col4: generateLorem(Math.floor(Math.random() * 15 + 1)),
                    col5: generateLorem(Math.floor(Math.random() * 10 + 1)),
                    col6: generateLorem(Math.floor(Math.random() * 15 + 1)),
                    col7: generateLorem(Math.floor(Math.random() * 2 + 1)),
                    col8: generateLorem(Math.floor(Math.random() * 0 + 1)),
                    col10: generateLorem(Math.floor(Math.random() * 10 + 1)),
                    row: '3.2.2.2.1',
                  },
                  {
                    price: Math.floor(Math.random() * 100000 + 10000),
                    make: generateLorem(Math.floor(Math.random() * 40 + 1)),
                    model: generateLorem(Math.floor(Math.random() * 10 + 1)),
                    col1: generateLorem(Math.floor(Math.random() * 20 + 1)),
                    col2: generateLorem(Math.floor(Math.random() * 3 + 1)),
                    col3: generateLorem(Math.floor(Math.random() * 5 + 1)),
                    col4: generateLorem(Math.floor(Math.random() * 15 + 1)),
                    col5: generateLorem(Math.floor(Math.random() * 10 + 1)),
                    col6: generateLorem(Math.floor(Math.random() * 15 + 1)),
                    col7: generateLorem(Math.floor(Math.random() * 2 + 1)),
                    col8: generateLorem(Math.floor(Math.random() * 0 + 1)),
                    col10: generateLorem(Math.floor(Math.random() * 10 + 1)),
                    row: '3.2.2.2.2',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    price: Math.floor(Math.random() * 100000 + 10000),
    make: generateLorem(Math.floor(Math.random() * 40 + 1)),
    model: generateLorem(Math.floor(Math.random() * 10 + 1)),
    col1: generateLorem(Math.floor(Math.random() * 20 + 1)),
    col2: generateLorem(Math.floor(Math.random() * 3 + 1)),
    col3: generateLorem(Math.floor(Math.random() * 5 + 1)),
    col4: generateLorem(Math.floor(Math.random() * 15 + 1)),
    col5: generateLorem(Math.floor(Math.random() * 10 + 1)),
    col6: generateLorem(Math.floor(Math.random() * 15 + 1)),
    col7: generateLorem(Math.floor(Math.random() * 2 + 1)),
    col8: generateLorem(Math.floor(Math.random() * 0 + 1)),
    col10: generateLorem(Math.floor(Math.random() * 10 + 1)),
    row: 4,
  },
  {
    price: Math.floor(Math.random() * 100000 + 10000),
    make: generateLorem(Math.floor(Math.random() * 40 + 1)),
    model: generateLorem(Math.floor(Math.random() * 10 + 1)),
    col1: generateLorem(Math.floor(Math.random() * 20 + 1)),
    col2: generateLorem(Math.floor(Math.random() * 3 + 1)),
    col3: generateLorem(Math.floor(Math.random() * 5 + 1)),
    col4: generateLorem(Math.floor(Math.random() * 15 + 1)),
    col5: generateLorem(Math.floor(Math.random() * 10 + 1)),
    col6: generateLorem(Math.floor(Math.random() * 15 + 1)),
    col7: generateLorem(Math.floor(Math.random() * 2 + 1)),
    col8: generateLorem(Math.floor(Math.random() * 0 + 1)),
    col10: generateLorem(Math.floor(Math.random() * 10 + 1)),
    row: 5,
  },
];

export const addNewRow = (oldRows: IItem[]): IItem[] => {
  const lastRowNumber: number = oldRows[oldRows.length - 1].row;

  return [
    ...oldRows,
    {
      price: Math.floor(Math.random() * 100000 + 10000),
      make: generateLorem(Math.floor(Math.random() * 40 + 1)),
      model: generateLorem(Math.floor(Math.random() * 10 + 1)),
      col1: generateLorem(Math.floor(Math.random() * 20 + 1)),
      col2: generateLorem(Math.floor(Math.random() * 3 + 1)),
      col3: generateLorem(Math.floor(Math.random() * 5 + 1)),
      col4: generateLorem(Math.floor(Math.random() * 15 + 1)),
      col5: generateLorem(Math.floor(Math.random() * 10 + 1)),
      col6: generateLorem(Math.floor(Math.random() * 15 + 1)),
      col7: generateLorem(Math.floor(Math.random() * 2 + 1)),
      col8: generateLorem(Math.floor(Math.random() * 0 + 1)),
      col10: generateLorem(Math.floor(Math.random() * 10 + 1)),
      row: lastRowNumber + 1,
    },
  ];
};


export const columnsWithRender: IColumn[] = [
  {
    field: 'zero', headerName: 'zero'.toUpperCase(), width: 300, visible: true, isExpandable: true, center: false,
  },
  {
    render: renderFunc, field: 'one', headerName: 'one'.toUpperCase(), width: 100, visible: true, center: true,
  },
  {
    render: renderFunc, field: 'two', headerName: 'two'.toUpperCase(), width: 100, visible: true, center: true,
  },
  {
    render: renderFunc, field: 'three', headerName: 'three'.toUpperCase(), width: 100, visible: true, center: true,
  },
  {
    render: renderFunc, field: 'four', headerName: 'four'.toUpperCase(), width: 100, visible: true, center: true,
  },
  {
    render: renderFunc, field: 'five', headerName: 'five'.toUpperCase(), width: 100, visible: true, center: true,
  },
  {
    render: renderFunc, field: 'six', headerName: 'six'.toUpperCase(), width: 100, visible: true, center: true,
  },
  {
    render: renderFunc, field: 'saven', headerName: 'saven'.toUpperCase(), width: 100, visible: true, center: true,
  },
  {
    render: renderFunc, field: 'eight', headerName: 'eight'.toUpperCase(), width: 100, visible: true, center: true,
  },
  {
    render: renderFunc, field: 'nine', headerName: 'nine'.toUpperCase(), width: 100, visible: true, center: true,
  },
  {
    render: renderFunc, field: 'ten', headerName: 'ten'.toUpperCase(), width: 100, visible: true, center: true,
  },
];


const createObject = () => ({
  current: Math.floor(Math.random() * 100),
  diff: Math.random() - 0.5,
});
const createItem = (x) => ({
  zero: 'Not render',
  one: createObject(),
  two: createObject(),
  three: createObject(),
  four: createObject(),
  five: createObject(),
  six: createObject(),
  saven: createObject(),
  eight: createObject(),
  nine: createObject(),
  ten: createObject(),
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  children: Math.random() > 0.8 && !!x ? createRowsWithRender(x) : null,
});


export function createRowsWithRender (x = 3) {
  x -= 1;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Array(Math.floor(Math.random() * 5 + 5)).fill(true).map((_el) => createItem(x));
}


const items = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'siz',
  'saven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fiveteen',
];

const getWidth = (i) => {
  if (i >= 2 && i <= 5) return 100;

  return 200;
};

export const columnsFixed = (fixeds) => items
  .map((el, i) => {
    const column: IColumn = {
      headerName: el,
      field: el,
      width: getWidth(i),
      visible: true,
      center: i !== 2,
      isExpandable: i === 2,
    };

    /* eslint-disable no-mixed-operators */
    if ((fixeds === 'both' || fixeds === 'left') && i === 2) column.fixedPosition = GridPositions.LEFT;

    if ((fixeds === 'both' || fixeds === 'right') && i === 5) column.fixedPosition = GridPositions.RIGHT;
    /* eslint-enable no-mixed-operators */

    return column;
  });


export const totalsFixed = items
  .reduce((acc, el) => ({ ...acc, [el]: Math.floor(Math.random() * 100 + 50) }), {});

export const rowsFixed = new Array(1000).fill(true)
  .map((_el, i) => items.reduce((acc, el) => ({ ...acc, [el]: `${el} ${i}` }), {
    children: i === 3 || i === 10 || i === 40
      ? new Array(5).fill(true)
        .map((_$el, $i) => items.reduce((acc, el) => ({ ...acc, [el]: `${el} ${$i}` }), {}))
      : null,
  }));

const getRand = () => Math.floor(Math.random() * 255);

const getRandColor = () => `
  rgba(
    ${getRand()},
    ${getRand()},
    ${getRand()},
    0.5
  )
`;

const CustomReactHeaderNameStyled = styled.div`
  background-color: ${({ color }) => color};
`;

export const CustomReactHeaderName = ({ text }) => (
  <CustomReactHeaderNameStyled color={ getRandColor() }>
    { text }
  </CustomReactHeaderNameStyled>
);
