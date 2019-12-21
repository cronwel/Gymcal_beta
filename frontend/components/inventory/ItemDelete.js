import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { QUERY_ALL_ITEMS } from './Items';


const MUTATION_ITEM_DELETE = gql`
  mutation MUTATION_ITEM_CREATE(
    $id: ID!
  ) {
  deleteItem( 
      id: $id
      ) { 
        id 
        }
  }
`;

class ItemDelete extends Component {
  
  update = ( cache, payload ) => {
    const data = cache.readQuery( { query: QUERY_ALL_ITEMS } );
    // console.log( data, payload );
    data.items = data.items.filter( item => item.id !== payload.data.deleteItem.id );
    cache.writeQuery( { query: ALL_ITEMS_QUERY, data: data } );
  };
  render() {
    return (
    <Mutation 
    mutation={ MUTATION_ITEM_DELETE } 
    variables={ { id: this.props.id } } 
    update={ this.update }
    >
    {( deleteItem, { error }) => (
      <button onClick={() => {
        if (confirm("Are you serious? Be serious,this is it.")) {
          deleteItem().catch(err => {
            alert(err.message);
          });
        }
      }}>
        { this.props.children }
      </button>
    )}
    </Mutation>
    );
  }
}

export default ItemDelete;