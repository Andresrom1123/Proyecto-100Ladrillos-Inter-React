import Alert from '../components/Alert'
import BankCard from '../components/BankCard'
import { useBankAccountsLoginContext } from '../context/bank_account_login_context'
import PrivateRoute from '../components/PrivateRoute'

const WithdrawPage = () => {
  const { login_success } = useBankAccountsLoginContext()
  if (!(login_success)) {
    return (
      <PrivateRoute />
    )
  }
  return (
    <main className='px-5 py-3'>
      <Alert />
      <h1 className='text-center mb-4'>
        Retiro
      </h1>
      <BankCard type='withdraw' />
    </main>
  );
};

export default WithdrawPage;
