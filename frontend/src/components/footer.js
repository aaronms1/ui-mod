import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './FooterContainer.scss';
import HorizontalContainer from './horizontal-container';
/**
 * <h1>{@link Footer}</h1> is a React functional component used to render a footer section of an application.
 * It accepts custom children elements, a title, and additional CSS class names for styling.
 *
 * @param {FooterProps} props - The properties passed to the Footer component.
 * @param {string} [props.title='Footer'] - The title displayed in the footer. Defaults to 'Footer' if not provided.
 * @param {string} [props.className] - Additional CSS class names to apply to the footer element for customization.
 * @param {React.ReactNode} props.children - Child elements or components to render within the footer content area.
 *
 * @returns {React.ReactElement} The rendered footer section with the provided title, children, and styles.
 */
const Footer = ({ title = 'Footer', className, children }) => {
    const footerClassName = `footer ${className || ''}`; // Combine base and custom classes
    return (_jsxs("footer", { className: footerClassName, children: [_jsx("div", { className: "footer-title", children: title }), _jsx(HorizontalContainer, { className: "footer-content", children: children })] }));
};
export default Footer;
//# sourceMappingURL=footer.js.map