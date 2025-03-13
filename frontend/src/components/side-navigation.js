import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React, { useState, useRef } from 'react';
import './side-navigation.scss';
const SideNavigation = ({ position, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [width, setWidth] = useState(300); // Initial width
    const navRef = useRef(null);
    const isResizing = useRef(false);
    const handleMouseDown = () => {
        isResizing.current = true;
    };
    const handleMouseMove = (e) => {
        if (isResizing.current && navRef.current) {
            const newWidth = position === 'left' ? e.clientX : window.innerWidth - e.clientX;
            setWidth(newWidth);
        }
    };
    const handleMouseUp = () => {
        isResizing.current = false;
    };
    React.useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);
    return (_jsxs("div", { children: [_jsxs("button", { onClick: () => setIsOpen(!isOpen), children: ["Toggle Navigation (", position, ")"] }), _jsxs("div", { ref: navRef, style: { maxWidth: isOpen ? `${width}px` : '0' }, children: [children, _jsx("div", { className: "resize-handle", onMouseDown: handleMouseDown, style: { cursor: 'ew-resize', width: '10px', height: '100%', position: 'absolute', top: 0, [position]: 0 } })] })] }));
};
/**
 * <h1>{@link SideNavigation}</h1>
 * side nav component that excepts any child, and renders on either left or
 * right side of the screen.
 */
export default SideNavigation;
//# sourceMappingURL=side-navigation.js.map