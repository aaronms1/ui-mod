import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { NotificationService as Notification } from '../components/notifications';
import { Button, Dialog, InputArea } from '../components/@index';
import { ModelsBridge } from '../bridges/models-bridge';
import { ModelActions } from '../enums/model-actions';
const CloneModelView = () => {
    const [sourcePath, setSourcePath] = useState('');
    const [dialogOpened, setDialogOpened] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [dialogAction, setDialogAction] = useState(() => { });
    const openDialog = (message, action) => {
        setDialogMessage(message);
        setDialogAction(() => action);
        setDialogOpened(true);
    };
    const handleDialogClose = () => {
        setDialogOpened(false);
    };
    const handleClone = () => {
        ModelsBridge(ModelActions.CLONE).subscribe({
            next: (response) => {
                Notification.show("Cloning successful: " + response);
                setDialogOpened(false);
            },
            error: (error) => {
                Notification.show("Error cloning model: " + error);
                setDialogOpened(false);
            }
        });
    };
    const handleInputChange = (e) => {
        setSourcePath(e.target.value);
    };
    return (_jsxs(_Fragment, { children: [_jsxs("section", { className: "flex p-m gap-m items-end", children: [_jsx(InputArea, { label: "Source Path", value: sourcePath, onValueChanged: handleInputChange }), _jsx(Button, { onClick: () => openDialog('Are you sure you want to clone this model?', handleClone), style: { backgroundColor: 'blue' }, children: "Clone Model" })] }), _jsx(Dialog, { isOpen: dialogOpened, message: dialogMessage, onClose: handleDialogClose, children: _jsxs("div", { children: [_jsx("p", { children: dialogMessage }), _jsxs("div", { className: "flex gap-s", children: [_jsx(Button, { theme: "primary", onClick: () => {
                                        dialogAction();
                                        handleDialogClose();
                                    }, children: "Yes" }), _jsx(Button, { theme: "secondary", onClick: handleDialogClose, children: "No" })] })] }) })] }));
};
export default CloneModelView;
//# sourceMappingURL=clone-model.js.map