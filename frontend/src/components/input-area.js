import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import './InputArea.scss';
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
const InputArea = ({ type = 'text', value: initialValue = '', placeholder, className, onChange, label, readonly, style, onValueChanged }) => {
    const [value, setValue] = useState(initialValue);
    const handleChange = (event) => {
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
    return (_jsxs("div", { className: inputClassName, children: [label && _jsx("label", { className: "input-label", children: label }), _jsx("input", { type: type, value: value, placeholder: placeholder, onChange: handleChange, className: "input-field", readOnly: readonly, style: style })] }));
};
/**
 * <h1>{@link InputArea}</h1>
 */
export default InputArea;
//# sourceMappingURL=input-area.js.map