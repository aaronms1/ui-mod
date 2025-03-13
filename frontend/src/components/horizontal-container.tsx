import React from 'react';
import './HorizontalContainer.scss';

interface HorizontalContainerProps {
    className?: string;
    children?: React.ReactNode;
}

const HorizontalContainer: React.FC<HorizontalContainerProps> = ({ className, children }) => {
    return (
        <div className={`horizontal-container ${className || ''}`}>
            {children}
        </div>
    );
};

export default HorizontalContainer;