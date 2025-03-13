// import { from, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import client from './connection-factory';
//
// export async function sayHello(value: any) {
//
// }
//
//
// const SERVICE = 'hello-world-service'; // Name from @Bridge annotation
//
// /**
//  * <h1>{@link HelloWorldBridge}</h1>
//  * @param name
//  * @constructor
//  */
// export const HelloWorldBridge = (name: string): Observable<any> => {
//   return from(
//     client.call(SERVICE, 'sayHello', { name })
//   ).pipe(map(response => response));
// }
