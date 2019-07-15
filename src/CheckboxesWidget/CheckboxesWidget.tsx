import React from 'react';

import { Form, Checkbox } from 'antd';

import { WidgetProps } from 'react-jsonschema-form';

const selectValue = (value: any, selected: any, all: any) => {
  const at = all.indexOf(value);
  const updated = selected.slice(0, at).concat(value, selected.slice(at));

  // As inserting values at predefined index positions doesn't work with empty
  // arrays, we need to reorder the updated selection to match the initial order
  return updated.sort((a: any, b: any) => all.indexOf(a) > all.indexOf(b));
};

const deselectValue = (value: any, selected: any) => {
  return selected.filter((v: any) => v !== value);
};

const CheckboxesWidget = ({
  schema,
  label,
  id,
  disabled,
  options,
  value,
  autofocus,
  readonly,
  required,
  onChange,
  onBlur,
  onFocus,
}: WidgetProps) => {
  const { enumOptions, enumDisabled, inline } = options;

  const _onChange = (option: any) => ({
    target: { checked },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const all = enumOptions.map(({ value }: any) => value);

    if (checked) {
      onChange(selectValue(option.value, value, all));
    } else {
      onChange(deselectValue(option.value, value));
    }
  };

  const _onBlur = ({
    target: { value },
  }: React.FocusEvent<HTMLButtonElement>) => onBlur(id, value);
  const _onFocus = ({
    target: { value },
  }: React.FocusEvent<HTMLButtonElement>) => onFocus(id, value);

  return (
    <Form.Item required={required} label={label || schema.title} htmlFor={id}>
      <Checkbox.Group>
        {enumOptions.map((option: any, index: number) => {
          const checked = value.indexOf(option.value) !== -1;
          const itemDisabled =
            enumDisabled && enumDisabled.indexOf(option.value) !== -1;
          const checkbox = (
            <Checkbox
              id={`${id}_${index}`}
              checked={checked}
              disabled={disabled || itemDisabled || readonly}
              autoFocus={autofocus && index === 0}
              onChange={_onChange(option)}
              onBlur={_onBlur}
              onFocus={_onFocus}
            />
          );

          return inline ? (
            <Form.ItemLabel
              control={checkbox}
              key={index}
              label={option.label}
            />
          ) : (
            <Form.ItemLabel
              control={checkbox}
              key={index}
              label={option.label}
            />
          );
        })}
      </Checkbox.Group>
    </Form.Item>
  );
};

export default CheckboxesWidget;