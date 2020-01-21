import React, { Component } from 'react';
import Twitter from '../components/styles/assets/Twitter.js';
import Facebook from '../components/styles/assets/Facebook.js';
import Instagram from '../components/styles/assets/Instagram.js';
import styled from 'styled-components';

const FooterCSS = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  i {
    display: flex;

  }
`

class Footer extends Component {
  render() {
    return (  
      <footer>
        <FooterCSS>
          <p>
            Gymcal. All right reserved, 2020.
          </p>
          <i><a href="http://www.twitter.com">   <Twitter /></a></i>
          <i><a href="http://www.facebook.com">  <Facebook /></a></i>
          <i><a href="http://www.instagram.com"> <Instagram /></a></i>
          
        </FooterCSS>
      </footer>
    )
  }
}

export default Footer;