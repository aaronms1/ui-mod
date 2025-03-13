import React from 'react';
import GridColumn from './grid-column';

interface GridRowProps {
    rowData: {
        content: string;
        spanColumns: number;
        spanRows: number;
    }[]; // Array of column data for the row
}

const GridRow: React.FC<GridRowProps> = ({ rowData }) => {
    return (
        <div className="grid-row" style={{ display: 'contents' }}>
            {rowData.map((column, index) => (
                <GridColumn
                    key={index}
                    content={column.content}
                    spanColumns={column.spanColumns}
                    spanRows={column.spanRows}
                />
            ))}
        </div>
    );
};

export default GridRow;