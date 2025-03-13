import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import Button from '../components/button';
import Dialog from '../components/dialog';
import { NotificationService } from '../components/notifications';
import InputArea from '../components/input-area';
import { ModelsBridge } from '../bridges/models-bridge';
import { ModelActions } from '../enums/model-actions';
import { firstValueFrom } from 'rxjs';
const DestroyModelView = () => {
    const [modelPath, setModelPath] = useState('');
    const [dialogOpened, setDialogOpened] = useState(false);
    const handleDelete = async () => {
        try {
            const response = await firstValueFrom(ModelsBridge(ModelActions.DESTROY));
            NotificationService.show("Model destroyed: " + response);
        }
        catch (error) {
            console.error('Error destroying model:', error);
            NotificationService.show('Error destroying model. Please try again.', 'error');
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
    const handleInputChange = (e) => {
        setModelPath(e.target.value.toString());
    };
    return (_jsxs(_Fragment, { children: [_jsxs("section", { className: "flex p-m gap-m items-end", children: [_jsx(InputArea, { label: "Model Path", value: modelPath, onValueChanged: handleInputChange }), _jsx(Button, { onClick: openDialog, children: "Delete Model" })] }), _jsx(Dialog, { opened: dialogOpened, onOpenedChanged: (e) => setDialogOpened(e.target.value ?? false), isOpen: false, message: '', onClose: closeDialog, children: _jsxs("div", { children: [_jsx("p", { children: "Are you sure you want to delete this model? Any work associated with this model will be deleted as well!" }), _jsxs("div", { className: "flex gap-s", children: [_jsx(Button, { theme: "primary", onClick: handleDelete, children: "Yes" }), _jsx(Button, { theme: "secondary", onClick: closeDialog, children: "No" })] })] }) })] }));
};
/**
 * <h1>{@link DestroyModelView}</h1>
 */
export default DestroyModelView;
//# sourceMappingURL=model-destroy.js.map