import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from '../ErrorMessage';
import styled from 'styled-components';
import Head from 'next/head';
import formatMoney from '../../lib/formatMoney';
import AddToCart from '../cart/AddToCart';



const SingleItemStyles = styled.div`
  max-width: 90%;
  margin: 2rem auto;
  background-color: #D3ECEE;
  box-shadow: 5px 5px 14px 0px rgba(50, 50, 50, 0.85);
  display: grid; 
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  @media (max-width: 1024px) {
  display: flex;
  flex-wrap: wrap;
  min-height: 800px;

  }
  h2 {
    font-family: 'Courier New', Courier, monospace;
  }
  .image img {
    flex-grow: 1;
    margin: 10px;
    width: 100%;
    height: auto;
    border: 2px solid black;
    box-shadow: 5px 5px 14px 0px rgba(50, 50, 50, 0.85);
    @media (max-width: 640px) {
      width: 85%;
      align-items: center;
    }
  }
  .details {
    flex-grow: 1;
    padding: 10px;
    font-family: 'Courier New';
    margin-left: 1.5rem;
    margin: 1.1rem;
    font-size: 1.5rem;
    @media (max-width: 1024px) {
      width: 90%;
      align-items: center;
    }
  }
`

const QUERY_SINGLE_ITEM = gql`
  query QUERY_SINGLE_ITEM($id: ID!) {
    item(where: {id: $id }) {
      id
      title
      description
      largeImage
      price
    }
  }
`

class ItemEach extends Component {
  render() {
    return (
      <Query query={ QUERY_SINGLE_ITEM } variables={ { id: this.props.id } }  > 
        { ( { error, loading, data } ) => {
          if( error ) return <Error error={error}/>;
          if( loading ) return <p>Loading....</p>;
          if( !data.item ) return <p> No item found for { this.props.id }</p>
          const item = data.item;

          return <SingleItemStyles>
            <Head>
              <title>
                Gymcal | { item.title }
                </title>
            </Head>
            <div className="image">
              <img src={ item.largeImage } alt={ item.description }/>
            </div>
            <div className="details">
              <h2>{ item.title }</h2>
              <p>{ formatMoney(item.price) }</p>
              <AddToCart id={ item.id }/>
              <p>Manufacturer: </p>
              <p>{ item.description }</p>
            </div>
          </SingleItemStyles> 
        }}
      </Query>
    );
  }
}

export default ItemEach;