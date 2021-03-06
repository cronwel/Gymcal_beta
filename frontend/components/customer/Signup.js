import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from '../styles/Form';
import DisplayError from '../ErrorMessage';
import { QUERY_SIGNEDIN_USER } from './User';

const MUTATION_SIGNUP = gql`
    mutation MUTATION_SIGNUP(
        $email: String!,
        $name: String!,
        $password: String!
    )   {
        signup(
            email: $email,
            name: $name,
            password: $password,
        ) {
            id
            email
            name
        }
    }
`;

class Signup extends Component {

state = {
    name: '',
    email: '',
    password: '',
}

saveToState = (e) => {
    this.setState( { [ e.target.name ]: e.target.value } );
}
  render() {
    return (
      <Mutation
        mutation={ MUTATION_SIGNUP } 
        variables={ this.state } 
        refetchQueries={ [ { query: QUERY_SIGNEDIN_USER } ] }
        >
        { (signup, { error, loading } ) => {
        return (
            <Form 
              method="post"
              onSubmit={ async e => {
                e.preventDefault();
                const res = await signup();
                this.setState( { name: ' ', email: ' ', password: ' '} );
            } }>
              <fieldset disabled= { loading} aria-busy={ loading }>
                  <h2>
                      Sign up for an account
                  </h2>
                <DisplayError error={ error }/>

                
                <label htmlFor="name"> name
                  <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={ this.state.name}
                    onChange={ this.saveToState }
                  />
                </label>

                <label htmlFor="email"> email
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={ this.state.email}
                    onChange={ this.saveToState }
                  />
                </label>
                
                <label htmlFor="password"> password
                  <input
                    type="text"
                    name="password"
                    placeholder="password"
                    value={ this.state.password}
                    onChange={ this.saveToState }
                  />
                </label>
              <button type="submit">
                Create Account
              </button>
            </fieldset>
          </Form>
          )
        }}
      </Mutation>
    )
  }
}

export default Signup;
