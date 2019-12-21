import Link from 'next/link';
import { Mutation } from 'react-apollo';
import { MUTATION_CART_TOGGLE } from './cart/Cart';
import NavStyles from './styles/NavStyles';
import User from './customer/User';
import CartCount from './cart/CartCount';
import Signout from '../components/customer/Signout';
import LogoMain from '../components/LogoMain';


const Nav = () => (
  <User>
  {({ data: { signedinuser }}) => (
    <NavStyles>
      <LogoMain />
      <Link href="/items"><a>Items</a></Link>
      {signedinuser && (
        <>
        <Link href="/orders"><a>Orders</a></Link>
        {signedinuser.permissions.includes("ADMIN") && (
        <Link href="/sell"><a>Sell</a></Link>
        )}
        <Link href="/signedinuser"><a>Account</a></Link>
        <Signout />
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
      {!signedinuser && (
        <Link href="/auth/signup"><a>Signup</a></Link>
      )}
    </NavStyles>
  )}
  </User>
);

export default Nav;