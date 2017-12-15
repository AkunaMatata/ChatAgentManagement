import { Component } from '@angular/core';

@Component({
    selector: 'ciw-agent-card',
    templateUrl: './agent-card.component.html',
    styleUrls: ['./agent-card.component.scss']
})

export class AgentCardComponent {
    public status: string = 'online';
    public agentName: string = 'Name';
    public agentEmail: string = 'Email';
    public id: string = 'user1';
 }