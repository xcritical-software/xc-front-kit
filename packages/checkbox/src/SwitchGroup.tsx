import React, { useState, useCallback, useEffect } from 'react';
import { withTheme } from 'styled-components';

import { Checkbox } from './Checkbox';
import { ISwitchGroupProps } from './interfaces';
import { SwitchGroupWrapper } from './styled';

export const PureSwitchGroup: React.FC<ISwitchGroupProps> = ({
  type = 'checkbox',
  appearance = 'default',
  baseAppearance = 'default',
  values: propValues,
  options,
  disabled = false,
  onChange,
  checkIcon,
}) => {
  const [values, setValues] = useState(propValues);

  const handleChange = useCallback(
    (value: string | number) => {
      let newValues;

      if (type === 'radio') {
        newValues = [value];
      } else if (values.includes(value)) {
        newValues = values.filter((v: string) => v !== value);
      } else {
        newValues = [...values, value];
      }

      setValues(newValues);
      onChange(newValues);
    },
    [onChange, type, values]
  );

  useEffect(() => {
    setValues(propValues);
  }, [propValues]);

  return (
    <SwitchGroupWrapper appearance={appearance} baseAppearance={baseAppearance}>
      {options.map(({ value, label }) => (
        <Checkbox
          checkIcon={checkIcon}
          appearance={appearance}
          baseAppearance={baseAppearance}
          type={type}
          label={label}
          checked={values.includes(value)}
          disabled={disabled}
          onChange={() => handleChange(value)}
        />
      ))}
    </SwitchGroupWrapper>
  );
};

export const SwitchGroup = React.memo(withTheme(PureSwitchGroup));
