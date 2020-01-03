import styled from 'styled-components';

const NavStyles = styled.nav`
  display: flex;
  font-size: 2rem;
  justify-content: start;
  div {
    position: inherit;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    @media (max-width: 768px) {
      display: none;
    }
  }
  li {
    list-style: none;
  }
  a,
  button {
    padding: 1rem 2rem;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-size: 1em;
    letter-spacing: 2px;
    background: none;
    border: 0;
    cursor: pointer;
    color: ${props => props.theme.black};
    @media (max-width: 320px) {
      font-size: 10px;
      padding: 0 10px;
    }
    &:before {
      content: '';
      width: 2px;
      background: ${props => props.theme.lightgrey};
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      bottom: 0;
    }
    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
     }
  }
  @media (max-width: 1200px) {
    width: 100%;
    justify-content: center;
    font-size: 1.5rem;
  }
`;

export default NavStyles;
