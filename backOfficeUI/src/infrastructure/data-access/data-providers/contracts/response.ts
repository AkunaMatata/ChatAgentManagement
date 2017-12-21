import { Response as BaseResponse } from '@angular/http';
import { RequestPolicy } from './request-policy';

export class Response {
    private readonly requestPolicies: RequestPolicy[];
    private readonly originalResponse: BaseResponse;
    private readonly requestId: number;

    constructor(originalResponse: BaseResponse, id: number, policies: RequestPolicy[]) {
        this.requestPolicies = policies;
        this.originalResponse = originalResponse;
        this.requestId = id;
    }

    public get policies(): RequestPolicy[] {
        return this.requestPolicies;
    }

    public get original(): BaseResponse {
        return this.originalResponse;
    }

    public get id(): number {
        return this.requestId;
    }
}