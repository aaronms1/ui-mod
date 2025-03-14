import axios, { AxiosInstance, Method } from "axios";
import { Observable, from } from "rxjs";
import { switchMap } from "rxjs/operators";

/**
 * Create a connection client for a dynamic service-method-action structure.
 *
 * @param config Configuration object containing the API prefix.
 * @returns An object with `call` method to interact with the backend.
 */
export function createConnectionClient(config: { prefix: string }) {
  const instance: AxiosInstance = axios.create({
    baseURL: config.prefix,
    withCredentials: true, // Support for cookies if needed
    headers: {
      "Content-Type": "application/json",
    },
  });

  /**
   * Fetch the service name from the BridgeRegistry.
   *
   * @param bridgeName The name of the bridge.
   * @returns The service name associated with the bridge.
   */
  async function fetchServiceName(bridgeName: string): Promise<string> {
    const response = await instance.get(`/bridgeRegistry/${bridgeName}`);
    return response.data.serviceName;
  }

  /**
   * Call the backend service endpoint dynamically via HTTP.
   *
   * @param bridgeName Name of the bridge (e.g., MessageBridge).
   * @param method The method on the service to invoke (e.g., processMessages).
   * @param params Object containing request data (either query params or body).
   * @param httpMethod HTTP method to use (e.g., GET, POST).
   * @returns An RxJS Observable that emits the API call's response.
   */
  function call<T = any>(
    bridgeName: string,
    method: string,
    params?: any,
    httpMethod: Method = "POST"
  ): Observable<T> {
    return from(fetchServiceName(bridgeName)).pipe(
      switchMap((serviceName: string) => {
        const url = `/${serviceName}/${method}`;

        const request = instance.request<T>({
          url,
          method: httpMethod,
          data: httpMethod === "POST" ? params : undefined,
          params: httpMethod !== "POST" ? params : undefined,
        });

        // Convert the Promise-based Axios request to an Observable
        return from(request.then((response) => response.data));
      })
    );
  }

  // Return a client object that exposes the `call` method.
  return { call };
}

/**
 * Create and export the default connection client instance.
 */
const client = createConnectionClient({ prefix: "connect" });
export default client;