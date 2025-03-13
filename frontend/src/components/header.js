import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './Header.scss';
import HorizontalContainer from './horizontal-container';
/**
 * <h1>{@link Header}</h1>
 * Header component that renders a header section for the application.
 *
 * @type {React.FC<HeaderProps>}
 * @param {Object} props - The properties object for the Header component.
 * @param {string} [props.title='Header'] - The title to be displayed in the header. Defaults to "Header".
 * @param {string} [props.className] - Additional CSS classes to customize the styling of the header.
 * @param {React.ReactNode} [props.children] - Child elements or components to be rendered inside the header's content area.
 * @returns {JSX.Element} The rendered Header component.
 */
const Header = ({ title = 'Header', className, children }) => {
    const headerClassName = `header ${className || ''}`; // Combine base and custom classes
    return (_jsxs("header", { className: headerClassName, children: [_jsx("div", { className: "header-title", children: title }), _jsx(HorizontalContainer, { className: "header-content", children: children })] }));
};
export default Header;
//# sourceMappingURL=header.js.map