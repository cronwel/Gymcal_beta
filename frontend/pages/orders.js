import Restrictions from '../components/customer/Restrictions';
import OrderList from '../components/purchase/OrderList';
const OrderPage = (props) => (
  <div>
    <Restrictions >
    <OrderList />
    </Restrictions>
  </div>
);
export default OrderPage;