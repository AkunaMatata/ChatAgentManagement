import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { AsyncActionInterface } from '../../../async-action-interface';
import { DataProvider } from '../../../../../../infrastructure/data-access/data-providers/data-provider';
import { DataProvidersFactory } from '../../../../../../infrastructure/data-access/data-providers/data-providers-factory';
import { ApiEndpoints } from '../../../../constants/api-endpoints';
import { ShortcutsInterface } from './shortcuts-interface';
import { ShortcutsActions } from './shortcuts-actions';

@Injectable()
export class ShortcutsActionCreator {
    private readonly shortcutsProvider: DataProvider<ShortcutsInterface>;
    constructor(
        dataProvidersFactory: DataProvidersFactory,
    ) {
        this.shortcutsProvider = dataProvidersFactory.create(ApiEndpoints.ChatAssignment);
    }

    public loadShortcuts() {
        return dispatch => this.shortcutsProvider.fetch().then(
                assignment => dispatch(this.setShortcuts(assignment))
        )
    }

    public setShortcuts(payload: any): Action {
        return {
            type: ShortcutsActions.LOAD_SHORTCUTS,
            payload: payload
        } as Action;
    }

    public addShortcuts(payload: any): Action {
        return {
            type: ShortcutsActions.ADD_SHORTCUTS,
            payload: payload
        } as Action;
    }
};
