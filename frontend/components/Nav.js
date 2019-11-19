import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import User from './customer/User';

const Nav = () => (
  <User>
  { ( { data } ) => {
    const signedinuser = data ? data.signedinuser : null
    return (
    <NavStyles>
      <Link href="/items">
        <a>Items</a>
      </Link>
      {signedinuser && (
        <>
        <Link href="/sell">
          <a>Sell</a>
        </Link>
        <Link href="/orders">
          <a>Orders</a>
        </Link>
        <Link href="/signedinuser">
          <a>Account</a>
        </Link>
        </>
      )}
      {!signedinuser && (
        <Link href="/signup">
          <a>Signup</a>
        </Link>
      )}
    </NavStyles>
      )
    }}
  </User>
);

export default Nav;
