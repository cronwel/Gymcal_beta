import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import User from './customer/User';

const Nav = () => (
  <NavStyles>
    <Link href="/items">
      <a>Items</a>
    </Link>
    <Link href="/sell">
      <a>Sell</a>
    </Link>
    <Link href="/cart/testing">
      <a>Sell</a>
    </Link>
    <Link href="/signup">
      <a>Signup</a>
    </Link>
    <Link href="/orders">
      <a>Orders</a>
    </Link>
    <Link href="/me">
      <a>Account</a>
    </Link>
    <User>
    {({ data: { signedinuser } }) => {
        console.log(signedinuser);
        if (signedinuser) return <p>{signedinuser.name}</p>;
        return null;
      }}
    </User>
  </NavStyles>
);

export default Nav;
