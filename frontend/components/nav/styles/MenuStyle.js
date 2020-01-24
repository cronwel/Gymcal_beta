import styled from 'styled-components';


const MenuStyle = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  background-color: rgba(0,0,0, .8);
  @media (max-width: 786px) {
    display: none;
  }
  ul {
    align-items: flex-start;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  li {
    list-style: none;
  }
  a,
  button {
    color: white;
    padding: 0rem 1rem 0rem 1rem;
    align-items: center;
    position: relative;
    font-size: 1em;
    letter-spacing: 2px;
    background: none;
    border: 0;
    cursor: pointer;
    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
     }
  }
`;

export default MenuStyle;
