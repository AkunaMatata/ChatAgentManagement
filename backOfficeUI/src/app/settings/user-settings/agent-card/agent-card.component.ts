import { Component, Input } from '@angular/core';
import  { UrlConstants } from '../../../shared/constants/url-constants';

@Component({
    selector: 'ciw-agent-card',
    templateUrl: './agent-card.component.html',
    styleUrls: ['./agent-card.component.scss']
})

export class AgentCardComponent {
    public status: string = 'online';
    public get agentName() {
        return this.agentCard ? this.agentCard.Name : ''
    };
    public get agentEmail() {
        return this.agentCard ? this.agentCard.Email : ''
    };
    public get id() {
        return this.agentCard ? this.agentCard.UserId : null;
    }

    public url: string = UrlConstants.DefaultLogo;

    @Input()
    public agentCard: any;
 }