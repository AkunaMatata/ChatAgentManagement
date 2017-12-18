import { ResourceUrlContextInterface } from './interfaces/resource-url-context-interface';
import { ResourceNamePlaceholder, SchemaMapInterface } from './schema/url-schema';
import { DataProviderConfigInterface } from './interfaces/data-provider-config-interface';
import { ProviderMethods } from './schema/provider-methods';

export class UrlBuilder {
    private readonly configuration: DataProviderConfigInterface;
    private readonly resourceName: string;
    private readonly urlTemplatesSchemaMap: SchemaMapInterface;

    constructor(
        configuration: DataProviderConfigInterface,
        resourceName: string,
        schemaMap: SchemaMapInterface
    ) {
        this.configuration = configuration;
        this.resourceName = resourceName;
        this.urlTemplatesSchemaMap = schemaMap;
    }

    /**
     * Build url for specific method based on the context.
     * @param method - the provider method.
     * @param context - the url context.
     * @returns the resource url.
     */
    public build(method: ProviderMethods, context?: ResourceUrlContextInterface): string {
        const baseUrl: string = this.configuration.apiEndpoint;
        const urlTemplate = this.urlTemplatesSchemaMap[method];
        let urlContext = context ? _.cloneDeep(context) : {};
        urlContext[ResourceNamePlaceholder] = this.resourceName;
        if (baseUrl && urlTemplate) {
            return `${baseUrl}/${urlTemplate(urlContext)}`;
        }

        return '';
    }
}
