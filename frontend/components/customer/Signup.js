import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from '../styles/Form';
<<<<<<< HEAD
import DisplayError from '../ErrorMessage';

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
    this.setState( { [ e.target.name ]: e.target.value } )
}
  render() {
    return (
      <Mutation mutation={ MUTATION_SIGNUP } variables={ this.state } >
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
=======
// import Error from '../styles/ErrorMessage';



class Signup extends Component {
    render() {
        return <Form>
            <fieldset>
                <h2>
                    Sign up for an account
                </h2>
                <label htmlFor="email">
                    email
                </label>
                <label htmlFor="name">
                    name
                </label>
                <label htmlFor="password">
                    password
                </label>


            </fieldset>
        </Form>
    }
>>>>>>> 19225f52a26f3518ef74f63235944b43b27154e4
}

export default Signup;
