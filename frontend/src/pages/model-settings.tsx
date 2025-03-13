import React, { useState } from 'react';
import Button from '../components/button';
import { ModelsBridge } from '../bridges/models-bridge';
import { ModelActions } from '../enums/model-actions';
import { firstValueFrom } from 'rxjs';
import { NotificationService } from '../components/notifications';
import InputArea from '../components/input-area';

const ModelSettingsView: React.FC = () => {
  const [name, setName] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const response = await firstValueFrom(ModelsBridge(ModelActions.SETTINGS));
      NotificationService.show(response);
    } catch (error) {
      console.error('Error processing model settings:', error);
      NotificationService.show('Error processing model settings. Please try again.', 'error');
    }
  };

  return (
    <>
      <section className="flex p-m gap-m items-end">
        <InputArea
          label="Your name"
          value={name}
          onValueChanged={(e) => handleInputChange(e as any)}
        />
        <Button onClick={handleButtonClick}>
          Say hello
        </Button>
      </section>
    </>
  );
};
/**
 * <h1>{@link ModelSettingsView}</h1>
 */
export default ModelSettingsView;
