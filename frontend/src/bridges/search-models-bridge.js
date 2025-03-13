import { from } from "rxjs";
import { map } from "rxjs/operators";
import client from "./connection-factory";
const SERVICE = "downloaders-service";
/**
 * <h1>{@link SearchModelsBridge}</h1>
 */
export const SearchModelsBridge = (action) => {
    return from(client.call(SERVICE, "download", { action })).pipe(map(response => response));
};
//# sourceMappingURL=search-models-bridge.js.map