import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

QUERY_SIGNEDIN_USER = gql`
  query QUERY_SIGNEDIN_USER{
    signedinuser {
      id
      email
      name
      permissions
    }
  }
`

const User = ( props ) => (
  <Query { ...props } query={ QUERY_SIGNEDIN_USER } >
    {payload => props.children(payload)}
  </Query>
);

User.PropTypes = {
  children: PropTypes.func.isRequired,
}

export default User;
export { QUERY_SIGNEDIN_USER };