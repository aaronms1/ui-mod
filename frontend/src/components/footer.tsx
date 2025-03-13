import React from 'react';
import './FooterContainer.scss';
import HorizontalContainer from './horizontal-container';

interface FooterProps {
    title?: string; // Optional title displayed in the footer
    className?: string; // Optional additional CSS classes
    children?: React.ReactNode; // Add `children` prop explicitly
}
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
const Footer: React.FC<FooterProps> = ({ title = 'Footer', className, children }: FooterProps): React.ReactElement => {
    const footerClassName = `footer ${className || ''}`; // Combine base and custom classes

    return (
        <footer className={footerClassName}>
            <div className="footer-title">{title}</div>
            <HorizontalContainer className="footer-content">{children}</HorizontalContainer>
        </footer>
    );
};

export default Footer;