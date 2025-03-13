import { from } from "rxjs";
import { map } from "rxjs/operators";
import client from "./connection-factory";
const SERVICE = "snapshots-service"; // Name from @Bridge annotation
/**
 * <h1>{@link SnapshotsBridge}</h1>
 */
export const SnapshotsBridge = (action) => {
    return from(client.call(SERVICE, "processSnapshots", { action })).pipe(map(response => response));
};
//# sourceMappingURL=snap-shots-bridge.js.map