import { NgModule, NgZone } from '@angular/core';
import { Store } from './store';
import { NgReduxModule } from '@angular-redux/store';

import { UiStateModule } from './ui/ui-state.module';


@NgModule(
    {
        imports: [NgReduxModule],
        exports: [
            UiStateModule
        ],
        providers: [
            {
                provide: Store, useFactory: (ngZone: NgZone) => new Store(ngZone), deps: [NgZone]
            }
        ]
    })

export class SharedStateModule { }
