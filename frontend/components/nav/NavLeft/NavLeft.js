import Link from 'next/link';
import { Mutation } from 'react-apollo';
import { MUTATION_CART_TOGGLE } from '../../cart/Cart';
import User from '../../customer/User';
import AutoComplete from '../../Search';
import CartCount from '../../cart/CartCount';
import Signout from '../../customer/Signout';
import styled from 'styled-components';
import MenuStyle from './NavLeftStyle';
import CartIcon from '../../cart/CartIcon';



const LogoStyle = styled.div`
  margin-left: 60px;
  @media (max-width: 1024px) { 
    display: none;
  }
`;

const TitleStyle = styled.div`
  font-size: 3rem;
  margin-left: 60px;
  a {
    color: #767676;
    text-decoration: none;
  }
  @media (max-width: 320px){
    display: none;
    font-size: .5rem;
  }
`;
const SearchStyle = styled.div`
`
const NavItemsStyle = styled.div`
  a:hover {
    color: #767676;
  }
  a:active {
    color: #24F1FF;
  }

`;

const Overlay = styled.div`
  position: absolute;
`

const NavLeft = () => (
  <User>
  {({ data: { signedinuser }}) => (
    <>
    <MenuStyle>
      <TitleStyle> <Link href="/" >GymCal</Link></TitleStyle>
      <SearchStyle> <AutoComplete /> </SearchStyle>
      <NavItemsStyle>
        <ul>
          <li> <Link href="/items"><a>Items</a></Link> </li>
          <li>
            {!signedinuser && (
              <Link href="/signup"><a>Signup</a></Link>
              )}
          </li>

          {signedinuser && (
            <>
            <li><Link href="/orders"><a>Orders</a></Link></li>
            
            {signedinuser.permissions.includes("ADMIN") && (
              
              <li><Link href="/sell"><a>Sell</a></Link></li>
              )}
            
            <li><Link href="/signedinuser"><a>Account</a></Link></li>

            <li><Signout /> </li>

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
      </NavItemsStyle>
    </MenuStyle>
    </>
  )}
  </User>
);

export default NavLeft;