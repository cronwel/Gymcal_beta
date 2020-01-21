import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Form from '../styles/Form';
import ErrorMessage from '../ErrorMessage';
import Router from 'next/router';



const QUERY_ITEM_UPDATE= gql`
  query QUERY_ITEM_UPDATE( $id: ID! ) {
      item( where: { id: $id } ) {
        id
        title 
        description
        price
      }
    }
`;


const MUTATION_ITEM_UPDATE = gql`
  mutation MUTATION_ITEM_UPDATE(
    $id: ID!
    $title: String
    $price: Int
    $description: String
  ) {
    updateItem(
      id: $id
      title: $title
      price: $price
      description: $description
    ) {
      id
      title
      price
      description
    }
  }
`;

class UpdateItem extends Component {
  state = {};
  
  handleChange = e => {
    const { name, type, value } = e.target ;
    const val = type == 'number' ? parseFloat(value) :  value ;
    this.setState( { [name] : val } );
};

updateItem = async (e, updateItemMutation ) => {
  e.preventDefault();
  const res = await updateItemMutation({
    variables: { 
      id: this.props.id,
      ...this.state,
    }, 
  });
};

  render() {
    return (
      <Query query= { QUERY_ITEM_UPDATE } variables= { { id: this.props.id } } >
          { ( { data, loading } ) => {
            if (loading) return <p> Loading........</p>;
            if (!data.item) return <p> No item found for {this.props.id}</p>;
            return (
      <Mutation mutation = { MUTATION_ITEM_UPDATE } variables = { this.state }>
        {(updateItem, { loading, error }) => (
          <Form onSubmit= { e => this.updateItem( e, updateItem ) }>
            <h2> Inventory - EDIT </h2>
            <ErrorMessage error= { error } />
            <fieldset disabled={ loading } aria-busy={ loading } >
              <label htmlFor="title" > Name of Item
                <input 
                  id="title"
                  name="title"
                  placeholder="Name of item"
                  required
                  type="text"
                  defaultValue ={ data.item.title }
                  onChange={ this.handleChange }
                  />
              </label>

              <label htmlFor="price" > Price
                <input
                  id="price"
                  name="price"
                  placeholder="$0.00......"
                  required
                  type="number"
                  defaultValue={  data.item.price  }
                  onChange={ this.handleChange }
                  />
              </label>

              <label htmlFor="description" > Description
                <textarea
                  id="description"
                  name="description"
                  placeholder="These are the coolest bands I've ever used."
                  required
                  type="textarea"
                  defaultValue={ data.item.description }
                  onChange={ this.handleChange }
                  />
              </label>

              <button type= "submit" >
                Submit
              </button>

            </fieldset>
          </Form>
      )}
    </Mutation>
    )}}
    </Query>
    );
  }
}

export default UpdateItem;

export { MUTATION_ITEM_UPDATE };