import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import './Dialog.scss';
import Button from './button';
const Dialog = ({ isOpen, message, onClose, children, opened, onOpenedChanged }) => {
    useEffect(() => {
        if (onOpenedChanged) {
            const event = {
                target: { value: opened },
                nativeEvent: {},
                currentTarget: {},
                bubbles: false,
                cancelable: false,
                defaultPrevented: false,
                eventPhase: 0,
                isTrusted: true,
                preventDefault: () => { },
                isDefaultPrevented: () => false,
                stopPropagation: () => { },
                isPropagationStopped: () => false,
                timeStamp: Date.now(),
                type: 'change',
                persist: () => { }
            };
            onOpenedChanged(event);
        }
    }, [opened, onOpenedChanged]);
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "dialog-overlay", children: _jsx(Draggable, { children: _jsx(ResizableBox, { width: 300, height: 200, minConstraints: [150, 100], maxConstraints: [600, 400], children: _jsxs("div", { className: "dialog", children: [_jsx("p", { children: message }), children, " ", _jsx(Button, { onClick: onClose, className: "small-button", children: "Close" })] }) }) }) }));
};
/**
 * <h1>{@link Dialog}</h1>
 * dialog component.
 */
export default Dialog;
//# sourceMappingURL=dialog.js.map