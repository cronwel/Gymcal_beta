import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { QUERY_SIGNEDIN_USER } from '../customer/User';
import styled from 'styled-components';


const SignoutStyle = styled.button`
  border: 2px solid white;
  background: none;
  padding: 0;
`

const MUTATION_SIGNOUT = gql`
    mutation MUTATION_SIGNOUT {
        signout {
            message
        }
    }
`;

const Signout = ( props ) => (
  <Mutation mutation={ MUTATION_SIGNOUT } refetchQueries={ [ { query: QUERY_SIGNEDIN_USER } ] } >
      { signout => <button onClick={ signout }>Sign Out</button>}
  </Mutation>
);

export default Signout;
