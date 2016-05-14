import ApolloClient, {createNetworkInterface} from 'apollo-client';
import {addTypenameToSelectionSet} from 'apollo-client/queries/queryTransform';
// Polyfill fetch
import 'whatwg-fetch';

interface Result {
    id?: string;
    __typename?: string;
}

export const client = new ApolloClient({
    networkInterface: createNetworkInterface('/graphql', {
        credentials: 'same-origin',
    }),
    queryTransformer: addTypenameToSelectionSet,
    dataIdFromObject: (result: Result) => {
        if (result.id && result.__typename) {
            return result.__typename + result.id;
        }
        return null;
    },
});
