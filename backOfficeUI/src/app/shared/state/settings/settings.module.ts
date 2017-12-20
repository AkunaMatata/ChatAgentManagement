import { NgModule } from '@angular/core';
import { ChatAssignmentActionCreator } from './chat-settings/chat-assignment/chat-assignment-action-creator';
import { ShortcutsActionCreator } from './chat-settings/shortcuts/shortcuts-action-creator';

@NgModule(
    {
        providers: [
            ChatAssignmentActionCreator,
            ShortcutsActionCreator
        ]
    })

export class SettingsModule { }