import ResetPage from '../components/customer/ResetPage';

const Sell = (props) => (
  <div>
    <p>
      Reset your Password { props.query.resetToken }
    </p>
      <ResetPage resetToken={ props.query.resetToken } />
  </div>
)
export default Sell;