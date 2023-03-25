import PrivateRoute from '../components/PrivateRoute'
import { useBankAccountsLoginContext } from '../context/bank_account_login_context'
import { NavLink } from "react-router-dom";


const MenuPage = () => {
  const menu = [
    {
      url: '/deposito',
      name: 'Déposito'
    },
    {
      url: '/retiro',
      name: 'Retiro'
    },
    {
      url: '/saldo',
      name: 'Saldo'
    },
    {
      url: '/transferencia',
      name: 'Transferencia'
    },
  ]
  const { login_success } = useBankAccountsLoginContext()
  if (!(login_success)) {
    return (
      <PrivateRoute />
    )
  }
  return (
    <main className='px-5 py-3'>
      <h1 className='text-center'>
        Menú principal
      </h1>
      <div className="align-items-center flex-column d-flex">
        {
          menu.map((m, index) => {
            return (
              <NavLink
                  to={m.url}
                  className="col-10 my-2 col-lg-6 border-0 text-white shadow rounded-bottom fs-4 btn-dark p-1 text-decoration-none text-center"
                >
                  {m.name}
                </NavLink>
              )
          })

        }
        <NavLink
          to="/"
          className="col-10 my-2 col-lg-6 border-0 text-white shadow rounded-bottom fs-4 btn-dark p-1 text-decoration-none text-center"
        >
          Salir
        </NavLink>
      </div>
    </main>
  );
};

export default MenuPage;
