import {Component} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {Apollo} from 'angular2-apollo';
import gql from 'apollo-client/gql';
import {client} from './client.ts';

export interface NewEntry {
    submitRepository(repoFullName: string): Promise<any>
};

@Component({
    selector: 'new-entry',
    template: `
        <div>
            <h1>Submit a repository</h1>

            <form (ngSubmit)="_submitForm(name.value)" #submitForm="ngForm">
                <div class="form-group">
                    <label for="exampleInputEmail1">
                        Repository name
                    </label>

                    <input
                            type="text"
                            class="form-control"
                            id="exampleInputEmail1"
                            placeholder="apollostack/GitRepos"
                            ngControl="repoFullName"
                            #name="ngForm"
                    />
                </div>

                <div *ngIf="error" class="alert alert-danger" role="alert">
                    {{ error }}
                </div>

                <button type="submit" class="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    `
})
@Apollo({
    client,
    mutations(context) {
        return {
            submitRepository: (repoFullName) => ({
                mutation: gql`
          mutation submitRepository($repoFullName: String!) {
            submitRepository(repoFullName: $repoFullName) {
              createdAt
            }
          }
        `,
                variables: {
                    repoFullName,
                },
            }),
        };
    }
})
export class NewEntry {
    error: string;

    constructor(private router: Router) {
    }

    _submitForm(repoFullName: string): void {
        this.error = null;
        this.submitRepository(repoFullName).then(({data, errors}) => {
            if (errors) {
                this.error = errors[0].message;
            } else {
                this.router.navigate(['Feed', {type: 'new'}]);
            }
        });
    }
}
