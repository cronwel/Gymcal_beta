import Link from 'next/link';
import { Mutation } from 'react-apollo';
import { MUTATION_CART_TOGGLE } from './cart/Cart';
import NavStyles from './styles/NavStyles';
import User from './customer/User';
import Signout from '../components/customer/Signout';

const Nav = () => (
  <User>
  { ( { data: { signedinuser } } ) => (


    <NavStyles>
      
      <Link href="/items"><a>Items</a></Link>

      {signedinuser && (
        <>

        <Link href="/sell"><a>Sell</a></Link>

        <Link href="/orders"><a>Orders</a></Link>

        <Link href="/signedinuser"><a>Account</a></Link>

        <Signout />

        </>
      )}
      {!signedinuser && (
        <Link href="/signup"><a>Signup</a></Link>
      )}
    </NavStyles>
      )
    }
  </User>
);

export default Nav;
