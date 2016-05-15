import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router-deprecated';

@Component({
    selector: 'navigation',
    directives: [
        RouterLink
    ],
    template: `
        <nav class="navbar navbar-default">
            <div class="container">
                <div class="navbar-header">
                    <a [routerLink]="['Feed', { type: 'top' }]" class="navbar-brand">GitRepos</a>
                </div>

                <ul class="nav navbar-nav">
                    <li
                            [class.active]="router.isRouteActive(
            router.generate(['/Feed', { type: 'top' }])
          )">
                        <a
                                title="Top"
                                [routerLink]="['Feed', { type: 'top' }]">
                            Top
                        </a>
                    </li>
                    <li
                            [class.active]="router.isRouteActive(
            router.generate(['/Feed', { type: 'new' }])
          )">
                        <a
                                title="New"
                                [routerLink]="['Feed', { type: 'new' }]">
                            New
                        </a>
                    </li>
                </ul>

                <p class="navbar-text navbar-right">
                    <a href="/login/github">Log in with GitHub</a>
                </p>
            </div>
        </nav>
    `
})
export class Navigation {
    constructor(public router: Router) {
    }
}
