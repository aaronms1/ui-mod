import React, { useState } from 'react';
import Button from '../components/button';
import Dialog from '../components/dialog';
import { NotificationService } from '../components/notifications';
import InputArea, { TextFieldValueChangedEvent } from '../components/input-area';
import { ModelsBridge } from '../bridges/models-bridge';
import { ModelActions } from '../enums/model-actions';
import { firstValueFrom } from 'rxjs';

const MergeModelView: React.FC = () => {
  const [modelPath1, setModelPath1] = useState<string>('');
  const [modelPath2, setModelPath2] = useState<string>('');
  const [dialogOpened, setDialogOpened] = useState(false);

  const handleMerge = async () => {
    try {
      const response = await firstValueFrom(ModelsBridge(ModelActions.MERGE));
      NotificationService.show("Merged models: " + response);
    } catch (error) {
      console.error('Error merging models:', error);
      NotificationService.show('Error merging models. Please try again.', 'error');
    } finally {
      setDialogOpened(false);
    }
  };

  const openDialog = () => {
    setDialogOpened(true);
  };

  const closeDialog = () => {
    setDialogOpened(false);
  };

  const handleInputChange1 = (e: TextFieldValueChangedEvent) => {
    setModelPath1(e.target.value.toString());
  };

  const handleInputChange2 = (e: TextFieldValueChangedEvent) => {
    setModelPath2(e.target.value.toString());
  };

  return (
    <>
      <section className="flex p-m gap-m items-end">
        <InputArea
          label="Model Path 1"
          value={modelPath1}
          onValueChanged={handleInputChange1}
        />
        <InputArea
          label="Model Path 2"
          value={modelPath2}
          onValueChanged={handleInputChange2}
        />
        <Button onClick={openDialog}>
          Merge Models
        </Button>
      </section>
      <Dialog
        isOpen={dialogOpened}
        message={''}
        onClose={closeDialog}
        onOpenedChanged={(e) => setDialogOpened(e.target.value ?? false)}
      >
        <div>
          <p>Are you sure you want to merge these models?</p>
          <div className="flex gap-s">
            <Button theme="primary" onClick={handleMerge}>
              Yes
            </Button>
            <Button theme="secondary" onClick={closeDialog}>
              No
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

/**
 * <h1>{@link MergeModelView}</h1>
 */
export default MergeModelView;
