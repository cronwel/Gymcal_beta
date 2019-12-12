import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { adopt } from 'react-adopt';
import User from '../customer/User';
import CartStyles from '../styles/CartStyles';
import Supreme from '../styles/Supreme';
import CloseButton from '../styles/CloseButton';
import Button from '../styles/Button';
import CartItem from './CartItem';
import calcTotalPrice from '../../lib/calcTotalPrice';
import formatMoney from '../../lib/formatMoney';
import { QUERY_SIGNEDIN_USER } from '../customer/User';
import { sign } from 'crypto';

const QUERY_STATE_LOCAL = gql`
  query {
    cartOpen @client
  }
`;

const MUTATION_CART_TOGGLE = gql`
  mutation {
    toggleCart @client
  }
`;
/* eslint-disable */
const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  toggleCart: ({ render }) => <Mutation mutation={MUTATION_CART_TOGGLE}>{render}</Mutation>,
  localState: ({ render }) => <Query query={QUERY_STATE_LOCAL}>{render}</Query>,
});
/* eslint-enable */

const Cart = () => (
  <Composed>
    {({ user, toggleCart, localState }) => {
      const signedinuser = user.data.signedinuser;
      if (!signedinuser) return null;
      return (
        <CartStyles open={localState.data.cartOpen}>
          <header>
            <CloseButton onClick={toggleCart} title="close">
              &times;
            </CloseButton>
            <Supreme>{signedinuser.name}'s Cart</Supreme>
            <p>
              You Have {signedinuser.cart.length} Item{signedinuser.cart.length === 1 ? '' : 's'} in your cart.
            </p>
          </header>
          <ul>{signedinuser.cart.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />)}</ul>
          <footer>
            <p>{formatMoney(calcTotalPrice(signedinuser.cart))}</p>
            <Button>Checkout</Button>
          </footer>
        </CartStyles>
      );
    }}
  </Composed>
);

export default Cart;
export { QUERY_STATE_LOCAL, MUTATION_CART_TOGGLE };
