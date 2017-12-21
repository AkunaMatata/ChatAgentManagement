import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { EditActions } from './edit-actions';

@Injectable()
export class EditActionCreator {

    public setEditMode(payload: any): Action {
        return {
            type: EditActions.SET_EDIT_MODE,
            payload: payload
        } as Action;
    }
};
