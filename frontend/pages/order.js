import Restrictions from '../components/customer/Restrictions';
import Order from '../components/purchase/Order';
const OrderPage = (props) => (
  <div>
    <Restrictions >
       <p>
       Hey look, you know what this is this is the id on the Order component  <Order id={ props.query.id }/>
       </p>
    </Restrictions>
  </div>
);
export default OrderPage;