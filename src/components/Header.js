import { useBankAccountsLoginContext } from '../context/bank_account_login_context'
import { NavLink } from "react-router-dom";

const Header = () => {
  const {
    login_success,
  } = useBankAccountsLoginContext()
  return (
    <header className='p-5 border-bottom d-flex justify-content-between'>
      <h3>Prueba 100 ladrillos</h3>
      {
        login_success && (
        <NavLink to='/menu' className='text-muted text-decoration-none'>
          Menú
        </NavLink>
      )}
    </header>
  );
};

export default Header;