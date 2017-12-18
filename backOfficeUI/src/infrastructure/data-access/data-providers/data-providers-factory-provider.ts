import { Http, RequestOptions } from '@angular/http';
import { DataProviderConfigInterface } from './interfaces/data-provider-config-interface';
import { DataProvidersFactory } from './data-providers-factory';
import { Injectable } from '@angular/core';
import { ProviderInterceptorInterface } from './interfaces/provider-interceptor-interface';
import { SchemaInterface } from './schema/url-schema';
import { RequestPolicy } from './contracts/request-policy';
import { SequentialService } from './sequential-service';

@Injectable()
/**
 * Provider factory provider.
 * The responsibility of this class is configure of provider factory which is used to create all provider.
 * This configuration will be applied for all providers and all requests.
 */
export class DataProvidersFactoryProvider {
    private configuration: DataProviderConfigInterface;
    private schemaConfig: SchemaInterface;
    private requestPolicies: RequestPolicy[];
    private readonly interceptors: ProviderInterceptorInterface[];

    private readonly http: Http;
    private readonly defaultRequestOption: RequestOptions;
    private readonly sequential: SequentialService;

    constructor(
        http: Http,
        defaultRequestOption: RequestOptions,
        sequential: SequentialService) {
        this.http = http;
        this.defaultRequestOption = defaultRequestOption;
        this.interceptors = [];
        this.sequential = sequential;
    }

    public configure(configuration: DataProviderConfigInterface): void {
        this.configuration = configuration;
    }

    public configurePolicies(requestPolicies: RequestPolicy[]): void {
        this.requestPolicies = requestPolicies;
    }

    public configureSchema(schemaConfig: SchemaInterface): void {
        this.schemaConfig = schemaConfig;
    }

    public registerInterceptor(interceptor: ProviderInterceptorInterface): void {
        this.interceptors.push(interceptor);
    }

    public provide(): DataProvidersFactory {
        return new DataProvidersFactory(
            this.http,
            this.sequential,
            this.defaultRequestOption,
            this.interceptors,
            this.requestPolicies,
            this.configuration,
            this.schemaConfig);
    }
}
