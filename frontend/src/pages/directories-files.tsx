import React, { useState } from 'react';
import { NotificationService as Notification } from '../components/notifications';
import { DirectoriesFilesBridge } from '../bridges/directories-files';
import { DirectoryActions } from '../enums/directory-actions';
import InputArea from '../components/input-area';
import Button from '../components/button';
import Dialog from '../components/dialog';

const DirFileView: React.FC = () => {
  const [dialogOpened, setDialogOpened] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogAction, setDialogAction] = useState<() => void>(() => {});
  const [path, setPath] = useState('');
  const [fileName, setFileName] = useState('');

  const openDialog = (message: string, action: () => void) => {
    setDialogMessage(message);
    setDialogAction(() => action);
    setDialogOpened(true);
  };

  const handleDialogClose = () => {
    setDialogOpened(false);
  };

  const handleAction = (action: DirectoryActions, successMessage: string) => {
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

  return (
    <>
      <section className="flex p-m gap-m items-end">
        <InputArea
          label="Path"
          placeholder="path/to/directory"
          onChange={(value) => setPath(value as string)}
          className="small"
        />
        <InputArea
          label="File Name"
          placeholder="path/to/file..."
          onChange={(value) => setFileName(value as string)}
          className="small"
        />
        <Button
          onClick={() => openDialog('Are you sure you want to create a directory?', () => handleAction(DirectoryActions.CREATE_DIRECTORY, 'Directory created successfully'))}
          style={{ backgroundColor: 'green' }}>
          <i className="las la-folder-plus"></i>
        </Button>
        <Button
          onClick={() => openDialog('Are you sure you want to create a file?', () => handleAction(DirectoryActions.CREATE_FILE, 'File created successfully'))}
          style={{ backgroundColor: 'blue' }}>
          <i className="las la-file-alt"></i>
        </Button>
        <Button
          onClick={() => openDialog('Are you sure you want to delete the directory?', () => handleAction(DirectoryActions.DELETE_DIRECTORY, 'Directory deleted successfully'))}
          style={{ backgroundColor: 'red' }}>
          <i className="las la-folder-minus"></i>
        </Button>
        <Button
          onClick={() => openDialog('Are you sure you want to delete the file?', () => handleAction(DirectoryActions.DELETE_FILE, 'File deleted successfully'))}
          style={{ backgroundColor: 'orange' }}>
          <i className="las la-file-excel"></i>
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
 * <h1>{@link DirFileView}</h1>
 */
export default DirFileView;
