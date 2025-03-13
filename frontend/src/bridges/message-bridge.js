import { from } from "rxjs";
import { map } from "rxjs/operators";
import client from "./connection-factory";
const SERVICE = "messages-service";
/**
 * <h1>{@link MessageBridge}</h1>
 */
export const MessageBridge = (action) => {
    return from(client.call(SERVICE, "processMessages", { action })).pipe(map(response => response));
};
//# sourceMappingURL=message-bridge.js.map