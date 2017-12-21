import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ShortcutSettingsComponent } from './shortcuts-settings.component';
import { ShortcutItem } from './shortcut-item/shortcut-item.component';


@NgModule({
    imports: [
        CommonModule, RouterModule, SharedModule
    ],
    declarations: [
        ShortcutSettingsComponent,
        ShortcutItem
    ],
    exports: [
        ShortcutSettingsComponent,
        ShortcutItem
    ]
})
export class ShortcutsModule { }