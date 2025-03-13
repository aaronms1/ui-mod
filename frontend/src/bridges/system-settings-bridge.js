import { from } from 'rxjs';
import client from "./connection-factory";
import { map } from 'rxjs/operators';
const SERVICE = "system-settings-service";
/**
 * <h1>{@link SystemSettingsBridge}</h1>
 * @param option
 * @constructor
 */
export const SystemSettingsBridge = (option) => {
    return from(client.call(SERVICE, "processSettings", { option })).pipe(map(response => response));
};
//# sourceMappingURL=system-settings-bridge.js.map