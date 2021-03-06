import React from 'react';
import DownShift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const QUERY_SEARCH = gql`
 query QUERY_SEARCH(
   $searchTerm: String!
 ) {
   items(
     where: {
       OR: [{title_contains: $searchTerm }, { description_contains: $searchTerm}]
     }
   ) {
     id
     image
     title
   }
 }
`;

function routeToItem(item) {
  Router.push({
    pathname: '/item',
    query: {
      id: item.id,
    },
  });
}
class AutoComplete extends React.Component {

  state= {
    items: [],
    loading: false,
  };

  onChange = debounce(async (e,client) => {
    this.setState({ loading: true});
    const res = await client.query({
      query: QUERY_SEARCH,
      variables: { searchTerm: e.target.value },
    });
    this.setState({
      items: res.data.items,
      loading: false,
    });
  }, 350
  );

  render() {
    resetIdCounter();
    return (
      <SearchStyles>
        <DownShift 
          onChange={routeToItem}
          itemToString={item => (item === null ? '' : item.title)}
        >
         {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex}) => (
          <div>
            <ApolloConsumer>
              {client => (
                <input 
                 { ...getInputProps({
                  type: "search",
                  placeholder: "Search...",
                  id: 'search',
                  className: this.state.loading ? 'loading' : '',
                  onChange: e => {
                  e.persist();
                  this.onChange(e, client);
                 },
                })}
                />
              )}
            </ApolloConsumer>
            { isOpen && (
            <DropDown>
              {this.state.items.map((item, index) => (
                <DropDownItem 
                  { ...getItemProps({ item})}
                  key={ item.id }
                  highlightedIndex={index===highlightedIndex}>
                  <img src={ item.image } alt={ item.title } width="50"/>
                  { item.title }
                </DropDownItem>
              ))}
              { !this.state.items.length && 
                !this.state.loading &&
              <DropDownItem>Nothing Found for  {inputValue}</DropDownItem>
              }
            </DropDown>
            )}
          </div>
        )} 
      </DownShift>
    </SearchStyles>
    );
  }
 }


export default AutoComplete;