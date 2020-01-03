import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import User, { QUERY_SIGNEDIN_USER } from '../customer/User';
import Router from 'next/router';
import calcTotalPrice from '../../lib/calcTotalPrice';
import gql from 'graphql-tag';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import DisplayError from '../ErrorMessage';

const MUTATION_ORDER_CREATE = gql`
  mutation createOrder(
    $token: String!
  ) {
    createOrder(
      token: $token
    ) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;

function totalItems(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

class Purchase extends React.Component {
  onToken = async (res, createOrder ) => {
    NProgress.start();
    const order = await createOrder({
      variables: {
        token: res.id,
      },
    }).catch(err => {
      alert(err.message);
    });
    Router.push({
      pathname: '/order',
      query: { id: order.data.createOrder.id },
    });
  };
  render() {
    return (
      <User>
        {({ data: { signedinuser}, loading}) => {
          if ( loading ) return null;
          return (
          <Mutation
            mutation={MUTATION_ORDER_CREATE}
            refetchQueries={[{ query: QUERY_SIGNEDIN_USER }]}
          >
            {createOrder => (
            <StripeCheckout
              amount={calcTotalPrice(signedinuser.cart)}
              name="Gymcal"
              description={`Order of ${totalItems(signedinuser.cart)} items!`}
              image={signedinuser.cart.length && signedinuser.cart[0].item.title}
              stripeKey="pk_test_icttM6b2DyZDNw31MZTSl43A"
              currency="USD"
              email={signedinuser.email}
              token={res => this.onToken(res, createOrder)}
            >
              {this.props.children}
            </StripeCheckout>
            )}
        </Mutation>
          );
        }}
      </User>
    );
  }
}

export default Purchase;
export { MUTATION_ORDER_CREATE };