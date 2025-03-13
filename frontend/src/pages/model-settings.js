import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import Button from '../components/button';
import { ModelsBridge } from '../bridges/models-bridge';
import { ModelActions } from '../enums/model-actions';
import { firstValueFrom } from 'rxjs';
import { NotificationService } from '../components/notifications';
import InputArea from '../components/input-area';
const ModelSettingsView = () => {
    const [name, setName] = useState('');
    const handleInputChange = (e) => {
        setName(e.target.value);
    };
    const handleButtonClick = async () => {
        try {
            const response = await firstValueFrom(ModelsBridge(ModelActions.SETTINGS));
            NotificationService.show(response);
        }
        catch (error) {
            console.error('Error processing model settings:', error);
            NotificationService.show('Error processing model settings. Please try again.', 'error');
        }
    };
    return (_jsx(_Fragment, { children: _jsxs("section", { className: "flex p-m gap-m items-end", children: [_jsx(InputArea, { label: "Your name", value: name, onValueChanged: (e) => handleInputChange(e) }), _jsx(Button, { onClick: handleButtonClick, children: "Say hello" })] }) }));
};
/**
 * <h1>{@link ModelSettingsView}</h1>
 */
export default ModelSettingsView;
//# sourceMappingURL=model-settings.js.map