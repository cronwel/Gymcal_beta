import Link from 'next/link';
import { Mutation } from 'react-apollo';
import { MUTATION_CART_TOGGLE } from '../cart/Cart';
import NavStyles from '../styles/NavStyles';
import User from '../customer/User';
import CartCount from '../cart/CartCount';
import Signout from '../customer/Signout';
import LogoMain from './LogoMain';
import styled from 'styled-components';

const Gymcal = styled.h1`
  font-size: 3rem;
  z-index: 2;
  a {
    padding: 0.5rem 1rem;
    background: white;
    color: ${props => props.theme.blue };
    text-transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

const Nav = () => (
  <User>
  {({ data: { signedinuser }}) => (
    <NavStyles>
      <div className="logo">
        <LogoMain href="/" className="gymcal-link"/>
      </div>
      <div>
        <Gymcal>
          <Link href="/" className="gymcal-link"><a>GymCal</a></Link>
        </Gymcal>
      </div>
      <ul>
      <li>
        <Link href="/items"><a>Items</a></Link>
      </li>
      {signedinuser && (
        <>
        <li>
          <Link href="/orders"><a>Orders</a></Link>
        </li>
        <li>
          {signedinuser.permissions.includes("ADMIN") && (
          <Link href="/sell"><a>Sell</a></Link>
          )}
        </li>
        <li>
          <Link href="/signedinuser"><a>Account</a></Link>
        </li>
        <li>
          <Signout />
        </li>
        <li>
          {!signedinuser && (
            <Link href="/signup"><a>Signup</a></Link>
          )}
          </li>
        
        <Mutation mutation={ MUTATION_CART_TOGGLE}>
          { ( toggleCart ) => (
            <button onClick={ toggleCart }>
              My Cart
              <CartCount count={ signedinuser.cart.reduce( (tally, cartItem) => tally + cartItem.quantity, 0 ) }>
              </CartCount>
            </button>
          ) }
        </Mutation>
        </>
      )}
      </ul>
    </NavStyles>
  )}
  </User>
);

export default Nav;