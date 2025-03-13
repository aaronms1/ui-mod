import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
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
const SystemSettingsView = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const handleOptionChange = (selected) => {
        setSelectedOption(selected ? selected.value : null);
    };
    const handleButtonClick = () => {
        if (selectedOption === null) {
            NotificationService.show('Please select an option');
            return;
        }
        from(SystemSettingsBridge.arguments.processSettings(selectedOption))
            .pipe(catchError((error) => {
            NotificationService.show('Error processing settings');
            throw error;
        }))
            .subscribe((serverResponse) => {
            return NotificationService.show(serverResponse);
        });
    };
    const options = Object.values(SystemSettingsOptions).map(option => ({
        label: option.toString(),
        value: option
    }));
    return (_jsx(_Fragment, { children: _jsxs("section", { className: "flex p-m gap-m items-end", children: [_jsx(Select, { options: options, onChange: handleOptionChange }), _jsx(Button, { onClick: handleButtonClick, children: "Process Settings" })] }) }));
};
export default SystemSettingsView;
//# sourceMappingURL=system-settings.js.map