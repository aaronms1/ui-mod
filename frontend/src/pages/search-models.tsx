import React, { useEffect, useState } from "react";
import Button from "../components/button";
import { SearchModelsBridge } from "../bridges/search-models-bridge";
import { DownloadActions } from "../enums/download-actions";
import { NotificationService } from "../components/notifications";
import Grid from "./grid";
import { firstValueFrom } from "rxjs";

interface ModelData {
    id: string;
    modelId: string;
    likes: number;
    trendingScore: number;
    downloads: number;
    pipelineTag: string;
    libraryName: string;
    createdAt: string;
}

interface SearchModelsViewProps {
    searchQuery: string;
    onModelsFetched: (models: ModelData[]) => void;
    onLoading: (loading: boolean) => void;
}

const gridCellStyle: React.CSSProperties = {
    padding: "0.75rem",
    textAlign: "center",
};

const borderedCellStyle: React.CSSProperties = {
    ...gridCellStyle,
    gridColumn: "span 1",
    border: "1px solid #ccc",
};

const SearchModelsView: React.FC<SearchModelsViewProps> = ({
    searchQuery,
    onModelsFetched,
    onLoading,
}) => {
    const [models, setModels] = useState<ModelData[]>([]);

    const fetchAndSetModels = async () => {
        onLoading(true);
        try {
            const response = await firstValueFrom(SearchModelsBridge(DownloadActions.SEARCH));
            setModels(response);
            onModelsFetched(response);
            notify("Models fetched successfully", "success");
        } catch (error) {
            console.error("Error fetching models:", error);
            notify("Error fetching models. Please try again.", "error");
        } finally {
            onLoading(false);
        }
    };

    const notify = (message: string, type: "success" | "error" | "info") => {
        NotificationService.show(message, type);
    };

    const handleDownload = async (modelId: string) => {
        try {
            await firstValueFrom(SearchModelsBridge(DownloadActions.DOWNLOAD_LLM_MODEL));
            notify("Model downloaded successfully", "success");
        } catch (error) {
            console.error("Error downloading model:", error);
            notify("Error downloading model. Please try again.", "error");
        }
    };

    useEffect(() => {
        if (searchQuery) {
            fetchAndSetModels().then(r => r);
        }
    }, [searchQuery, onLoading, onModelsFetched]);

    const renderModelRow = (model: ModelData) => (
        <div key={model.id} style={{ display: "contents" }}>
            <div style={borderedCellStyle}>
                <Button onClick={() => handleDownload(model.id)} aria-label="Download">
                    ⬇️
                </Button>
            </div>
            <div style={gridCellStyle}>{model.id}</div>
            <div style={gridCellStyle}>{model.modelId}</div>
        </div>
    );

    return (
        <Grid columns={3} gap="1rem" className="models-grid">
            {models.map(renderModelRow) as React.ReactNode}
        </Grid>
    );
};
/**
 * <h1>{@link SearchModelsView}</h1>
 */
export default SearchModelsView;
