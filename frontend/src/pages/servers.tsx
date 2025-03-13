import React, { useState } from 'react';
import { NotificationService } from '../components/notifications';
import Button from '../components/button';
import Dialog from '../components/dialog';
import { ServersBridge } from '../bridges/servers-bridge';
import { ServerActions } from '../enums/server-actions';
import { ServerTypes } from '../enums/server-types';
import { firstValueFrom } from 'rxjs';

const ManageServersView: React.FC = () => {
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

  const handleServerAction = async (action: ServerActions) => {
    const result = await firstValueFrom(ServersBridge(ServerTypes.USOCKET, action));
    NotificationService.show(`${ServerActions[action]} server: ${result}`);
  };

  return (
    <>
      <section className="flex p-m gap-m items-end">
        <Button
          onClick={() => openDialog('Are you sure you want to start the server?', () => handleServerAction(ServerActions.START))}
          style={{ backgroundColor: 'green' }}>
          Start Server
        </Button>
        <Button
          onClick={() => openDialog('Are you sure you want to stop the server?', () => handleServerAction(ServerActions.STOP))}
          style={{ backgroundColor: 'red' }}>
          Stop Server
        </Button>
        <Button
          onClick={() => openDialog('Are you sure you want to restart the server?', () => handleServerAction(ServerActions.RESTART))}
          style={{ backgroundColor: 'blue' }}>
          Restart Server
        </Button>
      </section>
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
 * <h1>{@link ManageServersView}</h1>
 */
export default ManageServersView;
