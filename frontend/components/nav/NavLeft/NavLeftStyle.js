import styled from 'styled-components';

const MenuStyle = styled.nav`
  display: flex;
  align-items: center;
  background-color: rgba(0,0,0, .8);
  height: 100vh;
  width: 320px;
  font-size: 1.5rem;  
  text-align: left;
  position: absolute;
  flex-direction: column;
  justify-content: flex-start;

  ul {
    align-items: flex-start;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: column;
    list-style: none;
  }
  li {
    list-style: none;
    margin: .5rem 0;
    font-size: 2rem;
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
    @media (max-width: 785px) {
      padding: 0 10px;
    }
    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
     }
  }
`;

export default MenuStyle;
