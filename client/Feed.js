import {Component} from '@angular/core';
import {Apollo, ApolloQueryPipe} from 'angular2-apollo';
import {client} from './client';

@Component({
    selector: 'feed',
    pipes: [
        ApolloQueryPipe
    ],
    template: `
        <div *ngFor="let entry of data | async | apolloQuery:'feed'">
            <div class="media">
                <div class="media-vote"></div>
            </div>
            <div class="media-left">
                <a href="#">
                    <img
                            class="media-object"
                            style="width: 64px, height: 64px"
                            [src]="entry.repository.owner.avatar_url"
                    />
                </a>
            </div>
            <div class="media-body">
                <h4 class="media-heading">
                    <a [href]="entry.repository.html_url">
                        {{ entry.repository.full_name }}
                    </a>
                </h4>
                <p> {{ entry.repository.description }}</p>
                <p>
                    <span class="label label-info">Stars: {{ entry.repository.stargazers_count }}</span>
                    &nbsp;
                    <span class="label label-info">Issues: {{ entry.repository.open_issues_count }}</span>
                    &nbsp;by&nbsp;
                    <a [href]="entry.postedBy.html_url">{{ entry.postedBy.login }}</a>
                </p>
            </div>
        </div>
    `
})
@Apollo({
    client,
    queries(context) {
        return {
            data: {
                query: gql`
          query Feed($type: FeedType!) {
            # Eventually move this into a no fetch query right on the entry
            # since we literally just need this info to determine whether to
            # show upvote/downvote buttons
            currentUser {
              login
            }
            feed(type: $type) {
              createdAt
              score
              commentCount
              id
              postedBy {
                login
                html_url
              }
              vote {
                vote_value
              }
              repository {
                name
                full_name
                description
                html_url
                stargazers_count
                open_issues_count
                created_at
                owner {
                  avatar_url
                }
              }
            }
          }
        `,
                variables: {
                    type: 'TOP'
                }
            }
        }
    }
})
export class Feed {
}
