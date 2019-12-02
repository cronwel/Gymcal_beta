import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import CartStyles from '../styles/CartStyles';
import Supreme from '../styles/Supreme';
import CloseButton from '../styles/CloseButton';
import Button from '../styles/Button';

const QUERY_STATE_LOCAL = gql`
  query queryState {
    cartOpen @client
  }
`;

const MUTATION_CART_TOGGLE = gql`
  mutation cartToggle {
    toggleCart @client
  }
`;

const Cart = () => (
  <Mutation mutation={ MUTATION_CART_TOGGLE } >
    { toggleCart => (
      <Query query={ QUERY_STATE_LOCAL }>
        { ( { data } ) => (
          <CartStyles open={ data.cartOpen }>
            <header>
              <CloseButton onClick={ toggleCart } title="close">
                &times;
              </CloseButton>
              <Supreme>Your Cart</Supreme>
              <p>You have x items in your cart</p>
            </header>

            <footer>
              <p>$10.00
                <Button>
                  Checkout
                </Button>
              </p>
            </footer>
          </CartStyles>
        )}
      </Query>
    )}
  </Mutation>
);

export default Cart;
export { QUERY_STATE_LOCAL, MUTATION_CART_TOGGLE };
