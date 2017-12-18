import { DataProvidersFactory } from './data-providers-factory';
import { RequestOptions, Http } from '@angular/http';
import { SequentialService } from './sequential-service';

const expect = chai.expect;
const moduleName = 'DataAccess';
const componentName = 'DataProviderFactory';

describe(`${moduleName}.${componentName} `, () => {
    let testTarget: DataProvidersFactory;

    beforeEach(() => {
        testTarget = new DataProvidersFactory({} as Http, {} as SequentialService, new RequestOptions(), [], []);
    });

    describe('#create ', () => {
        it('should create provider', () => {
            // Act
            const result = testTarget.create('test');

            // Assert
            expect(result).to.be.ok;
        });
    });
});