import { Component, OnInit } from '@angular/core';
import { UserDetailsActionCreator } from '../../../shared/state/settings/user-settings/user-details/user-details-action-creator';
import { UserListActionCreator } from '../../../shared/state/settings/user-settings/user-list/user-list-action-creator';
import { AgentStatus } from '../../../shared/constants/agent-status';
import { Store } from '../../../shared/state/store';
import { RootStateInterface } from '../../../shared/state/root-state-interface';

@Component({
    selector: 'ciw-agent-panel',
    templateUrl: './agent-panel.component.html',
    styleUrls: ['./agent-panel.component.scss'],
})

export class AgentPanelComponent implements OnInit {
    private readonly userListActionCreator: UserListActionCreator;
    private readonly store: Store<RootStateInterface>;

    public totalCount: number = 5;
    public availableCount: number = 3;
    public busyCount: number = 1;
    public offlineCount: number = 1;

    public agentStatuses = AgentStatus;

    private currentStatus: AgentStatus = AgentStatus.All;

    constructor(
        userListActionCreator: UserListActionCreator,
        store: Store<RootStateInterface>,
        userActionCreator: UserDetailsActionCreator ) {
        this.store = store;
        this.userListActionCreator = userListActionCreator;
    }

    public ngOnInit(): void {
        this.store.dispatchAsync(this.userListActionCreator.getAgentList(AgentStatus.All));
    }

    public setStatus(newStatus: AgentStatus): void {
        if (this.currentStatus === newStatus) {
            return;
        }
        this.currentStatus = newStatus;
        this.store.dispatchAsync(this.userListActionCreator.getAgentList(newStatus));
    }
}