import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import client from './connection-factory';
export class ContentGalleryBridge {
    //todo: implement enums for actions, here as well as the backend
    static getGallery() {
        return from(client.call('ContentGalleryService', 'getGallery', {})).pipe(map(response => response));
    }
}
//# sourceMappingURL=content-gallery-bridge.js.map