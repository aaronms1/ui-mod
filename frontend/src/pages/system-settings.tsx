import React, { useState } from 'react';
import { SystemSettingsBridge } from '../bridges/system-settings-bridge';
import { SystemSettingsOptions } from '../enums/system-settings-options';
import { from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Button from '../components/button';
import { NotificationService } from '../components/notifications';
import Select from 'react-select';

/**
 * <h1>{@link SystemSettingsView}</h1>
 * @constructor
 */
const SystemSettingsView: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<SystemSettingsOptions | null>(null);

  const handleOptionChange = (selected: any) => {
    setSelectedOption(selected ? selected.value : null);
  };

  const handleButtonClick = () => {
    if (selectedOption === null) {
      NotificationService.show('Please select an option');
      return;
    }

    from(SystemSettingsBridge.arguments.processSettings(selectedOption))
      .pipe(
        catchError((error) => {
          NotificationService.show('Error processing settings');
          throw error;
        })
      )
      .subscribe((serverResponse) => {
        return NotificationService.show((serverResponse as string));
      });
  };

  const options = Object.values(SystemSettingsOptions).map(option => ({
    label: option.toString(),
    value: option
  }));

  return (
    <>
      <section className="flex p-m gap-m items-end">
        <Select
          options={options}
          onChange={handleOptionChange}
        />
        <Button onClick={handleButtonClick}>
          Process Settings
        </Button>
      </section>
    </>
  );
};

export default SystemSettingsView;
