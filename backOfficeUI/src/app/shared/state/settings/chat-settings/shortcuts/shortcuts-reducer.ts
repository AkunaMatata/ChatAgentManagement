import { ShortcutsActions } from './shortcuts-actions';
import { ShortcutsInterface } from './shortcuts-interface';

export function shortcutsReducer(state = [], action: any): ShortcutsInterface[] {
    switch (action.type) {
        case ShortcutsActions.LOAD_SHORTCUTS:
            return action.payload;
        case ShortcutsActions.ADD_SHORTCUTS:
            return _.concat(state, action.payload);
        case ShortcutsActions.EDIT_SHORTCUTS:
            return editShortcut(state, action.payload);
        case ShortcutsActions.REMOVE_SHORTCUTS:
            return _.filter(state, x => x.ShortcutId !== action.payload.ShortcutId);
        default:
            return state;
    }
};

function editShortcut(state: ShortcutsInterface[], shortcut: ShortcutsInterface): ShortcutsInterface[] {
    let unchanged = _.filter(state, x => x.ShortcutId !== shortcut.ShortcutId);
    return _.concat(unchanged, shortcut);

}