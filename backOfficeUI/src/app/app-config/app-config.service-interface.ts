import { RestConfigModel } from './rest-config-model';

/**
 * Configuration Service
 */
export interface AppConfigServiceInterface {

    /**
     * Gets Api Endpoint.
     * @returns {string} - api web address.
     */
    getApiEndpoint(): string;

    /**
     * Gets Api Location.
     * @returns {string} - api location.
     */
    getApiLocation(): string;

    /**
     * Gets configed {RestConfigModel} .
     * @returns {RestConfigModel} - rest model that contains rest locatiod and name of api host.
     */
    getRest(): RestConfigModel;

    /**
     * Gets Current User Service url.
     * @returns {string} - Current User Service url.
     */
    getCurrentUserServiceUrl(): string;
}
