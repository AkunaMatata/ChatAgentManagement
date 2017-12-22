import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ShortcutSettingsComponent } from './shortcuts-settings.component';
import { ShortcutItemComponent } from './shortcut-item/shortcut-item.component';
import { ShortcutAddComponent } from './shortcut-add/shortcut-add.component';


@NgModule({
    imports: [
        CommonModule, RouterModule, SharedModule
    ],
    declarations: [
        ShortcutSettingsComponent,
        ShortcutItemComponent,
        ShortcutAddComponent
    ],
    exports: [
        ShortcutSettingsComponent,
        ShortcutAddComponent,
        ShortcutItemComponent
    ]
})
export class ShortcutsModule { }