export const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}${s4()
    + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

export const addOrDeleteItemFromArray = (array: any, item: any) => {
  if (array.some((el: any) => el === item)) return array.filter((el: any) => el !== item);
  return [...array, item];
};
