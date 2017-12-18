import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { DataProvidersFactory } from './data-providers/data-providers-factory';
import { DataProvidersFactoryProvider } from './data-providers/data-providers-factory-provider';

@NgModule(
    {
        imports: [HttpModule],
        providers: [
            {
                provide: DataProvidersFactory,
                useFactory: (provider: DataProvidersFactoryProvider) => provider.provide(),
                deps: [DataProvidersFactoryProvider]
            },
            DataProvidersFactoryProvider,
        ]
    })

export class DataAccessModule { }