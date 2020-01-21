import React, { Component } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import ItemTitle from '../styles/ItemTitle';
import ItemStyles from '../styles/ItemStyles';
import PriceTag from '../styles/PriceTag';
import formatMoney from '../../lib/formatMoney';
import ItemDelete from './ItemDelete';
import AddToCart from '../cart/AddToCart';
import User from '../customer/User';

class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  }

  
  render() {
    const { item } = this.props;
      return <ItemStyles>

        { item.image && <img src={ item.image } alt={ item.title }/> }

        <ItemTitle>
          <Link href={ { pathname: '/item', query: { id: item.id } } } >
          <a> { item.title } </a>
          </Link>
        </ItemTitle>

        <PriceTag>
            { formatMoney(item.price) }
        </PriceTag>

        <div className="buttonList">
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