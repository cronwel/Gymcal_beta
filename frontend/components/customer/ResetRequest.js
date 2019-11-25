import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from '../styles/Form';
import DisplayError from '../ErrorMessage';

const MUTATION_RESET_REQUEST = gql`
 mutation MUTATION_RESET_REQUEST( $email: String! ) {
     resetRequest( 
         email: $email
     ) {
       message
     }
 }
`;


class ResetRequest extends Component {

  state = {
    email: ''
  };

  saveToState = e => {
    this.setState( { [ e.target.name ]: e.target.value } );
  }

  render() {
    return (
      <Mutation 
        mutation={ MUTATION_RESET_REQUEST }
        variables={ this.state }
      >
        { ( resetRequest, { error, loading, called  } ) => (
          <Form
            method="post"
            onSubmit={ async e => {
              e.preventDefault();
              const success = await resetRequest();
              this.setState( { email: '' } );
            }}
          >
            <fieldset
              disabled={ loading } aria-busy={ loading }
            >
              <h2>
                Reset Password
              </h2>
              <DisplayError error={ error } />
              { !error && !loading && called && <p> Check your Inbox!</p> }
              <label htmlFor="email"> Email
                <input 
                  type="text"
                  name="email"
                  placeholder="email"
                  value={ this.state.email }
                  onChange={ this.saveToState }
                  />
              </label>

              <button type="submit">
                Request New Password
              </button>

            </fieldset>
          </Form>
        )}
      </Mutation>              
    );
  }
}

export default ResetRequest;