import { Http } from '@angular/http';
import { AppConfigMetadataModel } from './app-config-metadata.model';

export class AppConfigLoader<TModel> {
    private readonly http: Http;

    /**
     * Creates an instance of AppConfigLoader.
     * @param {Http} http
     */
    constructor(http: Http) {
        this.http = http;
    }

    /**
     * Loads an app config for current environment.
     * @param {AppConfigMetadataModel} - metadata that describes config.
     * @returns {Observable<TModel>}
     */
    public loadAppConfigFromHost(appConfigSource: AppConfigMetadataModel): Promise<TModel> {
        if (!appConfigSource) {
            throw new Error('appConfigSource must be defined');
        }
        return (appConfigSource.isCfgHasOverride)
            ? this.loadAppCfgWithEnvOverrides(appConfigSource.cfgBaseName, appConfigSource.cfgOverrideName)
            : this.loadBaseAppConfig(appConfigSource.cfgBaseName);
    }

    private loadBaseAppConfig(appBaseCfgPath: string): Promise<TModel> {
        return this.http
            .get(appBaseCfgPath)
            .toPromise() as any; // TODO: Find better way to return value.
    }

    private loadAppCfgWithEnvOverrides(
        appBaseCfgPath: string,
        appConfigOvveridesPath: string
    ): Promise<TModel> {
        const configBasePromise = this.http.get(appBaseCfgPath).toPromise();
        const configOverridePromise = this.http.get(appConfigOvveridesPath).toPromise();

        return Promise
            .all([configBasePromise, configOverridePromise])
            .then(dataArray => {
                let result: any = {};
                if (dataArray && dataArray[0] && dataArray[1]) {
                    _.merge(result, dataArray[0].json(), dataArray[1].json());
                }

                return result;
            });
    }
}
