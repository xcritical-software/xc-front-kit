export const convertToOptions = (items: Record<string, any>) => {
  const options: any[] = [];
  Object.keys(items).forEach((key) => {
    const option = {
      key: items[key].key,
      value: items[key].value || key,
      label: items[key].name,
      icon: items[key].icon,
    };

    options.push(option);
  });

  return options;
};

export const findOptionByValue = (value: any, options: any[]) => {
  if (Array.isArray(value)) {
    return value;
  }

  return options.find((option) => option.value === value) || null;
};
