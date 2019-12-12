import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint, prodEndpoint } from '../config';
import { QUERY_STATE_LOCAL } from '../components/cart/Cart';


function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
    clientState: {
      resolvers: {
        Mutation: {
          toggleCart(_, variables, {cache} ) {
            const { cartOpen } = cache.readQuery({
              query: QUERY_STATE_LOCAL,
            });
            const data = {
              data: { cartOpen: !cartOpen },
            };
            cache.writeData( data );
            return data;
          },
        },
      },
      defaults: {
        cartOpen: false,
      },
    },
  });
}

export default withApollo(createClient);
