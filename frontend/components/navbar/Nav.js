import Link from 'next/link';
import { Mutation } from 'react-apollo';
import { MUTATION_CART_TOGGLE } from '../cart/Cart';
import Menu from '../styles/Menu';
import User from '../customer/User';
import CartCount from '../cart/CartCount';
import Signout from '../customer/Signout';
import LogoMain from './LogoMain';
import styled from 'styled-components';
import Hamburger from './Hamburger';
import CartIcon from '../cart/CartIcon';
import AutoComplete from '../Search';


const Gymcal = styled.div`
  font-size: 3rem;
  a {
    color: white;
    text-decoration: none;
  }
  @media (max-width: 1024px){
    display: none;
  }
`;
const Overlay = styled.div`
  position: absolute;
`
const StyleLogo = styled.div`
  @media (max-width: 1024px) { 
    display: none;
  }
`

const Nav = () => (
  <User>
  {({ data: { signedinuser }}) => (
    <>
    <Hamburger />
    <Menu>
      <StyleLogo>
        <LogoMain href="/" className="gymcal-link"/>
      </StyleLogo>
      <div>
        <Gymcal>
          <Link href="/" className="gymcal-link"><a>GymCal</a></Link>
        </Gymcal>
      </div>
      <div>
        <AutoComplete />
      </div>
      <ul>
      <li>
        <Link href="/items"><a>Items</a></Link>
      </li>

      <li>
        {!signedinuser && (
          <Link href="/signup"><a>Signup</a></Link>
        )}
      </li>
      {signedinuser && (
        <>
        
        <li>
          <Link href="/orders"><a>Orders</a></Link>
        </li>
        
        {signedinuser.permissions.includes("ADMIN") && (
        
        <li>
          <Link href="/sell"><a>Sell</a></Link>  
        </li>
        )}
        
        <li>
          <Link href="/signedinuser"><a>Account</a></Link>
        </li>

        <li>
          <Signout />
        </li>

        <li>
        <Mutation mutation={ MUTATION_CART_TOGGLE}>
          { ( toggleCart ) => (
            <button onClick={ toggleCart }>
              <Overlay>
              <CartCount count={ signedinuser.cart.reduce( (tally, cartItem) => tally + cartItem.quantity, 0 ) }>
              </CartCount>
              </Overlay>
              <CartIcon />
            </button>
          ) }
        </Mutation>
      </li>
        </>
      )}
      </ul>
    </Menu>
    </>
  )}
  </User>
);

export default Nav;