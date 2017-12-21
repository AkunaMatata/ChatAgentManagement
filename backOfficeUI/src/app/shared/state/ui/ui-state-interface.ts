import { UserSettings } from './settings/user-settings/user-settings';

export interface UiStateInterface {
    userSettings?: UserSettings;
    editMode?: boolean;
}
