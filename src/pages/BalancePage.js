import PrivateRoute from '../components/PrivateRoute'
import { useBankAccountsLoginContext } from '../context/bank_account_login_context'

const BalancePage = () => {
  const { login_success } = useBankAccountsLoginContext()
  if (!(login_success)) {
    return (
      <PrivateRoute />
    )
  }
  return (
    <main className='px-5 py-3'>
      Balance page
    </main>
  );
};

export default BalancePage;
