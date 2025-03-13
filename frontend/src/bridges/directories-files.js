import { from } from "rxjs";
import { map } from "rxjs/operators";
import client from "./connection-factory";
const SERVICE = "dir-file-service";
/**
 * <h1>{@link DirectoriesFilesBridge}</h1>
 */
export const DirectoriesFilesBridge = (action, path, fileName) => {
    return from(client.call(SERVICE, "processDirFile", { action, path, fileName })).pipe(map(response => response));
};
//# sourceMappingURL=directories-files.js.map