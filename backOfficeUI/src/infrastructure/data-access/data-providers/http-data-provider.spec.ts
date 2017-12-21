import {
    RequestOptions, RequestMethod, URLSearchParams, ResponseContentType, Headers, Response as BaseResponse,
    ResponseOptions
} from '@angular/http';
import { fakeAsync, tick } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpDataProvider } from './http-data-provider';
import { ProviderMethods } from './schema/provider-methods';
import { RequestOptionsInterface } from './interfaces/request-options-interface';
import { Request } from './contracts/request';
import { Response } from './contracts/response';

const expect = chai.expect;
const moduleName = 'DataAccess';
const componentName = 'HttpDataProvider';

const stubResourceEndpoint = 'http://testhost/api/override';
const defaultOptions = new RequestOptions({
    method: RequestMethod.Options,
    url: 'fake',
    headers: new Headers(),
    body: { data: 'fake' },
    search: new URLSearchParams(),
    responseType: ResponseContentType.Json,
    withCredentials: true
});

describe(`${moduleName}.${componentName} `, () => {
    let urlBuilderSpy: any,
        httpServiceSpy: any,
        sequentialStub: any;

    beforeEach(() => {
        urlBuilderSpy = {
            build: sinon.spy(() => stubResourceEndpoint)
        };

        httpServiceSpy = {
            request: sinon.spy(() => Observable.fromPromise(Promise.resolve(new BaseResponse(new ResponseOptions()))))
        };

        sequentialStub = {
            next: sinon.stub().returns({ done: false, value: 0 }),
            reset: sinon.stub()
        };
    });

    describe('for default options ', () => {

        let testTarget: HttpDataProvider<any>;

        beforeEach(() => {
            testTarget = new HttpDataProvider(urlBuilderSpy, sequentialStub, httpServiceSpy, defaultOptions, []);
        });

        describe('#get ', () => {
            it('should pull resource by id', fakeAsync(() => {

                // Arrange
                const context = { id: 100 };

                // Act
                testTarget.get(context.id);

                tick();

                // Assert
                expect(urlBuilderSpy.build.calledWithExactly(ProviderMethods.get, context)).to.be.ok;
                expect(
                    httpServiceSpy.request.calledWithExactly(
                        new Request(
                            _.defaults(
                                {
                                    method: RequestMethod.Get,
                                    url: stubResourceEndpoint
                                },
                                defaultOptions
                            ),
                            0,
                            [])
                    )
                ).to.be.ok;
            }));
        });

        describe('#create ', () => {
            it('should create the resource', fakeAsync(() => {

                // Arrange
                const data = { some: 'some' };

                // Act
                testTarget.create(data);
                tick();

                // Assert
                expect(urlBuilderSpy.build.calledWithExactly(ProviderMethods.create, {})).to.be.ok;
                expect(
                    httpServiceSpy.request.calledWithExactly(
                        new Request(
                            _.defaults(
                                {
                                    method: RequestMethod.Post,
                                    url: stubResourceEndpoint,
                                    body: data
                                },
                                defaultOptions
                            ),
                            0,
                            [])
                    )
                ).to.be.ok;
            }));
        });

        describe('#remove ', () => {
            it('should remove the resource', fakeAsync(() => {

                // Arrange
                const context = { id: 100 };

                // Act
                testTarget.remove(context.id);
                tick();

                // Assert
                expect(urlBuilderSpy.build.calledWithExactly(ProviderMethods.remove, context)).to.be.ok;
                expect(httpServiceSpy.request.calledWithExactly(
                    new Request(
                        _.defaults(
                            {
                                method: RequestMethod.Delete,
                                url: stubResourceEndpoint
                            },
                            defaultOptions
                        ),
                        0,
                        []
                    ))
                ).to.be.ok;
            }));
        });

        describe('#update ', () => {
            it('should update the resource', fakeAsync(() => {

                // Arrange
                const context = { id: 100 };
                const data = { some: 'some' };

                // Act
                testTarget.update(context.id, data);
                tick();

                // Assert
                expect(urlBuilderSpy.build.calledWithExactly(ProviderMethods.update, context)).to.be.ok;
                expect(
                    httpServiceSpy.request.calledWithExactly(
                        new Request(
                            _.defaults(
                                {
                                    method: RequestMethod.Put,
                                    url: stubResourceEndpoint,
                                    body: data
                                },
                                defaultOptions
                            ),
                            0,
                            [])
                    )
                ).to.be.ok;
            }));
        });

        describe('#query ', () => {
            it('should get resources by specific filter if specified', fakeAsync(() => {

                // Arrange
                const filter = {
                    first: 'testFirst',
                    second: 'testSecond'
                };
                const resultQuery = '?first=testFirst&second=testSecond';

                // Act
                testTarget.query(filter);
                tick();

                // Assert
                expect(urlBuilderSpy.build.calledWithExactly(ProviderMethods.query, { query: resultQuery })).to.be.ok;
                expect(httpServiceSpy.request.calledWithExactly(
                    new Request(
                        _.defaults(
                            {
                                method: RequestMethod.Get,
                                url: stubResourceEndpoint
                            },
                            defaultOptions),
                        0,
                        []))
                ).to.be.ok;
            }));

            it('should get resources without filter if not specified', fakeAsync(() => {

                // Act
                testTarget.query({});
                tick();

                // Assert
                expect(urlBuilderSpy.build.calledWithExactly(ProviderMethods.query, { query: '' })).to.be.ok;
                expect(
                    httpServiceSpy.request.calledWithExactly(
                        new Request(
                            _.defaults(
                                {
                                    method: RequestMethod.Get,
                                    url: stubResourceEndpoint
                                },
                                defaultOptions
                            ),
                            0,
                            [])
                    )
                ).to.be.ok;
            }));
        });

        describe('#fetch ', () => {
            it('should get resources', fakeAsync(() => {

                // Act
                testTarget.fetch();
                tick();

                // Assert
                expect(urlBuilderSpy.build.calledWithExactly(ProviderMethods.fetch, undefined)).to.be.ok;
                expect(
                    httpServiceSpy.request.calledWithExactly(
                        new Request(
                            _.defaults(
                                {
                                    method: RequestMethod.Get,
                                    url: stubResourceEndpoint
                                },
                                defaultOptions
                            ),
                            0,
                            [])
                    )
                ).to.be.ok;
            }));
        });
    });

    describe('for overridden options ', () => {
        let testTarget: HttpDataProvider<any>;
        const overriddenOptions: RequestOptionsInterface = {
            headers: new Headers(['Header']),
            responseType: ResponseContentType.Text,
            withCredentials: false
        };

        beforeEach(() => {
            testTarget = new HttpDataProvider(
                urlBuilderSpy,
                sequentialStub,
                httpServiceSpy,
                defaultOptions,
                [],
                overriddenOptions);
        });

        describe('#get ', () => {
            it('should pull resource by id', fakeAsync(() => {

                // Arrange
                const context = { id: 100 };

                // Act
                testTarget.get(context.id);
                tick();

                // Assert
                expect(urlBuilderSpy.build.calledWithExactly(ProviderMethods.get, context)).to.be.ok;
                expect(
                    httpServiceSpy.request.calledWithExactly(
                        new Request(
                            _.defaults(
                                {
                                    method: RequestMethod.Get,
                                    url: stubResourceEndpoint
                                },
                                overriddenOptions,
                                defaultOptions
                            ),
                            0,
                            [])
                    )
                ).to.be.ok;
            }));
        });

        describe('#create ', () => {
            it('should create the resource', fakeAsync(() => {

                // Arrange
                const data = { some: 'some' };

                // Act
                testTarget.create(data);
                tick();

                // Assert
                expect(urlBuilderSpy.build.calledWithExactly(ProviderMethods.create, {})).to.be.ok;
                expect(
                    httpServiceSpy.request.calledWithExactly(
                        new Request(
                            _.defaults(
                                {
                                    method: RequestMethod.Post,
                                    url: stubResourceEndpoint,
                                    body: data
                                },
                                overriddenOptions,
                                defaultOptions
                            ),
                            0,
                            [])
                    )
                ).to.be.ok;
            }));
        });
    });

    describe('for default options', () => {
        let testTarget: HttpDataProvider<any>;

        const mockRequest1 = { stub: 'stub1', policies: [] },
            mockResponse1 = Promise.resolve(new Response(new BaseResponse(new ResponseOptions()), 0, [])),
            stubResponseModel = new Response(new BaseResponse(new ResponseOptions()), 0, []);
        let stubResponse,
            interceptorMock1,
            interceptorMock2;

        beforeEach(() => {
            interceptorMock1 = {
                onRequestStart: sinon.spy(() => mockRequest1),
                onResponse: sinon.spy(() => mockResponse1)
            };

            interceptorMock2 = {
                onRequestStart: sinon.spy(() => mockRequest1),
                onResponse: sinon.spy(() => Promise.resolve(stubResponse))
            };
            testTarget = new HttpDataProvider(
                urlBuilderSpy,
                sequentialStub,
                httpServiceSpy,
                defaultOptions,
                [],
                undefined,
                [interceptorMock1, interceptorMock2]
            );
        });

        describe('#get ', () => {
            it('should apply interceptors and convert data to json', fakeAsync(() => {

                // Arrange
                const context = { id: 100 };
                stubResponse = new Response(
                    {
                        text: sinon.stub().returns('{"data":"someVal"'),
                        json: sinon.stub().returns(stubResponseModel)
                    } as BaseResponse,
                    0,
                    []);

                // Act
                testTarget.get(context.id).then((data) => {
                    expect(data).to.be.eql(stubResponseModel);
                });
                tick();

                // Assert
                expect(interceptorMock1.onRequestStart.calledOnce).to.be.ok;
                expect(interceptorMock2.onRequestStart.calledWithExactly(mockRequest1)).to.be.ok;

                expect(interceptorMock2.onResponse.calledOnce).to.be.ok;
                expect(interceptorMock2.onResponse.calledWithExactly(mockResponse1)).to.be.ok;
            }));

            it('should apply interceptors and resolve empty promise if data is empty', fakeAsync(() => {

                // Arrange
                const context = { id: 100 };
                stubResponse = new Response(
                    {
                        text: sinon.stub().returns(''),
                        json: sinon.stub().returns(stubResponseModel)
                    } as BaseResponse,
                    0,
                    []);

                // Act
                testTarget.get(context.id).then((data) => {
                    expect(data).to.be.null;
                });

                tick();

                // Assert
                expect(interceptorMock1.onRequestStart.calledOnce).to.be.ok;
                expect(interceptorMock2.onRequestStart.calledWithExactly(mockRequest1)).to.be.ok;

                expect(interceptorMock2.onResponse.calledOnce).to.be.ok;
                expect(interceptorMock2.onResponse.calledWithExactly(mockResponse1)).to.be.ok;
            }));
        });
    });
});