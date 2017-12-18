import { UrlBuilder } from './url-builder';
import { ProviderMethods } from './schema/provider-methods';
import { ResourceUrlContextInterface } from './interfaces/resource-url-context-interface';
import { DataProviderConfigInterface } from './interfaces/data-provider-config-interface';
import { SchemaMapInterface } from './schema/url-schema';

const expect = chai.expect;
const moduleName = 'DataAccess';
const componentName = 'UrlBuilder';

const stubResourceName = 'testResource';
const stubConfig: DataProviderConfigInterface = {
    apiEndpoint: 'http://testhost/api'
};

const stubSchemaMap: SchemaMapInterface = {
    [ProviderMethods.get]: _.template('${resourceName}/${id}'),
    [ProviderMethods.fetch]: _.template('${resourceName}'),
    [ProviderMethods.create]: _.template('${resourceName}'),
    [ProviderMethods.query]: _.template('${resourceName}${query}'),
    [ProviderMethods.remove]: _.template('${resourceName}/${id}'),
    [ProviderMethods.update]: _.template('${resourceName}/${id}')
};

const testTemplateFactory = (testTarget: UrlBuilder) => {
    return (method: ProviderMethods, expectedResult: string, context?: ResourceUrlContextInterface): void => {

        // Act
        let result = testTarget.build(method, context);

        // Assert
        expect(result).to.eq(expectedResult);
    };
};

describe(`${moduleName}.${componentName} `, () => {
    describe('#build ', () => {
        describe('for default schema ', () => {
            let testTarget: UrlBuilder,
                testTemplate: (
                    method: ProviderMethods,
                    expectedResult: string,
                    context?: ResourceUrlContextInterface) => void;

            beforeEach(() => {
                testTarget = new UrlBuilder(stubConfig, stubResourceName, stubSchemaMap);
                testTemplate = testTemplateFactory(testTarget);
            });

            it('should build get url', () => {
                const stubId = '100';
                testTemplate(
                    ProviderMethods.get,
                    `${stubConfig.apiEndpoint}/${stubResourceName}/${stubId}`,
                    { id: stubId });
            });

            it('should build fetch url', () => testTemplate(
                ProviderMethods.fetch,
                `${stubConfig.apiEndpoint}/${stubResourceName}`));

            it('should build create url', () => testTemplate(
                ProviderMethods.create,
                `${stubConfig.apiEndpoint}/${stubResourceName}`));

            it('should build update url', () => {
                const stubId = '100';
                testTemplate(
                    ProviderMethods.update,
                    `${stubConfig.apiEndpoint}/${stubResourceName}/${stubId}`,
                    { id: stubId });
            });

            it('should build remove url', () => {
                const stubId = '100';
                testTemplate(
                    ProviderMethods.remove,
                    `${stubConfig.apiEndpoint}/${stubResourceName}/${stubId}`,
                    { id: stubId });
            });

            it('should build query url', () => {
                const query = '?option=1';
                testTemplate(
                    ProviderMethods.query,
                    `${stubConfig.apiEndpoint}/${stubResourceName}${query}`,
                    { query: query });
            });

            it('should build empty query url if invalid method specified',
               () => testTemplate(-1  as ProviderMethods, ''));

            it('should build empty query url if empty resource name specified',
               () => {
                   // Arrange
                   const target = new UrlBuilder({ apiEndpoint: '' }, stubResourceName, stubSchemaMap);

                   // Act
                   const result = target.build(ProviderMethods.get);

                   // Assert
                   expect(result).to.be.empty;
               });
        });
    });
});