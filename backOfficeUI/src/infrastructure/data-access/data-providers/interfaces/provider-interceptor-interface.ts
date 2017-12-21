import { Request } from '../contracts/request';
import { Response } from '../contracts/response';

export interface  ProviderInterceptorInterface {
    onRequestStart(originalRequest: Request): Request;
    onResponse(response: Promise<Response>): Promise<Response>;
}
