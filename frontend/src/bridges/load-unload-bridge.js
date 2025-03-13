import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import client from './connection-factory';
const SERVICE = "downloaders-service";
/**
 * <h1>{@link LoadUnloadBridge}</h1>
 * @param action
 * @constructor
 */
export const LoadUnloadBridge = (action) => {
    return from(client.call(SERVICE, "download", { action })).pipe(map(response => response));
};
//# sourceMappingURL=load-unload-bridge.js.map