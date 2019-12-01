import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from '../styles/Form';
import DisplayError from '../ErrorMessage';
import { QUERY_SIGNEDIN_USER } from './User';

const MUTATION_SIGNIN = gql`
 mutation MUTATION_SIGNIN( $email: String!, $password: String! ) {
     signin( 
         email: $email,
         password: $password
     ) {
         id
         email
         name
     }
 }
`;

class Signin extends Component {

  state = {
    name: '',
    password: '',
    email: ''
  };

  saveToState = e => {
    this.setState( { [ e.target.name ]: e.target.value } );
  }

  render() {
    return (
      <Mutation 
        mutation={ MUTATION_SIGNIN }
        variables={ this.state }
        refetchQueries={ [ { query: QUERY_SIGNEDIN_USER } ] }
      >
        { ( signup, { error, loading } ) => (
          <Form
            method="post"
            onSubmit={ async e => {
              e.preventDefault();
              await signup();
              this.setState( { name: '', email: '', password: '' } );
            }}
          >
            <fieldset
              disabled={ loading } aria-busy={ loading }
            >
              <h2>
                Sign In
              </h2>
              <DisplayError error={ error } />
              <label htmlFor="email"> Email
                <input 
                  type="text"
                  name="email"
                  placeholder="email"
                  value={ this.state.email }
                  onChange={ this.saveToState }
                  />
              </label>
              <label htmlFor="password"> Password
                <input 
                  type="password"
                  name="password"
                  placeholder="password"
                  value={ this.state.password }
                  onChange={ this.saveToState }
                  />
              </label>
              <button type="submit">
                Sign In
              </button>
            </fieldset>
          </Form>
        )}
      </Mutation>              
    );
  }
};

export default Signin;