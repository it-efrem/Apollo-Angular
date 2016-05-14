import {Component} from '@angular/core';

import {RouterLink} from '@angular/router-deprecated';

@Component({
    selector: 'navigation',
    directives: [
        RouterLink
    ],
    template: `
        <nav class="navbar navbar-default">
            <div class="container">
                <div class="navbar-header">
                    <a [routerLink]="['Index']" class="navbar-brand">GitRepos</a>
                </div>

                <ul class="nav navbar-nav">
                    <li>
                        <a title="Top" [routerLink]="['Feed', {
            type: 'top'
          }]">Top</a>
                    </li>
                    <li>
                        <a title="New" [routerLink]="['Feed', {
            type: 'new'
          }]">New</a>
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
}
