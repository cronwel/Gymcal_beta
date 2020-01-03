import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const QUERY_SIGNEDIN_USER = gql`
  query {
    signedinuser {
      id
      email
      name
      permissions
      cart {
        id
        quantity
        item {
          id
          price
          image
          title
          description
        }
      }
    }
  }
`

const User = props => (
  <Query { ...props } query={ QUERY_SIGNEDIN_USER } >
    { payload => props.children( payload ) }
  </Query>
);

User.propTypes = {
  children: PropTypes.func.isRequired,
}

export default User;
export { QUERY_SIGNEDIN_USER };