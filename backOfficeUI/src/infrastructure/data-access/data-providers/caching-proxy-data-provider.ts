import { URLSearchParams } from '@angular/http';
import { DataProvider } from './data-provider';
// import { ODataQuery } from '../odata/query';
import { RequestPolicy } from './contracts/request-policy';
// import { OdataQueryVisitorFactory } from '../odata/odata-query-visitor-factory';

/**
 * Proxy data provider that applies caching to 'safe' data actions
 */
export class CachingProxyDataProvider<TResource> implements DataProvider<TResource> {
    private readonly memoizedGet: (id?: number | string, policies?: RequestPolicy[]) => Promise<TResource>;
    private readonly memoizedFetch: (policies?: RequestPolicy[]) => Promise<TResource[]>;
    private readonly memoizedQuery: (options: Object, policies?: RequestPolicy[]) => Promise<TResource[]>;
    private readonly memoizedSearch: (search: URLSearchParams, policies?: RequestPolicy[]) => Promise<TResource>;

    /**
     * Create an instance of the caching proxy data provider.
     * @param dataProvider - the underlying data provider that will be proxied.
     */
    constructor(private readonly dataProvider: DataProvider<TResource>) {
        this.memoizedGet = _.memoize(
            (id?: number | string, policies?: RequestPolicy[]) => this.dataProvider.get(id, policies));

        this.memoizedFetch = _.once(
            (policies?: RequestPolicy[]) => this.dataProvider.fetch(policies));

        this.memoizedQuery = _.memoize(
            (options: Object, policies?: RequestPolicy[]) => this.dataProvider.query(options, policies),
            args => JSON.stringify(args[0]));

        this.memoizedSearch = _.memoize(
            (search: URLSearchParams, policies?: RequestPolicy[]) => this.dataProvider.search(search, policies),
            args => args[0].rawParams);
    }

    /**
     * Gets resource by id. Caches responses for each id value.
     * @param id - the resource identifier.
     * @param policies - the set of request policies which will be applied to the request and override default.
     * @return the resource.
     */
    public get(id?: number | string, policies?: RequestPolicy[]): Promise<TResource> {
        return this.memoizedGet(id, policies);
    }

    /**
     * Fetches all items of specific resource. Caches the response.
     * @param policies - the set of request policies which will be applied to the request and override default.
     * @return collection of items.
     */
    public fetch(policies?: RequestPolicy[]): Promise<TResource[]> {
        return this.memoizedFetch(policies);
    }

    /**
     * Runs query with parameters. Caches responses for equivalent options objects.
     * @param options - parameters for the query. One level deep object.
     * @param policies - the set of request policies which will be applied to the request and override default.
     * @return collection of items.
     */
    public query(options: Object, policies?: RequestPolicy[]): Promise<TResource[]> {
        return this.memoizedQuery(options, policies);
    }

    /**
     * Creates the resource.
     * @param data - the resource model.
     * @param policies - the set of request policies which will be applied to the request and override default.
     * @return created resource.
     */
    public create(data: TResource, policies?: RequestPolicy[]): Promise<TResource> {
        return this.dataProvider.create(data, policies);
    }

    /**
     * Updates the resource.
     * @param id - the resource identifier.
     * @param data - the resource model.
     * @param policies - the set of request policies which will be applied to the request and override default.
     * @return updated resource.
     */
    public update(id: number | string, data: TResource, policies?: RequestPolicy[]): Promise<TResource> {
        return this.dataProvider.update(id, data, policies);
    }

    /**
     * Removes the resource
     * @param id - the resource identifier.
     * @param policies - the set of request policies which will be applied to the request and override default.
     * @return removed resource.
     */
    public remove(id: number | string, policies?: RequestPolicy[]): Promise<TResource> {
        return this.dataProvider.remove(id, policies);
    }

    /**
     * Searches the resource according the passed parameters. Caches responses for equivalent search parameters.
     * @param search parameters for applying search.
     * @param policies - the set of request policies which will be applied to the request and override default.
     * @return search result.
     */
    public search(search: URLSearchParams, policies?: RequestPolicy[]): Promise<TResource> {
        return this.memoizedSearch(search, policies);
    }

    // /**
    //  * Gets odata query interface for current resource. Uses a caching data provider.
    //  * @param options additional options which will be inserted in the query string.
    //  * @param policies - the set of request policies which will be applied to the request and override default.
    //  * @return odata query interface.
    //  */
    // public odata(options?: Object, policies?: RequestPolicy[]): ODataQuery<TResource> {
    //     return new ODataQuery(this, new OdataQueryVisitorFactory(), policies, options);
    // }
}