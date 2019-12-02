import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { QUERY_SIGNEDIN_USER } from '../customer/User';

const MUTATION_CART_REMOVE = gql`
  mutation removeFromCart(
    $id: ID!
  ) {
    removeFromCart(
      id: $id
    )
  }
`;

const CartButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${ props.theme.red };
    cursor: pointer;
  }
`

export default class RemoveFromCart extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  update = ( cache, payload ) => {
    const data = cache.readQuery({ query: QUERY_SIGNEDIN_USER } );
    const cartItemId = payload.data.removeFromCart.id;
    data.signedinuser.cart = data.signedinuser.cart.filter(
      cartItem => cartItem.id !== cartItemId
    );
    cache.writeQuery({ query: QUERY_SIGNEDIN_USER, data } );
  };

  render() {
    return (
      <Mutation
        mutation={ MUTATION_CART_REMOVE }
        variables={ { id: this.props.id } }
        update={ this.update }
        optimisticResponse={{
          __typename: 'Mutation',
          removeFromCart: {
            __typename: 'CartItem',
            id: this.props.id,
          },
        }}
      >
        {( removeFromCart, { loading, error } ) => (
          <CartButton
            disabled={ loading }
            onClick={ () => {
              removeFromCart().catch(err => alert(err.message));
            }}
            title="Remove from Cart"
          >
          &times;
          </CartButton>
        )}
      </Mutation>
    );
  }
}

export default RemoveFromCart;
