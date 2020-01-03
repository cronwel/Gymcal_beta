import ResetConfirm from '../components/customer/ResetConfirm';

const Reset = (props) => (
  <div>
    <p>
      Reset your Password
    </p>
      <ResetConfirm resetToken={ props.query.resetToken } />
  </div>
)
export default Reset;