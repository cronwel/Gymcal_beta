import styled from 'styled-components';
import NProgress from 'nprogress';
import Router from 'next/router';
import Nav from './navbar/Nav';
import Cart from './cart/Cart';
import AutoComplete from './Search';



Router.onRouteChangeStart = () => { NProgress.start(); };
Router.onRouteChangeComplete = () => { NProgress.done(); };
Router.onRouteChangeError = () => { NProgress.done(); };

const StyledHeader = styled.header`
  .bar {
    border-bottom: 10px solid ${props => props.theme.black};
  }
  .sub-bar {
    border-bottom: 2px solid ${props => props.theme.black};
  }
`;

const Header = () => (
  <StyledHeader>
    <div className="bar">
      <Nav />
    </div>
    <div className="sub-bar">
      <AutoComplete />
    </div>
    <Cart />
  </StyledHeader>
);

export default Header;
