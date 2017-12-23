import { NgModule } from '@angular/core';
import { ChatAssignmentActionCreator } from './chat-settings/chat-assignment/chat-assignment-action-creator';
import { ShortcutsActionCreator } from './chat-settings/shortcuts/shortcuts-action-creator';
import { UserDetailsActionCreator } from './user-settings/user-details/user-details-action-creator';
import { UserListActionCreator } from './user-settings/user-list/user-list-action-creator';

@NgModule(
    {
        providers: [
            ChatAssignmentActionCreator,
            ShortcutsActionCreator,
            UserDetailsActionCreator,
            UserListActionCreator
        ]
    })

export class SettingsModule { }