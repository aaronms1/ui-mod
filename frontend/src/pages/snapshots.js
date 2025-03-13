import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { NotificationService } from '../components/notifications';
import { SnapshotsBridge } from '../bridges/snap-shots-bridge';
import { SnapshotsActions } from '../enums/snapshots-actions';
import { from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Button from '../components/button';
import Dialog from '../components/dialog';
export const config = {
    menu: { order: 14, icon: 'line-awesome/svg/camera-solid.svg' },
    title: 'Snapshots'
};
const SnapshotsView = () => {
    const [snapshots, setSnapshots] = useState([]);
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
    const handleSnapshotAction = (action, successMessage) => {
        from(SnapshotsBridge(action))
            .pipe(catchError((error) => {
            NotificationService.show('Error performing snapshot action');
            throw error;
        }))
            .subscribe((response) => {
            NotificationService.show(successMessage);
            if (action === SnapshotsActions.LIST) {
                setSnapshots(response);
            }
        });
    };
    return (_jsxs(_Fragment, { children: [_jsxs("section", { className: "flex p-m gap-m items-end", children: [_jsx(Button, { onClick: () => openDialog('Are you sure you want to create a snapshot?', () => handleSnapshotAction(SnapshotsActions.CREATE, 'Snapshot created successfully')), style: { backgroundColor: 'green' }, children: "Create Snapshot" }), _jsx(Button, { onClick: () => openDialog('Are you sure you want to list snapshots?', () => handleSnapshotAction(SnapshotsActions.LIST, 'Snapshots listed successfully')), style: { backgroundColor: 'blue' }, children: "List Snapshots" }), _jsx(Button, { onClick: () => openDialog('Are you sure you want to update the snapshot?', () => handleSnapshotAction(SnapshotsActions.COPY, 'Snapshot copied successfully')), style: { backgroundColor: 'yellow' }, children: "Update Snapshot" }), _jsx(Button, { onClick: () => openDialog('Are you sure you want to delete the snapshot?', () => handleSnapshotAction(SnapshotsActions.DELETE, 'Snapshot deleted successfully')), style: { backgroundColor: 'red' }, children: "Delete Snapshot" })] }), _jsx("ul", { children: snapshots.map((snapshot) => (_jsxs("li", { children: [snapshot, _jsx(Button, { onClick: () => openDialog('Are you sure you want to delete this snapshot?', () => handleSnapshotAction(SnapshotsActions.DELETE, 'Snapshot deleted successfully')), style: { backgroundColor: 'red' }, children: "Delete" })] }, snapshot))) }), _jsx(Dialog, { isOpen: dialogOpened, message: dialogMessage, onClose: handleDialogClose, onOpenedChanged: (e) => setDialogOpened(e.target.value ?? false), children: _jsxs("div", { children: [_jsx("p", { children: dialogMessage }), _jsxs("div", { className: "flex gap-s", children: [_jsx(Button, { theme: "primary", onClick: () => {
                                        dialogAction();
                                        handleDialogClose();
                                    }, children: "Yes" }), _jsx(Button, { theme: "secondary", onClick: handleDialogClose, children: "No" })] })] }) })] }));
};
/**
 * <h1>{@link SnapshotsView}</h1>
 */
export default SnapshotsView;
//# sourceMappingURL=snapshots.js.map