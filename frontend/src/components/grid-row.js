import { jsx as _jsx } from "react/jsx-runtime";
import GridColumn from './grid-column';
const GridRow = ({ rowData }) => {
    return (_jsx("div", { className: "grid-row", style: { display: 'contents' }, children: rowData.map((column, index) => (_jsx(GridColumn, { content: column.content, spanColumns: column.spanColumns, spanRows: column.spanRows }, index))) }));
};
export default GridRow;
//# sourceMappingURL=grid-row.js.map