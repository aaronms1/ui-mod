import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import client from './connection-factory';
const SERVICE = 'models-service'; // Name from @Bridge annotation
/**
 * <h1>{@link ModelsBridge}</h1>
 * @param action
 * @constructor
 */
export const ModelsBridge = (action) => {
    return from(client.call(SERVICE, 'processModels', { action })).pipe(map(response => response));
};
//# sourceMappingURL=models-bridge.js.map