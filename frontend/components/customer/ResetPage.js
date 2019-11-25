import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Form from '../styles/Form';
import DisplayError from '../ErrorMessage';
import { QUERY_SIGNEDIN_USER } from '../customer/User';


const MUTATION_RESET_PASSWORD_CONFIRM = gql`
 mutation MUTATION_RESET_PASSWORD_CONFIRM(
     $resetToken: String!,
     $password: String!,
     $confirmPassword: String!
     ) {
     resetPassword( 
         resetToken: $resetToken,
         password: $password,
         confirmPassword: $confirmPassword
     ) {
       id
       email
       name
     }
 }
`;


class ResetConfirm extends Component {
  static propTypes = {
    resetToken: PropTypes.string.isRequired,
  };

  state = {
    password: '',
    confirmPassword: '',
  };

  saveToState = e => {
    this.setState( { [ e.target.name ]: e.target.value } );
  }

  render() {
    return (
      <Mutation 
        mutation={ MUTATION_RESET_PASSWORD_CONFIRM }
        variables={{
            resetToken: this.props.resetToken,
            password: this.props.password,
            confirmPassword: this.props.confirmPassword
        }}
        refetchQueries={ [ { query: QUERY_SIGNEDIN_USER } ] }
      >
        { ( reset, { error, loading, called  } ) => (
          <Form
            method="post"
            onSubmit={ async e => {
              e.preventDefault();
              await reset();
              this.setState( { password: '', confirmPassword: '' } )
            }}
          >
            <fieldset
              disabled={ loading } aria-busy={ loading }
            >
              <h2>
                Confirm New Password
              </h2>
              <DisplayError error={ error } />
              <label htmlFor="password"> New Password
                <input 
                  type="password"
                  name="password"
                  placeholder="password"
                  value={ this.state.password }
                  onChange={ this.saveToState }
                  />
              </label>

              <label htmlFor="confirmPassword"> Confirm Password
                <input 
                  type="password"
                  name="confirmPassword"
                  placeholder="confirmPassword"
                  value={ this.state.confirmPassword }
                  onChange={ this.saveToState }
                  />
              </label>
              <button type="submit">
                Submit
              </button>

            </fieldset>
          </Form>
        )}
      </Mutation>              
    );
  }
}

export default ResetConfirm;