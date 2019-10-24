export const convertToOptions = (items) => {
  const options = [];
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

export const findOptionByValue = (value, options) => {
  if (Array.isArray(value)) {
    return value;
  }

  return options.find((option) => option.value === value) || null;
};
