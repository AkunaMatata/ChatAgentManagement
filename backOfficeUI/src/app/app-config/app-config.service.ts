import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Response } from '../../infrastructure/data-access/data-providers/contracts/response';
import { AppConfigModel } from './app-config.model';
import { RestConfigModel } from './rest-config-model';
import { AppConfigMetadataModel } from './app-config-metadata.model';
import { AppConfigLoader } from './app-config-loader';
import { AppConfigServiceInterface } from './app-config.service-interface';

const appConfigPaths: AppConfigMetadataModel = {
    cfgBaseName: require('../app-config.json'),
    cfgOverrideName:  undefined,
    isCfgHasOverride: false
};

@Injectable()
export class AppConfigService implements AppConfigServiceInterface {
    private static DEFAULT_API_LOCATION: string = 'http://localhost/LoginManagementAPI/api/';
    private appConfigLoader: AppConfigLoader<AppConfigModel>;
    private config: AppConfigModel = null;

    /**
     * Creates an instance of AppConfigService.
     * @param {Http} http
     */
    constructor(http: Http) {
        this.appConfigLoader = new AppConfigLoader<AppConfigModel>(http);
    }

    /**
     * Gets Api Location.
     * @returns {string} - api location.
     */
    public getApiLocation(): string {
        const restConfig = this.getRest();

        return this.hasRestLocation(restConfig)
            ? restConfig.restLocation
            : AppConfigService.DEFAULT_API_LOCATION;
    }

    /**
     * Gets Api Endpoint.
     * @returns {string} - api web address.
     */
    public getApiEndpoint(): string {
        const restConfig = this.getRest();
        const apiLocation = this.getApiLocation();

        return restConfig && restConfig.apiHost
            ? `${restConfig.apiHost}${apiLocation ? '/' : ''}${apiLocation}`
            : apiLocation;
    }

    /**
     * Gets configed {RestConfigModel} .
     * @returns {RestConfigModel} - rest model that contains rest locatiod and name of api host.
     */
    public getRest(): RestConfigModel {
        return this.config.rest;
    }

    /**
     * Gets Current User Service url.
     * @returns {string} - Current User Service url.
     */
    public getCurrentUserServiceUrl(): string {
        return this.config.currentUserServiceUrl;
    }

    /**
     * Gets Logging Service url.
     * @returns {string} - Logging Service url.
     */
    public getLoggingServiceUrl(): string {
        return this.config.loggingServiceUrl;
    }

    /**
     * Gets Url of 'ChangePassword' page.
     * @returns {string} - url.
     */
    public getChangePasswordUrlFormat(): string {
        return this.config.changePasswordUrlFormat;
    }

    /**
     * Loads an app config for current environment to service.
     */
    public load(): Promise<Response> {
        return this.appConfigLoader
            .loadAppConfigFromHost(appConfigPaths)
            .then(configData => {
                this.config = configData;
                return Promise.resolve(configData);
            })
            .catch(error => {
                return Promise.reject(error);
            }) as any; // TODO: Find better way to return value.
    }

    private hasRestLocation(restConfig: RestConfigModel): boolean {
        return !_.isUndefined(restConfig)
            && !_.isUndefined(restConfig.restLocation);
    }
}
