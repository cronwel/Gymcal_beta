import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { QUERY_SIGNEDIN_USER } from '../customer/User';
import styled from 'styled-components';

const AddButton = styled.button`
  font-family: 'Courier New', Courier, monospace;
  /* color: blue; */
`;


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
        variables={{ id, }}
        refetchQueries={[{ query: QUERY_SIGNEDIN_USER }]}
      >
      {(addToCart, {loading}) => (
        <AddButton disabled={loading} onClick={addToCart}>
          Add{loading && 'ing'} To Cart 
        </AddButton>
      )}
      </Mutation>
    );
  }
}

export default AddToCart;
export { MUTATION_CART_ADD };