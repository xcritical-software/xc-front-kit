export const convertToOptions = (items: Record<string, any>) => Object.entries(items).map(([key, {
  key: keyProp,
  value,
  name,
  ...otherProp
}]) => {
  const option = {
    key: keyProp || key,
    value: value || key,
    label: name,
    ...otherProp,
  };

  return option;
});

export const findOptionByValue = (value: any, options: any[]) => {
  if (Array.isArray(value)) {
    return value;
  }

  return options.find((option) => option.value === value) || null;
};
