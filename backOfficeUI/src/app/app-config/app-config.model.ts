// TODO: Probably can be interface?
import { RestConfigModel } from './rest-config-model';

export class AppConfigModel {
    public configId?: string;
    public appRootPath?: string;
    public currentUserServiceUrl: string;
    public loggingServiceUrl: string;
    public rest?: RestConfigModel;
    public changePasswordUrlFormat: string;
}
