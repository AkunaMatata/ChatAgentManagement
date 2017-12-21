import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { UserSettingsComponent } from './user-settings.component';
import { AgentCardComponent } from './agent-card/agent-card.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AgentPanelComponent } from './agent-panel/agent-panel.component';
import { RadiobuttonModule } from '../../../controls/radiobutton/radiobutton.module';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RadiobuttonModule
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