import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import Button from "../components/button";
import { SearchModelsBridge } from "../bridges/search-models-bridge";
import { DownloadActions } from "../enums/download-actions";
import { NotificationService } from "../components/notifications";
import Grid from "./grid";
import { firstValueFrom } from "rxjs";
const gridCellStyle = {
    padding: "0.75rem",
    textAlign: "center",
};
const borderedCellStyle = {
    ...gridCellStyle,
    gridColumn: "span 1",
    border: "1px solid #ccc",
};
const SearchModelsView = ({ searchQuery, onModelsFetched, onLoading, }) => {
    const [models, setModels] = useState([]);
    const fetchAndSetModels = async () => {
        onLoading(true);
        try {
            const response = await firstValueFrom(SearchModelsBridge(DownloadActions.SEARCH));
            setModels(response);
            onModelsFetched(response);
            notify("Models fetched successfully", "success");
        }
        catch (error) {
            console.error("Error fetching models:", error);
            notify("Error fetching models. Please try again.", "error");
        }
        finally {
            onLoading(false);
        }
    };
    const notify = (message, type) => {
        NotificationService.show(message, type);
    };
    const handleDownload = async (modelId) => {
        try {
            await firstValueFrom(SearchModelsBridge(DownloadActions.DOWNLOAD_LLM_MODEL));
            notify("Model downloaded successfully", "success");
        }
        catch (error) {
            console.error("Error downloading model:", error);
            notify("Error downloading model. Please try again.", "error");
        }
    };
    useEffect(() => {
        if (searchQuery) {
            fetchAndSetModels().then(r => r);
        }
    }, [searchQuery, onLoading, onModelsFetched]);
    const renderModelRow = (model) => (_jsxs("div", { style: { display: "contents" }, children: [_jsx("div", { style: borderedCellStyle, children: _jsx(Button, { onClick: () => handleDownload(model.id), "aria-label": "Download", children: "\u2B07\uFE0F" }) }), _jsx("div", { style: gridCellStyle, children: model.id }), _jsx("div", { style: gridCellStyle, children: model.modelId })] }, model.id));
    return (_jsx(Grid, { columns: 3, gap: "1rem", className: "models-grid", children: models.map(renderModelRow) }));
};
/**
 * <h1>{@link SearchModelsView}</h1>
 */
export default SearchModelsView;
//# sourceMappingURL=search-models.js.map