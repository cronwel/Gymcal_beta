import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from '../styles/Form';
import ErrorMessage from '../ErrorMessage';
import formatMoney from '../../lib/formatMoney';
import Router from 'next/router';

const MUTATION_ITEM_CREATE = gql`
  mutation MUTATION_ITEM_CREATE(
    $title: String!
    $price: Int!
    $description: String!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      price: $price
      description: $description
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

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

uploadFile = async e => {
  
  console.log( ' uploading file...')
  const files = e.target.files;
  const data = new FormData();
  data.append('file', files[0]);
  data.append('upload_preset', 'gymcal');

  const res = await fetch('https://api.cloudinary.com/v1_1/wyndev/image/upload/',
  {
  method: 'POST',
    body: data
  });
  const file = await res.json();
  console.log( file );
  this.setState({
    image: file.secure_url,
    largeImage: file.eager[0].secure_url
  })
};

  render() {
    return (

      <Mutation
        mutation = { MUTATION_ITEM_CREATE } 
        variables = { this.state }>

        {(createItem, { loading, error }) => (

          <Form onSubmit={ async e => {

            e.preventDefault();

            const res = await createItem();

            Router.push({

              pathname: '/items',

              query: { id: res.data.createItem.id }

            })
            
          }} >
            <h2> Inventory
            </h2>


            <ErrorMessage error= { error } />

            <fieldset
              disabled={ loading }
              aria-busy={ loading }
            >


            <label htmlFor="file" > Image
                
                <input 
                  id="file"
                  name="file"
                  placeholder="upload an image"
                  required
                  type="file"
                  onChange={ this.uploadFile }
                  />
                </label>

              {this.state.image && <img src={this.state.image } width="200px" alt={this.state.image}/> }


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

            <button type= "submit" >
                Add Item
              </button>

            </fieldset>
          </Form>
      )}
    </Mutation>
    );
  }
}

export default ItemCreate;

export { MUTATION_ITEM_CREATE };