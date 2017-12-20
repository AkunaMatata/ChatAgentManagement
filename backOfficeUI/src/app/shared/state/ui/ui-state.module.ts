import { NgModule } from '@angular/core';
import { EditActionCreator } from './settings/shared/edit-action-creator';
import { EditModeResolver } from '../../services/editmodeResolver';

@NgModule({
    providers: [
        EditActionCreator,
        EditModeResolver
    ]
})

export class UiStateModule {}