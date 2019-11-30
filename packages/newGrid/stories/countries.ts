export const columns = [
  { field: "list", isExpandable: true, headerName: "Список", width: 150 },
  { field: "number", headerName: "№", width: 150 },
  { field: "counry", headerName: "Страна", width: 150 },
  { field: "billion2017", headerName: "ВВП 2017 млрд $", width: 150 },
  { field: "billion2018", headerName: "ВВП 2018 млрд $", width: 150 }
];

const mvf = [
  {
    number: "1",
    counry: "США",
    billion2017: "19519",
    billion2018: "20580"
  },
  {
    number: "2",
    counry: "Китай",
    billion2017: "12062",
    billion2018: "13368"
  },
  {
    number: "3",
    counry: "Япония",
    billion2017: "4860",
    billion2018: "4972"
  },
  {
    number: "4",
    counry: "Германия",
    billion2017: "3665",
    billion2018: "3951"
  },
  {
    number: "5",
    counry: "Великобритания",
    billion2017: "2640",
    billion2018: "2829"
  },
  {
    number: "6",
    counry: "Франция",
    billion2017: "2592",
    billion2018: "2780"
  },
  {
    number: "7",
    counry: "Индия",
    billion2017: "2652",
    billion2018: "2719"
  },
  {
    number: "8",
    counry: "Италия",
    billion2017: "1951",
    billion2018: "2076"
  },
  {
    number: "9",
    counry: "Бразилия",
    billion2017: "2053",
    billion2018: "1868"
  },
  {
    number: "10",
    counry: "Республика Корея",
    billion2017: "1624",
    billion2018: "1720"
  }
];
const vb = [
  {
    number: "1",
    counry: "США",
    billion2017: "19391",
    billion2018: "20453"
  },
  {
    number: "2",
    counry: "Китай",
    billion2017: "11191",
    billion2018: "12238"
  },
  {
    number: "3",
    counry: "Япония",
    billion2017: "4949",
    billion2018: "4872"
  },
  {
    number: "4",
    counry: "Германия",
    billion2017: "3478",
    billion2018: "3677"
  },
  {
    number: "5",
    counry: "Великобритания",
    billion2017: "2651",
    billion2018: "2622"
  },
  {
    number: "6",
    counry: "Индия",
    billion2017: "2274",
    billion2018: "2601"
  },
  {
    number: "7",
    counry: "Франция",
    billion2017: "2465",
    billion2018: "2583"
  },
  {
    number: "8",
    counry: "Бразилия",
    billion2017: "1794",
    billion2018: "2056"
  },
  {
    number: "9",
    counry: "Италия",
    billion2017: "1859",
    billion2018: "1935"
  },
  {
    number: "10",
    counry: "Россия",
    billion2017: "1579",
    billion2018: "1659"
  }
];

const countries = [
  "США",
  "Китай",
  "Япония",
  "Германия",
  "Великобритания",
  "Индия",
  "Франция",
  "Бразилия",
  "Италия",
  "Россия"
];

const generRandData = () => {
  return new Array(Math.floor(Math.random() * 100)).fill(true).map((_el, i) => ({
    number: i,
    counry: countries[Math.floor(Math.random() * 10)],
    billion2017: Math.floor(Math.random() * 50000),
    billion2018: Math.floor(Math.random() * 50000)
  }));
};
const randomData = generRandData();

export const items = [
  { list: `МВФ(${mvf.length})`, children: mvf },
  { list: `ВБ(${vb.length})`, children: vb },
  { list: `Random data(${randomData.length})`, children: randomData }
];
