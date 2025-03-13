import React, { JSX } from 'react';
import './Header.scss';
import HorizontalContainer from './horizontal-container';

interface HeaderProps {
    title?: string; // Optional title displayed in the header
    className?: string; // Optional additional CSS classes
    children?: React.ReactNode; // Add `children` prop explicitly
}

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
const Header: React.FC<HeaderProps> = ({ title = 'Header', className, children }: { title?: string; className?: string; children?: React.ReactNode; }): JSX.Element => {
    const headerClassName = `header ${className || ''}`; // Combine base and custom classes

    return (
        <header className={headerClassName }>
            <div className="header-title">{title}</div>
            <HorizontalContainer className="header-content">{children}</HorizontalContainer>
        </header>
    );
};

export default Header;
