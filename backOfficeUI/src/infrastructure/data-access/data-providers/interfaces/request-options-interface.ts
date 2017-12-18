import { Headers, ResponseContentType } from '@angular/http';

export interface RequestOptionsInterface {
    headers?: Headers;
    withCredentials?: boolean;
    responseType?: ResponseContentType;
}
