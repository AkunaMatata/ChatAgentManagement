import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { ChatCustomizationComponent } from './chat-customization-settings/chat-customization-settings.component';
import { ChatAssignmentComponent } from './chat-assignment/chat-assignment.component';
import { GeneralSettingsComponent } from './general-settings/general-settings.component';
import { IntegrationSettingsComponent } from './integration-settings/integration-settings.component';
import { ShortcutSettingsComponent } from './shortcuts-settings/shortcuts-settings.component';
import { SubscriptionSettingsComponent } from './subscriptions-settings/subscriptions-settings.component';
import { UserDetailsComponent } from './user-settings/user-details/user-details.component';
import { AddUserComponent } from './user-settings/add-user/add-user.component';

const routes: Routes = [
    {
        path: 'settings',
        component: SettingsComponent,
        children: [
            { path: '', redirectTo: 'users', pathMatch:'full' },
            { 
                path: 'users',
                component: UserSettingsComponent,
                children: [
                    { path: 'add-user', component: AddUserComponent },
                    { path: 'user-details/:id', component: UserDetailsComponent },
                ]
         },
            { path: 'chat-customization', component: ChatCustomizationComponent },
            { path: 'chat-assignment', component: ChatAssignmentComponent },
            { path: 'general', component: GeneralSettingsComponent },
            { path: 'shortcuts', component: ShortcutSettingsComponent },
            { path: 'integration', component: IntegrationSettingsComponent },
            { path: 'subscription', component: SubscriptionSettingsComponent },
            // { path: 'add-user', component: AddUserComponent },
            // { path: 'user-details', component: UserDetailsComponent },
        ]
    }
];

export const SettingsRoute = RouterModule.forRoot(routes);