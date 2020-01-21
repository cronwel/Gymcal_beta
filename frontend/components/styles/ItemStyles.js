import styled from 'styled-components';

const Item = styled.div`
  width: 300px;
  font-family: 'Quicksand Light', sans-serif;
  background: white;
  border-radius: 25px 0px 0px 25px;
  border: 1px solid ${props => props.theme.offWhite};
  position: relative;
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
    /* height: 250px; */
    object-fit: cover;
  }
  /* p {
    font-size: 12px;
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1.5rem;
  } */
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
