import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import Header from './Header';
import Meta from './Meta';
import Footer from './Footer';


const theme = {
  blue: '#24F1FF',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '90%',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};

const StyledPage = styled.div`
  color: ${props => props.theme.black};
`;
const Space = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
  height: 80px;
`;
const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  background-color: rgba(200,200,200, .5); 
  box-shadow: 5px 5px 14px 0px rgba(50, 50, 50, 0.85);
  margin: 0 auto;
  padding: 2rem;
`;

injectGlobal`
  @font-face {
    font-family: 'Ministry of Moron', sans-serif;
    src: url('/static/Ministry of Moron.otf');
    font-weight: normal;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  .space {
       height: 40px;
     }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'Ministry of Moron';
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
  button {  font-family: 'Ministry of Moron'; }

`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <Space />
          <Inner>{this.props.children}</Inner>
          <div className='FooterBottom'>
            <Footer />
          </div>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
