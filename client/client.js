import ApolloClient, {createNetworkInterface} from 'apollo-client';
import {addTypenameToSelectionSet} from 'apollo-client/queries/queryTransform';
import {registerGqlTag} from 'apollo-client/gql';
// Polyfill fetch
import 'whatwg-fetch';

// Globally register gql template literal tag
registerGqlTag();

export const client = new ApolloClient({
    networkInterface: createNetworkInterface('/graphql', {
        credentials: 'same-origin',
    }),
    queryTransformer: addTypenameToSelectionSet,
    dataIdFromObject: (result) => {
        if (result.id && result.__typename) {
            return result.__typename + result.id;
        }
        return null;
    },
});
