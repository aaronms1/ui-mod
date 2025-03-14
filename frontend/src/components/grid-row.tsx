import React from 'react';
import GridColumn from './grid-column';
// import '../styles/components/grid-row.scss';

interface GridRowProps {
    rowData: {
        content: string;
        spanColumns: number;
        spanRows: number;
    }[];
}

const GridRow: React.FC<GridRowProps> = ({ rowData }) => {
    return (
        <div className="grid-row">
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