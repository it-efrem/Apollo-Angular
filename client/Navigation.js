import {Component} from '@angular/core';

@Component({
    selector: 'navigation',
    template: `
        <nav class="navbar navbar-default">
            <div class="container">
                <div class="navbar-header">
                    <a href="/feed/top" class="navbar-brand">GitRepos</a>
                </div>

                <ul class="nav navbar-nav">
                    <a title="Top" href="/feed/top">Top</a>
                    <a title="New" href="/feed/new">New</a>
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
