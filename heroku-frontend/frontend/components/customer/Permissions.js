import { Query, Mutation } from 'react-apollo';
import DisplayError from '../ErrorMessage';
import gql from 'graphql-tag';
import Table from '../styles/Table';
import Button from '../styles/Button';
import PropTypes from 'prop-types';

const permissionTypes = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMUPDATE',
  'ITEMDELETE',
  'PERMISSIONUPDATE',
];

const MUTATION_PERMISSION_UPDATE = gql`
  mutation permissionsUpdate(
    $permissions: [ Permission ],
    $userId: ID!
  ) {
    permissionsUpdate(
      permissions: $permissions,
      userId: $userId,
    ) {
      id
      permissions
      name
      email
    }
  }
`;

const QUERY_ALL_USERS = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const Permissions = props => (
  <Query query={ QUERY_ALL_USERS }>
    { ( { data, loading, error } ) => (
      <div>
        <DisplayError error={ error }/>
        <div>
          <h2>
            Permissions
          </h2>
          <Table>
            <thead>
              <tr>
                <th>
                  Name
                </th>
                <th>
                  Email
                </th>
                { permissionTypes.map(permission => <th key={permission}>{permission}</th>)}
                <th>Check</th>
              </tr>
            </thead>
            <tbody>
              { data.users.map(user => <UserPermissions user={user} key={user.id} />)}
            </tbody>
          </Table>
        </div>
      </div>
    )}
  </Query>
);

class UserPermissions extends React.Component {
  
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      permissions: PropTypes.array,
    }).isRequired,
  };

  state = {
    permissions: this.props.user.permissions,
  };

  handlePermissionChange = (e) => {
    const checkbox = e.target;

    let permissionFields = [ ...this.state.permissions ];
    if ( checkbox.checked ) {
      permissionFields.push( checkbox.value );
    } else {
      permissionFields = permissionFields.filter( permission => permission !== checkbox.value );
    }
    this.setState( { permissions: permissionFields } );
  };

  render() {
    const user = this.props.user;
    return (
      <Mutation
        mutation={ MUTATION_PERMISSION_UPDATE }
        variables={ {
          permissions: this.state.permissions,
          userId: this.props.user.id,
        }}
      >
        {(permissionsUpdate, { loading, error } ) => (
          <>
          { error && <tr><td colSpan="8"> <DisplayError error={ error }/></td></tr>}
          <tr>
            <td>{ user.name }</td>
            <td>{ user.email }</td>
            {permissionTypes.map(permission => (
              <td key={permission }>
                <label htmlFor={`${user.id}-permission-${permission}`}>
                  <input 
                    type="checkbox"
                    id={`${user.id}-permission-${permission}`}
                    checked={ this.state.permissions.includes( permission ) }
                    value={ permission }
                    onChange={this.handlePermissionChange}
                    />
                </label>
              </td>
            ))}
            <td>
              <Button type="button" disabled={ loading } onClick={ permissionsUpdate }>
                Updat{loading ? 'ing' : 'e' }
              </Button>
            </td>
          </tr>
          </>
        )}
      </Mutation>
    )
  }
}

export default Permissions;