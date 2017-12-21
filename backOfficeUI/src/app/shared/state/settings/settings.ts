import { ChatSettings } from './chat-settings/chat-settings';
import { UserSettings } from './user-settings/user-settings';

export interface Settings {
    userSettings: UserSettings;
    chatSettings: ChatSettings;
};
