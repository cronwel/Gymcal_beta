import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { QUERY_SIGNEDIN_USER } from '../customer/User';

const MUTATION_CART_ADD = gql`
  mutation addToCart( 
    $id: ID!
  ) {
    addToCart(
      id: $id
    ) {
      id
      quantity
    }
  }
`;

class AddToCart extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <Mutation
        mutation={ MUTATION_CART_ADD }
        variables={{
          id,
        }}
        refetchQueries={[{
          query: QUERY_SIGNEDIN_USER
        }]}
      >
        { ( addToCart, { loading } ) => (
          <button disabled={ loading } onClick={ addToCart }>
            Add{ loading && 'ing' } To Cart 
          </button>
        )}
      </Mutation>
    );
  }
}

export default AddToCart;