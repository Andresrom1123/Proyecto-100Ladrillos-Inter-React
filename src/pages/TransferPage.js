import BankCard from '../components/BankCard'
import PrivateRoute from '../components/PrivateRoute'
import { useBankAccountsLoginContext } from '../context/bank_account_login_context'


const TransferPage = () => {
  const { login_success } = useBankAccountsLoginContext()
  if (!(login_success)) {
    return (
      <PrivateRoute />
    )
  }
  return (
    <main className='px-5 py-3'>
      <h1 className='text-center mb-4'>
        Transferencia
      </h1>
      <BankCard type='transfer' />
    </main>
  );
};

export default TransferPage;
