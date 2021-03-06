import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from './Item';
// import Pagination from '../Pagination';
import { perPage } from '../../config';

const QUERY_ALL_ITEMS = gql`
  query QUERY_ALL_ITEMS(
    $skip: Int = 0,
    $first: Int = ${perPage}
    ) { 
    items( 
      first: $first, 
      skip: $skip,
      orderBy: title_ASC
      ) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  /* text-align: center; */

`;

const ItemsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 20px;
  margin: 0 auto;
  .itemStyle {
    width: 200px;
  }
`

class Items extends Component {
  render() {
    return (
      <Center>
        {/* <Pagination page={ this.props.page }/> */}
          <Query
            query={QUERY_ALL_ITEMS} 
            fetchPolicy="network-only"
            variables={{
            skip: this.props.page * perPage - perPage,
          }}>
            {({ data, error, loading }) => {
              if (loading) return <p>Loading...</p>
              if (error) return <p> Error: { error.message }</p>
              return <ItemsList  >
                {data.items.map( (item)=>
                  <Item item={item} key={item.id} className='itemStyle' />
                )}
              </ItemsList>
            }}
          </Query>
        {/* <Pagination page={ this.props.page }/> */}
      </Center>
    );
  }
}

export default Items;

export { QUERY_ALL_ITEMS };