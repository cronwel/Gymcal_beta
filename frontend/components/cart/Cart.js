import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import User from '../customer/User';
import CartStyles from '../styles/CartStyles';
import Supreme from '../styles/Supreme';
import CloseButton from '../styles/CloseButton';
import Button from '../styles/Button';
import CartItem from './CartItem';
import calcTotalPrice from '../../lib/calcTotalPrice';
import formatMoney from '../../lib/formatMoney';



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

  <User>
    {({ data: { signedinuser }}) => {
      if( !signedinuser ) return null;
      return (        
        <Mutation mutation={ MUTATION_CART_TOGGLE } >
          { toggleCart => (
            <Query query={ QUERY_STATE_LOCAL }>
              {({ data }) => (
                <CartStyles open={ data.cartOpen }>
                  <header>
                    <CloseButton onClick={ toggleCart } title="close">&times;</CloseButton>
                    <Supreme>{ signedinuser.name }'s Cart</Supreme>
                    <p>You have { signedinuser.cart.length } item{signedinuser.cart.length === 1 ? '': 's' } in your cart.</p>
                  </header>     
                    <ul>
                      {signedinuser.cart.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />)}
                    </ul>
                  <footer>
                    <p>{formatMoney(calcTotalPrice( signedinuser.cart ))}</p>
                    <Button>Checkout</Button>
                  </footer>
                </CartStyles>
              )}
            </Query>
          )}
        </Mutation>
      );
    }}
  </User>
);

export default Cart;
export { QUERY_STATE_LOCAL, MUTATION_CART_TOGGLE };
