import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { AsyncActionInterface } from '../../../async-action-interface';
import { DataProvider } from '../../../../../../infrastructure/data-access/data-providers/data-provider';
import { DataProvidersFactory } from '../../../../../../infrastructure/data-access/data-providers/data-providers-factory';
import { ApiEndpoints } from '../../../../constants/api-endpoints';
import { UserCardInterface } from './user-card-interface';
import { UserListActions } from './user-list-actions';

@Injectable()
export class UserListActionCreator {
    private readonly agentProvider: DataProvider<UserCardInterface>;
    constructor(
        dataProvidersFactory: DataProvidersFactory,
    ) {
        this.agentProvider = dataProvidersFactory.create(ApiEndpoints.AgentDetais);
    }

    public getAgentDetails(status: string): AsyncActionInterface<UserCardInterface[]> {
        return dispatch => this.agentProvider.search('').then(
                agent => dispatch(this.setAgent(agent))
        )
    }

    public saveAgentDetails(agent: UserDetailsInterface) {
        return dispatch => this.agentProvider.update(agent.UserId, agent)
            .then(updated => dispatch(this.setAgent(updated)));
    }

    public createAgent(agent: UserDetailsInterface) {
        return dispatch => this.agentProvider.create(agent);
    }

    public setAgentList(payload: any): Action {
        return {
            type: UserListActions.LOAD_USER_LIST,
            payload: payload
        } as Action;
    }
}