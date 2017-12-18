import { Request as BaseRequest } from '@angular/http';
import { RequestArgs } from '@angular/http/src/interfaces';
import { RequestPolicy } from './request-policy';

export class Request extends BaseRequest {
    private readonly requestPolicies: RequestPolicy[];
    private readonly requestId: number;

    constructor(requestOptions: RequestArgs, id: number, policies: RequestPolicy[]) {
        super(requestOptions);
        this.requestPolicies = policies;
        this.requestId = id;
    }

    public get policies(): RequestPolicy[] {
        return this.requestPolicies;
    }

    public get id(): number {
        return this.requestId;
    }
}