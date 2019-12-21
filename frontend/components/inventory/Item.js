import React, { Component } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Title from '../styles/Title';
import ItemStyles from '../styles/ItemStyles';
import PriceTag from '../styles/PriceTag';
import formatMoney from '../../lib/formatMoney';
import ItemDelete from './ItemDelete';
import AddToCart from '../cart/AddToCart';

class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  }
  render() {
    const { item } = this.props;
      return <ItemStyles>

        { item.image && <img src={ item.image } alt={ item.title }/> }

        <Title>
          <Link href={ { pathname: '/item', query: { id: item.id } } } >
          <a> { item.title } </a>
          </Link>
        </Title>

        <PriceTag>
            { formatMoney(item.price) }
        </PriceTag>

        <div className="buttonList">
          <Link href={{ pathname: '/update', query: { id: item.id }}} >
            <a>Edit</a>
          </Link>
          <AddToCart id={ item.id } />
          <ItemDelete id={ item.id }> Delete </ItemDelete>
        </div>
      </ItemStyles>
  }
}

export default Item;