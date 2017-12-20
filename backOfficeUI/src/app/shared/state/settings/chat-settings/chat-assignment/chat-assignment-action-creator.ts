import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { AsyncActionInterface } from '../../../async-action-interface';
import { DataProvider } from '../../../../../../infrastructure/data-access/data-providers/data-provider';
import { DataProvidersFactory } from '../../../../../../infrastructure/data-access/data-providers/data-providers-factory';
import { ApiEndpoints } from '../../../../constants/api-endpoints';
import { ChatAssignmentInterface } from './chat-assignment-interface';
import { ChatAssignmentActions } from './chat-assignment-actions';

@Injectable()
export class ChatAssignmentActionCreator {
    private readonly chatAssignmentProvider: DataProvider<ChatAssignmentInterface>;
    constructor(
        dataProvidersFactory: DataProvidersFactory,
    ) {
        this.chatAssignmentProvider = dataProvidersFactory.create(ApiEndpoints.ChatAssignment);
    }

    public loadAssignments() {
        return dispatch => this.chatAssignmentProvider.fetch().then(
                assignment => dispatch(this.setAssignment(assignment))
        )
    }

    public setAssignment(payload: any): Action {
        return {
            type: ChatAssignmentActions.SET_MODE,
            payload: payload
        } as Action;
    }
}
