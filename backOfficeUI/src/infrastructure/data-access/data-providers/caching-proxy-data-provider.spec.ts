import { fakeAsync, tick } from '@angular/core/testing';
import { URLSearchParams } from '@angular/http';
import { DataProvider } from './data-provider';
import { CachingProxyDataProvider } from './caching-proxy-data-provider';
// import { ODataQuery } from '../odata/query';

const expect = chai.expect;
const moduleName = 'DataAccess';
const componentName = 'CachingProxyDataProvider';

describe(`${moduleName}.${componentName}`, () => {

    let testTarget: any,
        dataProviderStub: any;

    const idOne = 1;
    const idTwo = 2;

    const dataStubOne: Object = {
        data: 'data'
    };
    const dataStubTwo = {
        data1: 'data1',
        data2: 'data2'
    };
    const dataStubTwoClone = {
        data1: 'data1',
        data2: 'data2'
    };
    const dataStubThree = {
        data3: 'data3'
    };

    // const odataQueryStub = { } as ODataQuery<Object>;

    beforeEach(() => {
        dataProviderStub = sinon.createStubInstance(DataProvider);
        dataProviderStub.get = sinon.spy(() => Promise.resolve(dataStubOne));
        dataProviderStub.fetch = sinon.spy(() => Promise.resolve(dataStubOne));
        dataProviderStub.query = sinon.spy(() => Promise.resolve(dataStubOne));
        dataProviderStub.create = sinon.spy(() => Promise.resolve(dataStubOne));
        dataProviderStub.update = sinon.spy(() => Promise.resolve(dataStubOne));
        dataProviderStub.remove = sinon.spy(() => Promise.resolve(dataStubOne));
        dataProviderStub.search = sinon.spy(() => Promise.resolve(dataStubOne));
        dataProviderStub.odata = sinon.spy(() => Promise.resolve(odataQueryStub));

        testTarget = new CachingProxyDataProvider(dataProviderStub);
    });

    function createMultipleRequestTest(
        targetFunction: Function,
        parameterLists: any[][],
        providerMethod: any,
        expectMultipleProviderCalls: boolean
    ): (done: any) => void {
        return fakeAsync(() => {
            // Arrange

            // Act
            const results = _.map(parameterLists, parameters => targetFunction.call(testTarget, parameters));
            tick();

            // Assert
            _.forEach(results, result => expect(result).to.be.eql(dataStubOne));
            _.forEach(parameterLists, parameters => expect(providerMethod.calledWith(parameters)).to.be.ok);
            expect(providerMethod.called).to.be.ok;
            expect(providerMethod.callCount > 1).to.be.eql(expectMultipleProviderCalls);
        });
    }

    describe('#get ', () => {
        it(
            'should call the dataprovider once when multiple calls are made for the same id',
            () => createMultipleRequestTest(testTarget.get, [ [ idOne ], [ idOne ] ], dataProviderStub.get, false));
        it(
            'should call the dataprovider multiple times when multiple calls are made with different ids',
            () => createMultipleRequestTest(testTarget.get, [ [ idOne ], [ idTwo ] ], dataProviderStub.get, true));
    });

    describe('#fetch ', () => {
        it(
            'should call the dataprovider once when multiple calls are made',
            () => createMultipleRequestTest(testTarget.fetch, [ [ ], [ ] ], dataProviderStub.fetch, false));
    });

    describe('#query ', () => {
        it(
            'should call the dataprovider once when multiple calls are made with equivalent options objects',
            () => createMultipleRequestTest(
                testTarget.query, [ [ dataStubTwo ], [ dataStubTwoClone ] ], dataProviderStub.query, false));
        it(
            'should call the dataprovider multiple times when multiple calls are made with different options',
            () => createMultipleRequestTest(
                testTarget.query, [ [ dataStubTwo ], [ dataStubThree ] ], dataProviderStub.query, true));
    });

    describe('#create ', () => {
        it(
            'should call the dataprovider multiple times when multiple calls are made for the same data',
            () => createMultipleRequestTest(
                testTarget.create, [ [ dataStubTwo ], [ dataStubTwo ] ], dataProviderStub.create, true));
        it(
            'should call the dataprovider multiple times when multiple calls are made with different ids',
            () => createMultipleRequestTest(
                testTarget.create, [ [ dataStubTwo ], [ dataStubThree ] ], dataProviderStub.create, true));
    });

    describe('#update ', () => {
        it(
            'should call the dataprovider multiple times when multiple calls are made for the same id',
            () => createMultipleRequestTest(
                testTarget.update,
                [ [ idOne, dataStubTwo ], [ idOne, dataStubThree ] ],
                dataProviderStub.update,
                true));
        it(
            'should call the dataprovider multiple times when multiple calls are made for the same data',
            () => createMultipleRequestTest(
                testTarget.update,
                [ [ idOne, dataStubTwo ], [ idTwo, dataStubTwo ] ],
                dataProviderStub.update,
                true));
        it(
            'should call the dataprovider multiple times when multiple calls are made for the same data and ids',
            () => createMultipleRequestTest(
                testTarget.update,
                [ [ idOne, dataStubTwo ], [ idOne, dataStubTwo ] ],
                dataProviderStub.update,
                true));
        it(
            'should call the dataprovider multiple times when multiple calls are made with different ids and data',
            () => createMultipleRequestTest(
                testTarget.update,
                [ [ idOne, dataStubTwo ], [ idTwo, dataStubThree ] ],
                dataProviderStub.update,
                true));
    });

    describe('#remove ', () => {
        it(
            'should call the dataprovider multiple times when multiple calls are made for the same ids',
            () => createMultipleRequestTest(
                testTarget.remove, [ [ idOne ], [ idOne ] ], dataProviderStub.remove, true));
        it(
            'should call the dataprovider multiple times when multiple calls are made with different ids',
            () => createMultipleRequestTest(
                testTarget.remove, [ [ idOne ], [ idTwo ] ], dataProviderStub.remove, true));
    });

    describe('#search ', () => {
        const searchParamsOne = new URLSearchParams('?test1=1');
        const searchParamsOneClone = new URLSearchParams('?test1=1');
        const searchParamsTwo = new URLSearchParams('?test2=2');

        it(
            'should call the dataprovider once when multiple calls are made with equivalent search params',
            () => createMultipleRequestTest(
                testTarget.search, [ [ searchParamsOne ], [ searchParamsOneClone ] ], dataProviderStub.search, false));
        it(
            'should call the dataprovider multiple times when multiple calls are made with different search params',
            () => createMultipleRequestTest(
                testTarget.search, [ [ searchParamsOne ], [ searchParamsTwo ] ], dataProviderStub.search, true));
    });

    describe('#odata ', () => {
        it('should not use the odata method of the provider', () => {
            // Arrange

            // Act
            const result = testTarget.odata();

            // Assert
            expect(dataProviderStub.odata.called).to.not.be.ok;
            expect(result).to.not.be.eql(odataQueryStub);
        });
    });

});