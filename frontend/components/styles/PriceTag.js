import styled from 'styled-components';

const PriceTag = styled.span`
  background: ${props => props.theme.black};
  color: rgba(200,200,200, 1);
  padding: 5px;
  line-height: 1;
  font-size: 3rem;
  display: inline-block;
  /* position: absolute; */
`;

export default PriceTag;
