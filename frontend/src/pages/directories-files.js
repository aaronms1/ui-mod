import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { NotificationService as Notification } from '../components/notifications';
import { DirectoriesFilesBridge } from '../bridges/directories-files';
import { DirectoryActions } from '../enums/directory-actions';
import InputArea from '../components/input-area';
import Button from '../components/button';
import Dialog from '../components/dialog';
const DirFileView = () => {
    const [dialogOpened, setDialogOpened] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [dialogAction, setDialogAction] = useState(() => { });
    const [path, setPath] = useState('');
    const [fileName, setFileName] = useState('');
    const openDialog = (message, action) => {
        setDialogMessage(message);
        setDialogAction(() => action);
        setDialogOpened(true);
    };
    const handleDialogClose = () => {
        setDialogOpened(false);
    };
    const handleAction = (action, successMessage) => {
        DirectoriesFilesBridge(action, path, fileName).subscribe({
            next: (response) => {
                Notification.show(successMessage + ": " + response);
                setDialogOpened(false);
            },
            error: (error) => {
                Notification.show("Error performing action: " + error);
                setDialogOpened(false);
            }
        });
    };
    return (_jsxs(_Fragment, { children: [_jsxs("section", { className: "flex p-m gap-m items-end", children: [_jsx(InputArea, { label: "Path", placeholder: "path/to/directory", onChange: (value) => setPath(value), className: "small" }), _jsx(InputArea, { label: "File Name", placeholder: "path/to/file...", onChange: (value) => setFileName(value), className: "small" }), _jsx(Button, { onClick: () => openDialog('Are you sure you want to create a directory?', () => handleAction(DirectoryActions.CREATE_DIRECTORY, 'Directory created successfully')), style: { backgroundColor: 'green' }, children: _jsx("i", { className: "las la-folder-plus" }) }), _jsx(Button, { onClick: () => openDialog('Are you sure you want to create a file?', () => handleAction(DirectoryActions.CREATE_FILE, 'File created successfully')), style: { backgroundColor: 'blue' }, children: _jsx("i", { className: "las la-file-alt" }) }), _jsx(Button, { onClick: () => openDialog('Are you sure you want to delete the directory?', () => handleAction(DirectoryActions.DELETE_DIRECTORY, 'Directory deleted successfully')), style: { backgroundColor: 'red' }, children: _jsx("i", { className: "las la-folder-minus" }) }), _jsx(Button, { onClick: () => openDialog('Are you sure you want to delete the file?', () => handleAction(DirectoryActions.DELETE_FILE, 'File deleted successfully')), style: { backgroundColor: 'orange' }, children: _jsx("i", { className: "las la-file-excel" }) })] }), _jsx(Dialog, { isOpen: dialogOpened, message: dialogMessage, onClose: handleDialogClose, onOpenedChanged: (e) => setDialogOpened(e.target.value ?? false), children: _jsxs("div", { children: [_jsx("p", { children: dialogMessage }), _jsxs("div", { className: "flex gap-s", children: [_jsx(Button, { theme: "primary", onClick: () => {
                                        dialogAction();
                                        handleDialogClose();
                                    }, children: "Yes" }), _jsx(Button, { theme: "secondary", onClick: handleDialogClose, children: "No" })] })] }) })] }));
};
/**
 * <h1>{@link DirFileView}</h1>
 */
export default DirFileView;
//# sourceMappingURL=directories-files.js.map