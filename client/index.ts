import 'reflect-metadata';
import 'zone.js/dist/zone';

import {Component} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {RouteConfig, ROUTER_PROVIDERS, RouterOutlet} from '@angular/router-deprecated';
import {Feed} from './Feed.ts';
import {Navigation} from './Navigation.ts';
import {NewEntry} from './NewEntry.ts';

import './style.css';

@Component({
    selector: 'git-repos',
    directives: [
        Navigation,
        RouterOutlet
    ],
    template: `
        <div>
            <navigation></navigation>
            <div class="container">
                <router-outlet></router-outlet>
            </div>
        </div>
    `
})
@RouteConfig([
    {path: '/', as: 'Index', redirectTo: ['Feed', {type: 'TOP'}]},
    {path: '/feed/:type', as: 'Feed', component: Feed},
    {path: '/submit', as: 'NewEntry', component: NewEntry}
])
class GitRepos {
}

bootstrap(GitRepos, [
    ROUTER_PROVIDERS
]);
