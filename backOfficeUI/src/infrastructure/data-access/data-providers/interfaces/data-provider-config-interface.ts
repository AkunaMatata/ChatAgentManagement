import { RequestOptionsInterface } from './request-options-interface';

export interface DataProviderConfigInterface {
    apiEndpoint: string;
    options?: RequestOptionsInterface;
}
