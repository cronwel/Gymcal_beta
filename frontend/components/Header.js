import styled from 'styled-components';
import NProgress from 'nprogress';
import Router from 'next/router';
import Nav from './nav/NavTop/Nav';
import NavLeft from './nav/NavLeft/NavLeft';
import Cart from './cart/Cart';
import Hamburger from './nav/NavLeft/Hamburger';


Router.onRouteChangeStart = () => { NProgress.start(); };
Router.onRouteChangeComplete = () => { NProgress.done(); };
Router.onRouteChangeError = () => { NProgress.done(); };

const StyledHeader = styled.header`
  background-color: black;
  height: 60px;
  position: fixed;
  width: 100%;
  z-index: 2;
  .bar {
    border-bottom: 2px solid ${props => props.theme.grey};
    background-color: black;
  }
`;

class Header extends React.Component {
  state = {
    navOpen: false,
  }
  toggleHandler = () => {
    this.setState((prevState)=> {
      return { navOpen: !prevState.navOpen }
    });
  }
  
  render() {
    let navLeft;
    if (this.state.navOpen) {
      navLeft = <NavLeft />
    }
    return (
      <StyledHeader>
        <div className="bar">
          <Hamburger toggle={this.toggleHandler} />
          <Nav />
          { navLeft }
        </div>
        <Cart />
      </StyledHeader>
    );
  }
}

export default Header;
