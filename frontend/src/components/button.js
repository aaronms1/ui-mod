import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './Button.scss';
const Button = ({ onClick, className = '', children, icon, theme = 'primary', size = 'medium', style }) => {
    return (_jsxs("button", { className: `button ${theme} ${size} ${className}`, onClick: onClick, children: [icon && _jsx("i", { className: `la ${icon}` }), children] }));
};
export default Button;
//# sourceMappingURL=button.js.map