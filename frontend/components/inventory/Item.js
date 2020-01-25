import React, { Component } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import ItemTitle from '../styles/ItemTitle';
import ItemStyles from './styles/ItemStyles';
import PriceTag from '../styles/PriceTag';
import formatMoney from '../../lib/formatMoney';
import ItemDelete from './ItemDelete';
import AddToCart from '../cart/AddToCart';
import User from '../customer/User';
import styled from 'styled-components';

const ItemContainer = styled.div`
  display: flex;
`

class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  }
  render() {
    const { item } = this.props;
      return <ItemStyles>
        <Link href={ { pathname: '/item', query: { id: item.id } } } >
          { item.image && <img src={ item.image } alt={ item.title }/> }
        </Link>
      
        <div>
          <Link href={ { pathname: '/item', query: { id: item.id } } } >
          <a> { item.title } </a>
          </Link>
        </div>

        <div>
          { formatMoney(item.price) }
        </div>

        <div >
            {/* <Link href={{ pathname: '/update', query: { id: item.id }}} >
              <a>Edit</a>
            </Link> */}
            {/* <ItemDelete id={ item.id }> Delete </ItemDelete> */}
              <AddToCart id={ item.id } />
        </div>
      </ItemStyles>
  }
}

export default Item;