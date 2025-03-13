import { from } from "rxjs";
import { map } from "rxjs/operators";
import client from "./connection-factory";
const SERVICE = "servers-service";
/**
 * <h1>{@link ServersBridge}</h1>
 */
export const ServersBridge = (type, action) => {
    return from(client.call(SERVICE, "processServer", { type, action })).pipe(map(response => response));
};
//# sourceMappingURL=servers-bridge.js.map