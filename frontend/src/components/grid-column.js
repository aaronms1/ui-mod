import { jsx as _jsx } from "react/jsx-runtime";
const GridColumn = ({ content, spanColumns, spanRows }) => {
    return (_jsx("div", { className: "grid-column", style: {
            gridColumn: `span ${spanColumns}`,
            gridRow: `span ${spanRows}`,
            border: '1px solid #ccc', // Default border for visibility
            padding: '0.5rem',
            textAlign: 'center', // Center alignment
        }, children: content }));
};
export default GridColumn;
//# sourceMappingURL=grid-column.js.map