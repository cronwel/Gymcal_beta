import styled from 'styled-components';



const Menu = styled.nav`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: row;
  background-color: rgba(0,0,0, .8);
  ul {
  align-items: flex-start;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    @media (max-width: 1024px) {
      flex-direction: column;
    }
  }
  li {
    list-style: none;

  }
  a,
  button {
    color: white;
    padding: 1rem 1rem;
    align-items: center;
    position: relative;
    font-size: 1em;
    letter-spacing: 2px;
    background: none;
    border: 0;
    cursor: pointer;
    @media (max-width: 1024px) {
      padding: 0 10px;
    }
    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
     }
  }
  @media (max-width: 1024px) {
    height: 100vh;
    width: 75%;
    font-size: 1.5rem;
  }
  @media (max-width: 1024px) {
  text-align: left;
  position: absolute;
  /* display: none; */
  flex-direction: column;
  justify-content: center;
  }

`;

export default Menu;
