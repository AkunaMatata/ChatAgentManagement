import { User } from './user/user';
import { Settings } from './settings/settings';
import { UiStateInterface } from './ui/ui-state-interface';

export interface RootStateInterface {
    currentUser?: User;
    settings?: Settings;
    ui?: UiStateInterface;
}
