import { from } from "rxjs";
import { map } from "rxjs/operators";
import client from "./connection-factory";
const SERVICE = "metrics-service"; // Name from @Bridge annotation
/**
 * <h1>{@link MetricsBridge}</h1>
 */
export const MetricsBridge = (action) => {
    return from(client.call(SERVICE, "processMetrics", { action })).pipe(map(response => response));
};
//# sourceMappingURL=metrics-bridge.js.map