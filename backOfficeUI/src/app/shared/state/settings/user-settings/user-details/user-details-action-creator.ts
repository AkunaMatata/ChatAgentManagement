import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { AsyncActionInterface } from '../../../async-action-interface';
import { DataProvider } from '../../../../../../infrastructure/data-access/data-providers/data-provider';
import { DataProvidersFactory } from '../../../../../../infrastructure/data-access/data-providers/data-providers-factory';
import { ApiEndpoints } from '../../../../constants/api-endpoints';
import { UserDetailsInterface } from './user-details-interface';
import { UserDetailsActions } from './user-details-actions';

@Injectable()
export class UserDetailsActionCreator {
    private readonly agentProvider: DataProvider<UserDetailsInterface>;
    constructor(
        dataProvidersFactory: DataProvidersFactory,
    ) {
        this.agentProvider = dataProvidersFactory.create(ApiEndpoints.AgentDetais);
    }

    public getAgentDetails(id: number): AsyncActionInterface<UserDetailsInterface> {
        return dispatch => this.agentProvider.get(id).then(
                agent => dispatch(this.setAgent(agent))
        )
    }

    public saveAgentDetails(agent: UserDetailsInterface) {
        return dispatch => this.agentProvider.update(agent.UserId, agent)
            .then(updated => this.setAgent(updated));
    }

    public createAgent(agent: UserDetailsInterface) {
        return dispatch => this.agentProvider.create(agent)
            .then(createdAgent => dispatch(this.setAgent(createdAgent)));
    }

    public setAgent(payload: any): Action {
        return {
            type: UserDetailsActions.LOAD_USER_DETAIL,
            payload: payload
        } as Action;
    }
}