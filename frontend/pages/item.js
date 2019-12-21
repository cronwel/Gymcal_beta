import ItemEach from '../components/inventory/ItemEach';

const Item = ( props ) => (
  <div>
    <ItemEach id={ props.query.id } />
  </div>
)
export default Item;