import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import './MessageInputBar.scss';
import InputArea from './input-area';
import Button from './button';
const MessageInputBar = ({ onSend, placeholder = 'Enter your message...', className }) => {
    const [message, setMessage] = useState(''); // State to manage the current message
    const handleInputChange = (newValue) => {
        setMessage(String(newValue)); // Convert numbers to strings
    };
    const handleSend = () => {
        if (message.trim()) {
            if (onSend) {
                onSend(message); // Trigger the `onSend` callback with the user's message
            }
            setMessage(''); // Clear the input field
        }
    };
    const barClassName = `message-input-bar ${className || ''}`;
    return (_jsxs("div", { className: barClassName, children: [_jsx(InputArea, { type: "text", value: message, placeholder: placeholder, onChange: handleInputChange, className: "message-input" }), _jsx(Button, { className: "send-button", onClick: handleSend, children: "Send" })] }));
};
export default MessageInputBar;
//# sourceMappingURL=message-input-bar.js.map