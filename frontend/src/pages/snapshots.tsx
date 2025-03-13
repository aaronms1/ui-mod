import React, { useState } from 'react';
import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { NotificationService } from '../components/notifications';
import { SnapshotsBridge } from '../bridges/snap-shots-bridge';
import { SnapshotsActions } from '../enums/snapshots-actions';
import { from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Button from '../components/button';
import Dialog from '../components/dialog';

export const config: ViewConfig = {
  menu: { order: 14, icon: 'line-awesome/svg/camera-solid.svg' },
  title: 'Snapshots'
};

const SnapshotsView: React.FC = () => {
  const [snapshots, setSnapshots] = useState<string[]>([]);
  const [dialogOpened, setDialogOpened] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogAction, setDialogAction] = useState<() => void>(() => {});

  const openDialog = (message: string, action: () => void) => {
    setDialogMessage(message);
    setDialogAction(() => action);
    setDialogOpened(true);
  };

  const handleDialogClose = () => {
    setDialogOpened(false);
  };

  const handleSnapshotAction = (action: SnapshotsActions, successMessage: string) => {
    from(SnapshotsBridge(action))
      .pipe(
        catchError((error) => {
          NotificationService.show('Error performing snapshot action');
          throw error;
        })
      )
      .subscribe((response) => {
        NotificationService.show(successMessage);
        if (action === SnapshotsActions.LIST) {
          setSnapshots(response);
        }
      });
  };

  return (
    <>
      <section className="flex p-m gap-m items-end">
        <Button
          onClick={() => openDialog('Are you sure you want to create a snapshot?', () => handleSnapshotAction(SnapshotsActions.CREATE, 'Snapshot created successfully'))}
          style={{ backgroundColor: 'green' }}>Create Snapshot</Button>
        <Button
          onClick={() => openDialog('Are you sure you want to list snapshots?', () => handleSnapshotAction(SnapshotsActions.LIST, 'Snapshots listed successfully'))}
          style={{ backgroundColor: 'blue' }}>List Snapshots</Button>
        <Button
          onClick={() => openDialog('Are you sure you want to update the snapshot?', () => handleSnapshotAction(SnapshotsActions.COPY, 'Snapshot copied successfully'))}
          style={{ backgroundColor: 'yellow' }}>Update Snapshot</Button>
        <Button
          onClick={() => openDialog('Are you sure you want to delete the snapshot?', () => handleSnapshotAction(SnapshotsActions.DELETE, 'Snapshot deleted successfully'))}
          style={{ backgroundColor: 'red' }}>Delete Snapshot</Button>
      </section>
      <ul>
        {snapshots.map((snapshot) => (
          <li key={snapshot}>
            {snapshot}
            <Button
              onClick={() => openDialog('Are you sure you want to delete this snapshot?', () => handleSnapshotAction(SnapshotsActions.DELETE, 'Snapshot deleted successfully'))}
              style={{ backgroundColor: 'red' }}>Delete</Button>
          </li>
        ))}
      </ul>
      <Dialog
        isOpen={dialogOpened}
        message={dialogMessage}
        onClose={handleDialogClose}
        onOpenedChanged={(e) => setDialogOpened(e.target.value ?? false)}
      >
        <div>
          <p>{dialogMessage}</p>
          <div className="flex gap-s">
            <Button theme="primary" onClick={() => {
              dialogAction();
              handleDialogClose();
            }}>
              Yes
            </Button>
            <Button theme="secondary" onClick={handleDialogClose}>
              No
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

/**
 * <h1>{@link SnapshotsView}</h1>
 */
export default SnapshotsView;
