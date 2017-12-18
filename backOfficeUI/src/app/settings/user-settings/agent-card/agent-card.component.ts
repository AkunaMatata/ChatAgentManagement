import { Component, Input, OnInit } from '@angular/core';
import  { UrlConstants } from '../../../shared/constants/url-constants';

@Component({
    selector: 'ciw-agent-card',
    templateUrl: './agent-card.component.html',
    styleUrls: ['./agent-card.component.scss']
})

export class AgentCardComponent implements OnInit{
    public status: string = 'online';
    public get agentName() {
        return this.agentCard ? this.agentCard.FirstName : 'Name'
    };
    public get agentEmail() {
        return this.agentCard ? this.agentCard.Email : 'email'
    };
    public id: string = 'user1';
    public ie: string = '';
    public url: string = UrlConstants.DefaultLogo;

    @Input()
    public agentCard: any;

    constructor() {
    }

    public ngOnInit () {
    }
 }