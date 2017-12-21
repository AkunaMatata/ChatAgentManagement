import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'my-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    private model: any = {
        userName: '',
        password: ''
    };
    private loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
    }
}
