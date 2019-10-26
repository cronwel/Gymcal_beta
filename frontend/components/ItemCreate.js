import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';



class ItemCreate extends Component {

  state = {
    title: '',
    price: '',
    description: '',
    image: '',
    largeImage: ''
  }


handleChange = e => {

  const { name, type, value } = e.target ;

  const val = type == 'number' ? parseFloat(value) :  value ;

  this.setState( { [name] : val } );
};



  render() {
    return (
      <Form onSubmit={ e => {
 
        e.preventDefault();
      
        console.log(this.state);
      
      }} >
        <h2>
          Inventory
        </h2>
        <fieldset>

          <label htmlFor="title" > Name of Item
             
          <input 
            id="title"
            name="title"
            placeholder="Name of item"
            required
            type="text"
            value={ this.state.title }
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
            value={  this.state.price  }
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
            value={ this.state.description }
            onChange={ this.handleChange }
            />
          </label>


        </fieldset>
        <button type= "submit" >
            Add Item
          </button>
      </Form>
    );
  }
}

export default ItemCreate;