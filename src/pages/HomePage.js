import { useState } from "react";
import { useBankAccountsLoginContext } from '../context/bank_account_login_context'
import { Routes, Route, Navigate } from 'react-router-dom';

const HomePage = () => {
  const [data, setData] = useState({ debit: "", nip: "", repeatNip: "" });
  const {
    debits,
    bank_error,
    bank_loading,
    postLoginBankAccount,
    postLoggedBankAccount,
    login_error,
    login_success,
    login_error_msg,
    debits_logged
  } = useBankAccountsLoginContext()
  const [errors, setErrors] = useState({status: false, msg: ''})
  const [nip, setNip] = useState(false)

  const submitForm = async (event) => {
    let debitsTemp;
    let debitsLoggedTemp;
    event.preventDefault();

    if (debits_logged) {
      debitsLoggedTemp = debits_logged.filter((debit) => debit === data.debit)
    }

    if (debits_logged.length === 1) {
      await postLoggedBankAccount(data.debit)
    }
    if (debits) {
      debitsTemp = debits.filter((debit) => debit === data.debit)
    }
    if (debitsTemp.length < 1) {
      setErrors({status: true, msg: 'Número de tarjeta desconocido.'})
      return;
    }
    if (debitsTemp.length === 1) {
      setErrors({status: true, msg: ''})
      setNip(true)
    }
    if(data.nip !== data.repeatNip) {
      setErrors({status: true, msg: 'Los números secretos no coinciden'})
      return;
    }
    if (data.nip && data.debit) {
      await postLoginBankAccount(data.debit, data.nip);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  if (login_success) {
    return (
      <Routes>
        <Route path='/' element={<Navigate replace to="/menu" />} />
      </Routes>
    )
  }

  return (
    <main className='px-5 py-3'>
      <h1>Banco nuestra Alegría</h1>
      <h1>Bienvenidos</h1>
      <form
        onSubmit={submitForm}
        className="d-flex flex-column"
      >
        <div className='col-lg-6 col-10 py-5 position-relative'>
          {/* alert */}
          {(errors.status || login_error) && (
            <div className='alert warning' role="alert">
              <p>
                {errors.msg}
              </p>
              <p>
                {login_error_msg}
              </p>
            </div>
          )}

          {/* loading */}
          {bank_loading && (
            <div
              className="d-flex justify-content-center position-absolute"
              style={{ top: "50%", left: "50%", color: "var(--clr-primary-5)" }}
            >
              <div className="spinner-border"></div>
            </div>
          )}
          <span>Escriba su número de tarjeta de débito:</span>
          <div className="mb-3">
            {/* inputs */}
            <input
              required
              type="text"
              name="debit"
              className="form-control"
              placeholder="tarjeta de débito"
              value={data.debit}
              onChange={handleChange}
            />
          </div>
          {nip && (
            <>
              <span>Por favor ingresa tu nip:</span>
              <div className="mb-3">
                <input
                  required
                  type="password"
                  name="nip"
                  className="form-control"
                  placeholder="nip"
                  value={data.nip}
                  onChange={handleChange}
                />
              </div>
              <span>Introduce de nuevo tu nip:</span>
              <div className="mb-3">
                <input
                  required
                  type="password"
                  name="repeatNip"
                  className="form-control"
                  placeholder="repite tu nip"
                  value={data.repeatNip}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
        </div>
        <button
          type="submit"
          className="col-10 col-lg-6 border-0 text-white shadow rounded-bottom fs-4 btn-contact p-1"
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default HomePage;
