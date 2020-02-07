import React, {
  FC, useState, useCallback, useEffect,
} from 'react';
import { withTheme } from 'styled-components';

import { Checkbox } from './Checkbox';
import { ISwitchGroupProps, IOption } from './interfaces';
import { SwitchGroupWrapper } from './styled';


export const PureSwitchGroup: FC<ISwitchGroupProps> = ({
  type = 'checkbox',
  appearance = 'default',
  baseAppearance = 'default',
  values: propValues,
  options,
  disabled = false,
  withAllSwitcher = false,
  allLabel,
  onChange,
}) => {
  const [values, setValues] = useState(propValues);
  const [isAll, setIsAll] = useState(false);

  const handleChange = useCallback((value: string | number) => {
    if (type === 'radio') {
      setValues([value]);
    } else if (values.includes(value)) {
      setValues(values.filter((v: string) => v !== value));
    } else {
      setValues([...values, value]);
    }
  }, [type, values]);

  const handleAllChange = useCallback((checked: boolean) => {
    if (checked) {
      setValues(options.map((option: IOption) => option.value));
    } else {
      setValues([]);
    }

    setIsAll(checked);
  }, [options]);

  useEffect(() => {
    onChange(values);
  }, [onChange, values]);

  return (
    <SwitchGroupWrapper appearance={ appearance } baseAppearance={ baseAppearance }>
      {
        type === 'checkbox' && withAllSwitcher && (
          <Checkbox
            appearance={ appearance }
            baseAppearance={ baseAppearance }
            label={ allLabel }
            checked={ isAll }
            disabled={ disabled }
            onChange={ handleAllChange }
          />
        )
      }
      {
        options.map(({ value, label }) => (
          <Checkbox
            appearance={ appearance }
            baseAppearance={ baseAppearance }
            type={ type }
            label={ label }
            checked={ values.includes(value) }
            disabled={ disabled }
            onChange={ () => handleChange(value) }
          />
        ))
      }
    </SwitchGroupWrapper>
  );
};

export const SwitchGroup = React.memo(withTheme(PureSwitchGroup));
