import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from '../ErrorMessage';
import styled from 'styled-components';
import Head from 'next/head';



const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${ props => props.theme.bs };
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
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
                <img src={ item.largeImage } alt={ item.description }/>
                <div className="details">
                  <h2>{ item.title }</h2>
                  <p>{ item.price }</p>
                  <p>{ item.description }</p>
                </div>
              </SingleItemStyles> 
            }}
      </Query>
    );
  }
}

export default ItemEach;