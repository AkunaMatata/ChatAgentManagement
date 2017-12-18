import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { UserSettingsComponent } from './user-settings.component';
import { AgentCardComponent } from './agent-card/agent-card.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AgentPanelComponent } from './agent-panel/agent-panel.component';


@NgModule({
    imports: [
        CommonModule, RouterModule, SharedModule
    ],
    declarations: [
        UserSettingsComponent,
        AgentCardComponent,
        UserDetailsComponent,
        AddUserComponent,
        AgentPanelComponent
    ],
    exports: [
        UserSettingsComponent,
        AgentCardComponent,
        UserDetailsComponent,
        AddUserComponent,
        AgentPanelComponent
    ]
})
export class UserSettingsModule { }