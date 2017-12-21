import { Injectable } from '@angular/core';
// import { ODataQuery } from '../odata/query';
import { URLSearchParams } from '@angular/http';
import { RequestPolicy } from './contracts/request-policy';

/**
 * Represents data provider interface.
 */
@Injectable()
export abstract class DataProvider<TResource> {

    /**
     * Gets resource by id.
     * @param id the resource identifier.
     * @return the resource.
     */
    public get: (id?: number | string, policies?: RequestPolicy[]) => Promise<TResource>;

    /**
     * Fetches all items of specific resource.
     * @return collection of items.
     */
    public fetch: (policies?: RequestPolicy[]) => Promise<TResource[]>;

    /**
     * Runs query with parameters.
     * @param options parameters for the query. One level deep object.
     * @return collection of items.
     */
    public query: (options: Object, policies?: RequestPolicy[]) => Promise<TResource[]>;

    /**
     * Creates the resource.
     * @param data the resource model.
     * @return created resource.
     */
    public create: (data: TResource, policies?: RequestPolicy[]) => Promise<TResource>;

    /**
     * Updates the resource.
     * @param id the resource identifier.
     * @param data the resource model.
     * @return updated resource.
     */
    public update: (id: number | string, data: TResource, policies?: RequestPolicy[]) => Promise<TResource>;

    /**
     * Removes the resource
     * @param id the resource identifier.
     * @return removed resource.
     */
    public remove: (id: number | string, policies?: RequestPolicy[]) => Promise<TResource>;

    /**
     * Searches the resource according the passed parameters.
     * @param search parameters for applying search.
     * @return search result.
     */
    public search: (search: URLSearchParams, policies?: RequestPolicy[]) => Promise<TResource>;

    // /**
    //  * Gets odata query interface for current resource.
    //  * @param options additional options which will be inserted in the query string.
    //  * @return odata query interface.
    //  */
    // public odata: (options?: Object, policies?: RequestPolicy[]) => ODataQuery<TResource>;
}