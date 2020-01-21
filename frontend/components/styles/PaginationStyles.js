import styled from 'styled-components';

const PaginationStyles = styled.div`
  font-family: 'Quicksand Light', sans-serif;
  text-align: center;
  display: flex;
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: 1rem 0;
  border: 1px solid ${props => props.theme.lightgrey};
  border-radius: 10px;
  i {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
}
.right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}
.left {
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}


  & > * {
    margin: 0;
    padding: 15px 30px;
    border-right: 1px solid ${props => props.theme.lightgrey};
    &:last-child {
      border-right: 0;
    }
  }
  a[aria-disabled='true'] {
    color: grey;
    pointer-events: none;
  }
`;

export default PaginationStyles;
