import styled from 'styled-components';

// const MenuStyle = styled.nav`
//     position: fixed;
//     z-index: 4;
//     display: flex;
//     justify-content: space-around;
//     align-items: center;
//     min-height: 8vh;
//     height: 40px;
//     background-color: black;
//     .burger div{
//         width: 25px;
//         height: 4px;
//         background-color: red;
//         margin: 5px;
//         transition: all 0.3s ease;
//       }

//       .toggle .line1 {
//         transform: rotate(-45deg) translate(-5px,6px);
//       }
      
//       .toggle .line2 {
//         opacity: 0;
//       }
//       .toggle .line3 {
//         transform: rotate(45deg) translate(-5px,-6px);
//       }
// `;


export const MenuStyle = styled.button`
  position: absolute;
  top: 5%;
  left: 2rem;
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  
  &:focus {
    outline: none;
  }
  
  div {
    width: 2rem;
    height: 0.25rem;
    background: black;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
  }
  @media (max-width: 1024px) {
    display: flex;
  }
`;


const Hamburger = ()=> {
    return (
      <MenuStyle>
        {/* <div className="burger"> */}
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        {/* </div> */}
      </MenuStyle>
    )
}

export default Hamburger;