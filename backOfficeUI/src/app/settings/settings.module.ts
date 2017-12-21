import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { UserSettingsModule } from './user-settings/user-settings.module';
import { ShortcutsModule } from './shortcuts-settings/shortcuts.module';
import { SharedModule } from '../shared/shared.module';
import { ChatCustomizationComponent } from './chat-customization-settings/chat-customization-settings.component';
import { ChatAssignmentComponent } from './chat-assignment/chat-assignment.component';
import { GeneralSettingsComponent } from './general-settings/general-settings.component';
import { IntegrationSettingsComponent } from './integration-settings/integration-settings.component';
import { ShortcutSettingsComponent } from './shortcuts-settings/shortcuts-settings.component';
import { SubscriptionSettingsComponent } from './subscriptions-settings/subscriptions-settings.component';
import { RadiobuttonModule } from '../../controls/radiobutton/radiobutton.module';
import { SettingsRoute } from './settings.route';
import { DataAccessModule } from '../../infrastructure/data-access/data-access.module';

@NgModule(
    {
        imports: [
            SettingsRoute,
            RouterModule,
            FormsModule,
            CommonModule,
            UserSettingsModule,
            ShortcutsModule,
            BrowserModule,
            SharedModule,
            DataAccessModule,
            RadiobuttonModule
        ],
        declarations: [
            SettingsComponent,
            ChatCustomizationComponent,
            ChatAssignmentComponent,
            GeneralSettingsComponent,
            IntegrationSettingsComponent,
            SubscriptionSettingsComponent
        ],
        exports: [
            SettingsComponent,
            UserSettingsModule,
            ShortcutsModule,
            ChatCustomizationComponent,
            ChatAssignmentComponent,
            GeneralSettingsComponent,
            IntegrationSettingsComponent,
            ShortcutSettingsComponent,
            SubscriptionSettingsComponent
        ]
    })

export class SettingsModule {}