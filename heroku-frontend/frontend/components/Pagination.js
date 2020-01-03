import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Link from  'next/link';

import PaginationStyles from './styles/PaginationStyles';
import { perPage } from '../config';
import Head from 'next/head';




const QUERY_PAGINATION = gql`
  query QUERY_PAGINATION {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;


const Pagination = ( props ) => (
  <Query query={ QUERY_PAGINATION } >
      { ( {data, loading, error} ) => {
        if(loading) return <p>Loading...</p>;
        const count = data.itemsConnection.aggregate.count;
        const pages = Math.ceil(count / perPage);
        const page = props.page || 1 ;
        return (
          <PaginationStyles>
            <Head>
              <title>
                Gymcal | Page { page } of { pages }
              </title>
            </Head>
            <Link prefetch href={{ 
              pathname: 'items',
              query: { page: page -1 }
            }}>
              <a className="prev" aria-disabled={ page <= 1 }> Prev </a>
            
            </Link>
            <p> { page } of { pages }  </p>
            <p>{ count} Items</p>
            <Link prefetch href={{ 
              pathname: 'items',
              query: { page: page + 1 }
            }}>
              <a className="prev" aria-disabled={ page >= pages }> Next </a>
            
            </Link>
          </PaginationStyles>
        )
      }}
    </Query>
)

export default Pagination;