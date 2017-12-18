import TemplateExecutor = _.TemplateExecutor;
import { ProviderMethods } from './provider-methods';

export const ResourceNamePlaceholder = 'resourceName';
const basicResourceEndpointTemplate: TemplateExecutor = _.template(`\${${ResourceNamePlaceholder}}`);
const basicResourceEndpointIdTemplate: TemplateExecutor = _.template(`\${${ResourceNamePlaceholder}}/\${id}`);

export const DefaultUrlSchemaMap: SchemaMapInterface = {
    [ProviderMethods.get]: basicResourceEndpointIdTemplate,
    [ProviderMethods.fetch]: basicResourceEndpointTemplate,
    [ProviderMethods.create]: basicResourceEndpointTemplate,
    [ProviderMethods.query]: _.template(`/\${${ResourceNamePlaceholder}}\${query}`),
    [ProviderMethods.remove]: basicResourceEndpointIdTemplate, // TODO: Handle multiple delete in different way.
    [ProviderMethods.update]: basicResourceEndpointIdTemplate,
    [ProviderMethods.search]: basicResourceEndpointTemplate
};

export interface SchemaMapInterface {
    [method: number]: TemplateExecutor;
}

export interface SchemaInterface {
    [method: number]: string;
}