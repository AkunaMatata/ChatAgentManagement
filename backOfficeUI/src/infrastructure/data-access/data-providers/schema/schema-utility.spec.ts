import { SchemaUtility } from './schema-utility';
import { ProviderMethods } from './provider-methods';

const expect = chai.expect;
const moduleName = 'DataAccess';
const componentName = 'SchemaUtility';

describe(`${moduleName}.${componentName} `, () => {
    describe('#compileUrlSchema ', () => {
        it('should convert schema to schema map', () => {

            // Arrange
            const schema = {
                [ProviderMethods.query]: 'fakeTemplate',
            };

            // Act
            const result = SchemaUtility.compileUrlSchema(schema);

            // Assert
            expect(result[ProviderMethods.query]).to.be.ok;
        });
    });
});