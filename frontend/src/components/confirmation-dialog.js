import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Dialog from './dialog';
import Button from './button';
const ConfirmationDialog = ({ isOpen, message, onConfirm, onCancel }) => {
    return (_jsxs(Dialog, { isOpen: isOpen, message: message, onClose: onCancel, children: [_jsx("button", { className: "close-button", onClick: onCancel, children: "\u00D7" }), _jsxs("div", { className: "dialog-buttons", children: [_jsx(Button, { onClick: onConfirm, className: "primary small-button", children: "Confirm" }), _jsx(Button, { onClick: onCancel, className: "secondary small-button", children: "Cancel" })] })] }));
};
/**
 * <h1>{@link ConfirmationDialog}</h1>
 */
export default ConfirmationDialog;
//# sourceMappingURL=confirmation-dialog.js.map