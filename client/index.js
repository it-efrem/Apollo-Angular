import 'reflect-metadata';
import 'zone.js/dist/zone';

import {Component} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {Feed} from './Feed';
import {Navigation} from './Navigation';

import './style.css';

@Component({
    selector: 'git-repos',
    directives: [
        Feed,
        Navigation
    ],
    template: `
        <div>
            <navigation></navigation>
            <div class="container">
                <feed></feed>
            </div>
        </div>
    `
})
class GitRepos {
}

bootstrap(GitRepos);