import { NgModule, NgZone } from '@angular/core';
import { Store } from './store';
import { NgReduxModule } from '@angular-redux/store';

import { UiStateModule } from './ui/ui-state.module';
import { SettingsModule } from './settings/settings.module';


@NgModule(
    {
        imports: [NgReduxModule],
        exports: [
            UiStateModule,
            SettingsModule
        ],
        providers: [
            {
                provide: Store, useFactory: (ngZone: NgZone) => new Store(ngZone), deps: [NgZone]
            }
        ]
    })

export class SharedStateModule { }
