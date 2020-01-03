import styled from 'styled-components';

const HamburgerStyle = styled.nav`
    display: flex;
    justify-content: space-around;
    align-items: center;
    min-height: 8vh;
    height: 40px;
    background-color: black;
    .burger div{
        width: 25px;
        height: 4px;
        background-color: red;
        margin: 5px;
        transition: all 0.3s ease;
      }

      .toggle .line1 {
        transform: rotate(-45deg) translate(-5px,6px);
      }
      
      .toggle .line2 {
        opacity: 0;
      }
      .toggle .line3 {
        transform: rotate(45deg) translate(-5px,-6px);
      }
`;


const Hamburger = ()=> {
    return (
        <div className="burger">
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
        </div>
    )
}
export default Hamburger;