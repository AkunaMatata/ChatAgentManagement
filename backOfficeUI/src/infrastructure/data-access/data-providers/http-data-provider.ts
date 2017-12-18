import { Http, RequestMethod, BaseRequestOptions, URLSearchParams } from '@angular/http';
import { RequestArgs } from '@angular/http/src/interfaces';
import 'rxjs/add/observable/fromPromise';
import { DataProvider } from './data-provider';
import { UrlBuilder } from './url-builder';
import { ProviderMethods } from './schema/provider-methods';
import { ResourceUrlContextInterface } from './interfaces/resource-url-context-interface';
import { ProviderInterceptorInterface } from './interfaces/provider-interceptor-interface';
import { RequestOptionsInterface } from './interfaces/request-options-interface';
// import { ODataQuery } from '../odata/query';
// import { OdataQueryVisitorFactory } from '../odata/odata-query-visitor-factory';
import { RequestPolicy } from './contracts/request-policy';
import { Request } from './contracts/request';
import { Response } from './contracts/response';
import { SequentialService } from './sequential-service';

/**
 * Http data provider
 */
export class HttpDataProvider<TResource> implements DataProvider<TResource> {

    private readonly httpService: Http;
    private readonly urlBuilder: UrlBuilder;
    private readonly defaultRequestOptions: BaseRequestOptions;
    private readonly interceptors: ProviderInterceptorInterface[];
    private readonly defaultRequestPolicies: RequestPolicy[];
    private readonly requestOptions: RequestOptionsInterface;
    private readonly sequential: SequentialService;

    /**
     * Create an instance of the http data provider.
     * @param urlBuilder - url builder to build absolute url.
     * @param sequential The service to generate sequential ids.
     * @param httpService - the http service.
     * @param defaultRequestOptions - the options which is configured for module by default.
     * @param requestPolicies - the request policies which will be applied for all requests from this provider.
     * @param requestOptions - the options which are configured on the level of provider factory.
     * @param interceptors - request interceptors.
     */
    constructor(
        urlBuilder: UrlBuilder,
        sequential: SequentialService,
        httpService: Http,
        defaultRequestOptions: BaseRequestOptions,
        requestPolicies: RequestPolicy[],
        requestOptions?: RequestOptionsInterface,
        interceptors?: ProviderInterceptorInterface[]) {
        this.httpService = httpService;
        this.urlBuilder = urlBuilder;
        this.defaultRequestOptions = defaultRequestOptions;
        this.interceptors = interceptors || [];
        this.defaultRequestPolicies = requestPolicies;
        this.requestOptions = requestOptions;
        this.sequential = sequential;
    }

    /**
     * Gets resource by id.
     * @param id - the resource identifier.
     * @param policies - the set of request policies which will be applied to the request and override default.
     * @return the resource.
     */
    public get(id?: number | string, policies?: RequestPolicy[]): Promise<TResource> {
        return this.request(
            this.createRequest(
                ProviderMethods.get,
                RequestMethod.Get,
                policies,
                this.requestOptions,
                { id: id }
            )
        );
    }

    /**
     * Fetches all items of specific resource.
     * @param policies - the set of request policies which will be applied to the request and override default.
     * @return collection of items.
     */
    public fetch(policies?: RequestPolicy[]): Promise<TResource[]> {
        return this.request(
            this.createRequest(
                ProviderMethods.fetch,
                RequestMethod.Get,
                policies,
                this.requestOptions
            )
        ) as any; // TODO: Find better way to return value.
    }

    /**
     * Runs query with parameters.
     * @param options - parameters for the query. One level deep object.
     * @param policies - the set of request policies which will be applied to the request and override default.
     * @return collection of items.
     */
    public query(options: Object, policies?: RequestPolicy[]): Promise<TResource[]> {
        const urlParameters = this.processOptions(options);
        return this.request(
            this.createRequest(
                ProviderMethods.query,
                RequestMethod.Get,
                policies,
                this.requestOptions,
                { query: urlParameters || '' }
            )
        ) as any; // TODO: Find better way to return value.
    }

    /**
     * Creates the resource.
     * @param data - the resource model.
     * @param policies - the set of request policies which will be applied to the request and override default.
     * @return created resource.
     */
    public create(data: TResource, policies?: RequestPolicy[]): Promise<TResource> {
        return this.request(
            this.createRequest(
                ProviderMethods.create,
                RequestMethod.Post,
                policies,
                this.requestOptions,
                {},
                data
            )
        );
    }

    /**
     * Updates the resource.
     * @param id - the resource identifier.
     * @param data - the resource model.
     * @param policies - the set of request policies which will be applied to the request and override default.
     * @return updated resource.
     */
    public update(id: number | string, data: TResource, policies?: RequestPolicy[]): Promise<TResource> {
        return this.request(
            this.createRequest(
                ProviderMethods.update,
                RequestMethod.Put,
                policies,
                this.requestOptions,
                { id: id },
                data
            )
        );
    }

    /**
     * Removes the resource
     * @param id - the resource identifier.
     * @param policies - the set of request policies which will be applied to the request and override default.
     * @return removed resource.
     */
    public remove(id: number | string, policies?: RequestPolicy[]): Promise<TResource> {
        return this.request(
            this.createRequest(
                ProviderMethods.remove,
                RequestMethod.Delete,
                policies,
                this.requestOptions,
                { id: id }
            )
        );
    }

    /**
     * Searches the resource according the passed parameters.
     * @param search parameters for applying search.
     * @param policies - the set of request policies which will be applied to the request and override default.
     * @return search result.
     */
    public search(search: URLSearchParams, policies?: RequestPolicy[]): Promise<TResource> {
        const options = _.merge({}, this.requestOptions, { params: search });

        return this.request(
            this.createRequest(
                ProviderMethods.search,
                RequestMethod.Get,
                policies,
                options
            )
        );
    }

    // /**
    //  * Gets odata query interface for current resource.
    //  * @param options additional options which will be inserted in the query string.
    //  * @param policies - the set of request policies which will be applied to the request and override default.
    //  * @return odata query interface.
    //  */
    // public odata(options?: Object, policies?: RequestPolicy[]): ODataQuery<TResource> {
    //     return new ODataQuery(this, new OdataQueryVisitorFactory(), policies, options);
    // }

    private request(request: Request): Promise<TResource> {
        const processedRequest = _.reduce(
            this.interceptors,
            (result, next) => next.onRequestStart(result), request) as Request;

        const response = this
            .httpService
            .request(processedRequest)
            .toPromise();

        const wrappedResponse = response
            .then(successResponse => new Response(
                successResponse,
                request.id,
                processedRequest.policies
            ))
            .catch(errorResponse => Promise.reject(
                new Response(
                    errorResponse,
                    request.id,
                    processedRequest.policies
                )));

        const processedResponse = _.reduce(
            this.interceptors,
            (result, next) => next.onResponse(result), wrappedResponse) as Promise<Response>;

        return processedResponse
            .then(successResponse =>
                successResponse.original.text() ? successResponse.original.json() : Promise.resolve(null))
            .catch(errorResponse => Promise.reject(errorResponse.original));
    }

    // todo replace any to new interface
    private createRequest(
        operation: ProviderMethods,
        method: RequestMethod,
        policiesOverride: RequestPolicy[],
        config?: any,
        context?: ResourceUrlContextInterface,
        data?: any): Request {
        const basicRequest: RequestArgs = {
            method: method,
            url: this.urlBuilder.build(operation, context),
        };

        let requestOptions = _.defaultsDeep({}, basicRequest, config, this.defaultRequestOptions) as RequestArgs;

        const policies = policiesOverride
            ? _.unionWith(
                _.uniqBy(policiesOverride, i => i.type),
                _.uniqBy(this.defaultRequestPolicies, i => i.type), (first, second) => first.type === second.type)
            : _.uniqBy(this.defaultRequestPolicies, i => i.type);

        if (data) {
            requestOptions.body = data;
        }

        return new Request(requestOptions, this.sequential.next().value, policies);
    }

    // todo ideally this logic should be moved out of this class but for now leave it here.
    private processOptions(options: Object): string {
        return !_.isEmpty(options) && `?${_(options).keys()
            .map(key =>
                [key, options[key]].map(encodeURIComponent).join('='))
            .join('&')}`;
    }
}