import React, { useState, ChangeEvent } from 'react';
import './InputArea.scss';

export interface TextFieldValueChangedEvent {
  target: { value: string | number };
}

interface InputAreaProps {
  type?: 'text' | 'number' | 'password' | 'email',
  value?: string | number,
  placeholder?: string,
  className?: string,
  onChange?: (value: string | number) => void,
  label?: string,
  readonly?: boolean,
  style?: { width: string },
  onValueChanged?: (e: TextFieldValueChangedEvent) => void
}

/**
 * <h1>{@link InputArea}</h1>
 * @param type the type of input field, defaults to 'text'
 * @param initialValue the initial value of the input field
 * @param placeholder the placeholder text
 * @param className the class name
 * @param onChange the change event handler
 * @param label the label text
 * @param readonly whether the input field is readonly
 * @param style the style object
 * @param onValueChanged the value changed event handler
 * @constructor constructs the InputArea component
 */
const InputArea: React.FC<InputAreaProps> = ({
  type = 'text',
  value: initialValue = '',
  placeholder,
  className,
  onChange,
  label,
  readonly,
  style,
  onValueChanged
}) => {
  const [value, setValue] = useState<string | number>(initialValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);

    // Call parent's `onChange` callback if provided
    if (onChange) {
      onChange(newValue);
    }

    // Trigger onValueChanged event if provided
    if (onValueChanged) {
      onValueChanged({ target: { value: newValue } });
    }
  };

  const inputClassName = `input-area ${className || ''}`;

  return (
    <div className={inputClassName}>
      {label && <label className="input-label">{label}</label>}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        className="input-field"
        readOnly={readonly}
        style={style}
      />
    </div>
  );
};

/**
 * <h1>{@link InputArea}</h1>
 */
export default InputArea;
