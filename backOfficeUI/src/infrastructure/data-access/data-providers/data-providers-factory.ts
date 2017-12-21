import { Http, RequestOptions } from '@angular/http';
import { DataProvider } from './data-provider';
import { HttpDataProvider } from './http-data-provider';
import { Injectable } from '@angular/core';
import { UrlBuilder } from './url-builder';
import { DefaultUrlSchemaMap, SchemaInterface, SchemaMapInterface } from './schema/url-schema';
import { DataProviderConfigInterface } from './interfaces/data-provider-config-interface';
import { ProviderInterceptorInterface } from './interfaces/provider-interceptor-interface';
import { SchemaUtility } from './schema/schema-utility';
import { RequestPolicy } from './contracts/request-policy';
import { SequentialService } from './sequential-service';
import { CachingProxyDataProvider } from './caching-proxy-data-provider';

/**
 * Factory that produces Base Data Providers.
 */
@Injectable()
export class DataProvidersFactory {
    private static DefaultConfiguration: DataProviderConfigInterface = {
        apiEndpoint: ''
    };

    private readonly httpService: Http;
    private readonly configuration: DataProviderConfigInterface;
    private readonly schemaConfig: SchemaMapInterface;
    private readonly requestPolicies: RequestPolicy[];
    private readonly defaultRequestOptions: RequestOptions;
    private readonly interceptors: ProviderInterceptorInterface[];
    private readonly sequential: SequentialService;

    /**
     * Create an instance of BaseDataProvidersFactory class.
     * @param httpService The http service.
     * @param sequential The service to generate sequential ids.
     * @param defaultRequestOptions options which are default for angular http service.
     * @param interceptors requests interceptors.
     * @param requestPolicies global requests policies which will be applied for all requests.
     * @param configuration Providers configuration.
     * @param schemaConfig Url schema configuration to override default configuration.
     * @constructor
     */
    constructor(
        httpService: Http,
        sequential: SequentialService,
        defaultRequestOptions: RequestOptions,
        interceptors: ProviderInterceptorInterface[],
        requestPolicies: RequestPolicy[],
        configuration?: DataProviderConfigInterface,
        schemaConfig?: SchemaInterface) {

        this.httpService = httpService;
        this.sequential = sequential;
        this.configuration = configuration || DataProvidersFactory.DefaultConfiguration;
        this.interceptors = interceptors;
        this.requestPolicies = requestPolicies || [];
        this.defaultRequestOptions = defaultRequestOptions;
        this.schemaConfig = DataProvidersFactory.createSchema(DefaultUrlSchemaMap, schemaConfig);
    }

    // tslint:disable-next-line:member-ordering
    private static createSchema(
        defaultSchemaMap: SchemaMapInterface,
        schemaOverride?: SchemaInterface): SchemaMapInterface {
        return !schemaOverride
            ? defaultSchemaMap
            : _.defaults({}, SchemaUtility.compileUrlSchema(schemaOverride), defaultSchemaMap);
    }

    /**
     * Creates Base Data Provider by resource name.
     * @param resourceName - name of resource.
     * @param schemaOverride - pass Map to override default url schema.
     * @param requestPoliciesOverride - policies which will be added to the existing ones. Or override existing once.
     * @param cacheSafeRequests - a flag indicating whether safe (i.e. options, get, and head) 
     *  requests should be cached by the provider
     * @returns abstract data provider.
     */
    public create<TModel>(
        resourceName: string,
        requestPoliciesOverride?: RequestPolicy[],
        schemaOverride?: SchemaInterface,
        cacheSafeRequests = false
    ): DataProvider<TModel> {
        const urlBuilder = new UrlBuilder(
            this.configuration,
            resourceName,
            DataProvidersFactory.createSchema(this.schemaConfig, schemaOverride));

        const policies = requestPoliciesOverride
                ? _.unionWith(
                    _.uniqBy(requestPoliciesOverride, i => i.type),
                    _.uniqBy(this.requestPolicies, i => i.type), (first, second) => first.type === second.type)
                : _.uniqBy(this.requestPolicies, i => i.type);

        const dataProvider = new HttpDataProvider<TModel>(
            urlBuilder,
            this.sequential,
            this.httpService,
            this.defaultRequestOptions,
            policies,
            this.configuration && this.configuration.options,
            this.interceptors);

        return cacheSafeRequests
            ? new CachingProxyDataProvider(dataProvider)
            : dataProvider;
    }
}