import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { UserSettingsModule } from './user-settings/user-settings.module';
import { SharedModule } from '../shared/shared.module';
import { ChatCustomizationComponent } from './chat-customization-settings/chat-customization-settings.component';
import { ChatAssignmentComponent } from './chat-assignment/chat-assignment.component';
import { GeneralSettingsComponent } from './general-settings/general-settings.component';
import { IntegrationSettingsComponent } from './integration-settings/integration-settings.component';
import { ShortcutSettingsComponent } from './shortcuts-settings/shortcuts-settings.component';
import { SubscriptionSettingsComponent } from './subscriptions-settings/subscriptions-settings.component';

import { SettingsRoute } from './settings.route';

@NgModule(
    {
        imports: [
            SettingsRoute,
            RouterModule,
            CommonModule,
            UserSettingsModule,
            BrowserModule,
            SharedModule
        ],
        declarations: [
            SettingsComponent,
            //UserSettingsComponent,
            ChatCustomizationComponent,
            ChatAssignmentComponent,
            GeneralSettingsComponent,
            IntegrationSettingsComponent,
            ShortcutSettingsComponent,
            SubscriptionSettingsComponent
        ],
        exports: [
            SettingsComponent,
            UserSettingsModule,
            ChatCustomizationComponent,
            ChatAssignmentComponent,
            GeneralSettingsComponent,
            IntegrationSettingsComponent,
            ShortcutSettingsComponent,
            SubscriptionSettingsComponent
        ]
    })

export class SettingsModule {}