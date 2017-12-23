import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ShortcutSettingsComponent } from './shortcuts-settings.component';
import { ShortcutItemComponent } from './shortcut-item/shortcut-item.component';
import { ShortcutAddComponent } from './shortcut-add/shortcut-add.component';
import { ShortcutControlComponent } from './shortcut-control/shortcut-control.component';


@NgModule({
    imports: [
        CommonModule, RouterModule, SharedModule, FormsModule
    ],
    declarations: [
        ShortcutSettingsComponent,
        ShortcutItemComponent,
        ShortcutAddComponent,
        ShortcutControlComponent
    ],
    exports: [
        ShortcutSettingsComponent,
        ShortcutAddComponent,
        ShortcutItemComponent,
        ShortcutControlComponent
    ]
})
export class ShortcutsModule { }