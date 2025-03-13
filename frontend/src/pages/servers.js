import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { NotificationService } from '../components/notifications';
import Button from '../components/button';
import Dialog from '../components/dialog';
import { ServersBridge } from '../bridges/servers-bridge';
import { ServerActions } from '../enums/server-actions';
import { ServerTypes } from '../enums/server-types';
import { firstValueFrom } from 'rxjs';
const ManageServersView = () => {
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
    const handleServerAction = async (action) => {
        const result = await firstValueFrom(ServersBridge(ServerTypes.USOCKET, action));
        NotificationService.show(`${ServerActions[action]} server: ${result}`);
    };
    return (_jsxs(_Fragment, { children: [_jsxs("section", { className: "flex p-m gap-m items-end", children: [_jsx(Button, { onClick: () => openDialog('Are you sure you want to start the server?', () => handleServerAction(ServerActions.START)), style: { backgroundColor: 'green' }, children: "Start Server" }), _jsx(Button, { onClick: () => openDialog('Are you sure you want to stop the server?', () => handleServerAction(ServerActions.STOP)), style: { backgroundColor: 'red' }, children: "Stop Server" }), _jsx(Button, { onClick: () => openDialog('Are you sure you want to restart the server?', () => handleServerAction(ServerActions.RESTART)), style: { backgroundColor: 'blue' }, children: "Restart Server" })] }), _jsx(Dialog, { isOpen: dialogOpened, message: dialogMessage, onClose: handleDialogClose, onOpenedChanged: (e) => setDialogOpened(e.target.value ?? false), children: _jsxs("div", { children: [_jsx("p", { children: dialogMessage }), _jsxs("div", { className: "flex gap-s", children: [_jsx(Button, { theme: "primary", onClick: () => {
                                        dialogAction();
                                        handleDialogClose();
                                    }, children: "Yes" }), _jsx(Button, { theme: "secondary", onClick: handleDialogClose, children: "No" })] })] }) })] }));
};
/**
 * <h1>{@link ManageServersView}</h1>
 */
export default ManageServersView;
//# sourceMappingURL=servers.js.map