import ItemCreate from '../components/inventory/ItemCreate';
import Restrictions from '../components/customer/Restrictions';

const Sell = (props) => (
  <div>
    <Restrictions >
      <ItemCreate />
    </Restrictions>
  </div>
)
export default Sell;