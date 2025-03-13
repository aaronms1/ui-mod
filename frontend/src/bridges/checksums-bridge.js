import { from } from "rxjs";
import { map } from "rxjs/operators";
import client from "./connection-factory";
const SERVICE = "checksums-service";
/**
 * <h1>{@link ChecksumsBridge}</h1>
 */
export const ChecksumsBridge = (action, filePath) => {
    return from(client.call(SERVICE, "calculateChecksum", { action, filePath })).pipe(map(response => response));
};
//# sourceMappingURL=checksums-bridge.js.map