import React from 'react';

interface GridColumnProps {
    content: string;
    spanColumns: number;
    spanRows: number;
}

const GridColumn: React.FC<GridColumnProps> = ({ content, spanColumns, spanRows }) => {
    return (
        <div
            className="grid-column"
            style={{
                gridColumn: `span ${spanColumns}`,
                gridRow: `span ${spanRows}`,
                border: '1px solid #ccc', // Default border for visibility
                padding: '0.5rem',
                textAlign: 'center', // Center alignment
            }}
        >
            {content}
        </div>
    );
};

export default GridColumn;