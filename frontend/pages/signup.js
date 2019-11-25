import Signup from '../components/customer/Signup';
import Signin from '../components/customer/Signin';
import Reset from '../components/customer/Reset';
import styled from 'styled-components';

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(300px, 1fr));
  grid-gap: 20px:
`;


const SignupPage = ( props ) => (
  <Columns>
    <Signup />
    <Signin />
    <Reset /> 
  </Columns>
)
export default SignupPage;