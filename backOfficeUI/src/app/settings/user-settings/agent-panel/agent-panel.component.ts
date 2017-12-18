import { Component } from '@angular/core';

@Component({
    selector: 'ciw-agent-panel',
    templateUrl: './agent-panel.component.html',
    styleUrls: ['./agent-panel.component.scss'],
})

export class AgentPanelComponent {
    public totalCount: number = 5;
    public availableCount: number = 3;
    public busyCount: number = 1;
    public offlineCount: number = 1;

}