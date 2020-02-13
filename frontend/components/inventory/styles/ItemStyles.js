import styled from 'styled-components';

const Item = styled.div`
  width: 300px;
  font-family: 'Courier New', Courier, monospace;
  background: white;
  border: 1px solid ${props => props.theme.offWhite};
  display: flex;
  img {
    width: 300px;
    height: 270px;
    object-fit: cover;
    box-shadow: 5px 5px 14px 0px rgba(50, 50, 50, 0.85);
  }
  .buttonList {
    display: grid;
    width: 100%;
    border: 1px solid ${props => props.theme.lightgrey};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: ${props => props.theme.lightgrey};
    & > * {
      background: white;
      border: 0;
      font-family: 'Quicksand', sans-serif;
      font-size: 1rem;
      padding: 1rem;
    }
  }
`;

export default Item;
