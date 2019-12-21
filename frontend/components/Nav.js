import Link from 'next/link';
import { Mutation } from 'react-apollo';
import { MUTATION_CART_TOGGLE } from './cart/Cart';
import NavStyles from './styles/NavStyles';
import User from './customer/User';
import CartCount from './cart/CartCount';
import Signout from '../components/customer/Signout';
import LogoMain from '../components/LogoMain';
import styled from 'styled-components';

const Logo = styled.h1`
  font-size: 3rem;
  margin-left: 2rem;
  position: left;
  z-index: 2;
  a {
    // padding: 0.5rem 1rem;
    background: ${props => props.theme.blue };
    color: white;
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

      <LogoMain />

      <Logo>
        <Link href="/" className="gymcal-link"><a>GymCal</a></Link>
      </Logo>
      
      <Link href="/items"><a>Items</a></Link>
      
      {signedinuser && (
        <>
        <Link href="/orders"><a>Orders</a></Link>

        {signedinuser.permissions.includes("ADMIN") && (
        <Link href="/sell"><a>Sell</a></Link>
        )}

        <Link href="/signedinuser"><a>Account</a></Link>

        <Signout />
        
        {!signedinuser && (
        <Link href="/auth/signup"><a>Signup</a></Link>
        )}
        
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
    </NavStyles>
  )}
  </User>
);

export default Nav;