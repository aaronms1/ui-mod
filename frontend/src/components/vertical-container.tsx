import React from 'react';
import './VerticalContainer.scss';

interface VerticalContainerProps {
    className?: string;
    children?: React.ReactNode;
}

const VerticalContainer: React.FC<VerticalContainerProps> = ({ className, children }) => {
    return (
        <div className={`vertical-container ${className || ''}`}>
            {children}
        </div>
    );
};

export default VerticalContainer;