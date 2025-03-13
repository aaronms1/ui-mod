import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import Button from '../components/button';
import Dialog from '../components/dialog';
import { NotificationService } from '../components/notifications';
import InputArea from '../components/input-area';
import { ModelsBridge } from '../bridges/models-bridge';
import { ModelActions } from '../enums/model-actions';
import { firstValueFrom } from 'rxjs';
const MergeModelView = () => {
    const [modelPath1, setModelPath1] = useState('');
    const [modelPath2, setModelPath2] = useState('');
    const [dialogOpened, setDialogOpened] = useState(false);
    const handleMerge = async () => {
        try {
            const response = await firstValueFrom(ModelsBridge(ModelActions.MERGE));
            NotificationService.show("Merged models: " + response);
        }
        catch (error) {
            console.error('Error merging models:', error);
            NotificationService.show('Error merging models. Please try again.', 'error');
        }
        finally {
            setDialogOpened(false);
        }
    };
    const openDialog = () => {
        setDialogOpened(true);
    };
    const closeDialog = () => {
        setDialogOpened(false);
    };
    const handleInputChange1 = (e) => {
        setModelPath1(e.target.value.toString());
    };
    const handleInputChange2 = (e) => {
        setModelPath2(e.target.value.toString());
    };
    return (_jsxs(_Fragment, { children: [_jsxs("section", { className: "flex p-m gap-m items-end", children: [_jsx(InputArea, { label: "Model Path 1", value: modelPath1, onValueChanged: handleInputChange1 }), _jsx(InputArea, { label: "Model Path 2", value: modelPath2, onValueChanged: handleInputChange2 }), _jsx(Button, { onClick: openDialog, children: "Merge Models" })] }), _jsx(Dialog, { isOpen: dialogOpened, message: '', onClose: closeDialog, onOpenedChanged: (e) => setDialogOpened(e.target.value ?? false), children: _jsxs("div", { children: [_jsx("p", { children: "Are you sure you want to merge these models?" }), _jsxs("div", { className: "flex gap-s", children: [_jsx(Button, { theme: "primary", onClick: handleMerge, children: "Yes" }), _jsx(Button, { theme: "secondary", onClick: closeDialog, children: "No" })] })] }) })] }));
};
/**
 * <h1>{@link MergeModelView}</h1>
 */
export default MergeModelView;
//# sourceMappingURL=model-merge.js.map