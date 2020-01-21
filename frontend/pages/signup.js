import Signup from '../components/customer/Signup';
import Signin from '../components/customer/Signin';
import ResetRequest from '../components/customer/ResetRequest';
import styled from 'styled-components';

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;


const SignupPage = ( props ) => (
  <Columns>
    <Signup />
    <Signin />
    <ResetRequest /> 
  </Columns>
)
export default SignupPage;