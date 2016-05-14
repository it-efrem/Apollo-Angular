import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';
import {Apollo, ApolloQueryPipe} from 'angular2-apollo';
import {TimeAgoPipe} from 'angular2-moment';
import {client} from './client.ts';
import gql from 'apollo-client/gql';
import {EmojifyPipe} from './pipes.ts';

@Component({
    selector: 'loading',
    template: `
        <div>Loading...</div>
    `
})
class Loading {
}

@Component({
    selector: 'info-label',
    template: `
        <span class="label label-info">{{ label }}: {{ value }}</span>
    `
})
class InfoLabel {
    @Input() label;
    @Input() value;
}


@Component({
    selector: 'vote-buttons',
    template: `
        <span>
      <button
              class="btn btn-score"
              [ngClass]="{active: vote.vote_value === 1}"
              (click)="voteUp()">
        <span class="glyphicon glyphicon-triangle-top" aria-hidden="true"></span>
      </button>
      <div class="vote-score">{{ score }}</div>
      <button
              class="btn btn-score"
              [ngClass]="{active: vote.vote_value === -1}"
              (click)="voteDown()">
        <span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
      </button>
      &nbsp;
    </span>
    `
})
class VoteButtons {
    @Input() canVote: boolean;
    @Input() score: number;
    @Input() vote: Object;
    @Output() onVote: EventEmitter<string> = new EventEmitter();

    public voteUp(): void {
        this.submitVote('UP');
    }

    public voteDown(): void {
        this.submitVote('DOWN');
    }

    private submitVote(type: string): void {
        if (this.canVote === true) {
            this.onVote.emit(type);
        }
    }
}

interface onVoteEvent {
    repoFullName: string;
    type: string;
}

@Component({
    selector: 'feed-entry',
    directives: [
        InfoLabel,
        VoteButtons
    ],
    pipes: [
        EmojifyPipe,
        TimeAgoPipe
    ],
    template: `
        <div class="media">
            <div class="media-vote">
                <vote-buttons
                        [score]="entry.score"
                        [vote]="entry.vote"
                        [canVote]="true"
                        (onVote)="onButtonVote($event)">
                </vote-buttons>
            </div>
            <div class="media-left">
                <a href="#">
                    <img
                            class="media-object"
                            style="width: 64px; height: 64px"
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
                <p> {{ entry.repository.description | emojify }}</p>
                <p>
                    <info-label
                            label="Stars"
                            [value]="entry.repository.stargazers_count">
                    </info-label>
                    &nbsp;
                    <info-label
                            label="Issues"
                            [value]="entry.repository.open_issues_count">
                    </info-label>
                    &nbsp;&nbsp;&nbsp;
                    Submitted {{ entry.createdAt | amTimeAgo }}
                    &nbsp;by&nbsp;
                    <a [href]="entry.postedBy.html_url">{{ entry.postedBy.login }}</a>
                </p>
            </div>
        </div>
    `
})
class FeedEntry {
    @Input() entry;
    @Output() onVote: EventEmitter<onVoteEvent> = new EventEmitter();

    onButtonVote(type: string): void {
        this.onVote.emit({
            repoFullName: this.entry.repository.full_name,
            type,
        });
    }
}

export interface Feed {
    data: any;

    vote(repoFullName: string, type: string): Promise<any>;
}

@Component({
    selector: 'feed',
    pipes: [
        ApolloQueryPipe
    ],
    directives: [
        FeedEntry
    ],
    template: `
        <feed-entry
                *ngFor="let entry of feed | async | apolloQuery:'feed'"
                [entry]="entry"
                (onVote)="onVote($event)">
        </feed-entry>
    `
})
@Apollo({
    client,
    queries(context: any) {
        return {
            feed: {
                query: gql`
          query Feed($type: FeedType!) {
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
                    type: context.type ? context.type.toUpperCase() : 'TOP'
                }
            }
        }
    },
    mutations(context) {
        return {
            vote: (repoFullName, type) => ({
                mutation: gql`
          mutation vote($repoFullName: String!, $type: VoteType!) {
            vote(repoFullName: $repoFullName, type: $type) {
              score
              id
              vote {
                vote_value
              }
            }
          }
        `,
                variables: {
                    repoFullName,
                    type,
                },
            })
        };
    }
})
export class Feed {
    type: string;

    constructor(params: RouteParams) {
        this.type = params.get('type');
    }

    public onVote(event: onVoteEvent): void {
        this.vote(event.repoFullName, event.type).then((result: any) => {
            console.log('done', result);
        }).catch((error) => {
            console.log('error', error);
        });
    }
}
