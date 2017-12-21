import { ShortcutsActions } from './shortcuts-actions';
import { ShortcutsInterface } from './shortcuts-interface';

export function shortcutsReducer(state = [], action: any): ShortcutsInterface[] {
    switch (action.type) {
        case ShortcutsActions.LOAD_SHORTCUTS:
            return action.payload;
        case ShortcutsActions.ADD_SHORTCUTS:
            return _.concat(state, action.payload);
        default:
            return state;
    }
};
