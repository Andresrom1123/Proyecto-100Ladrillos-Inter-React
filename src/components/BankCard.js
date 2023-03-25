import { useState, useEffect } from "react";
import { useBankAccountsMenuContext } from '../context/bank_account_menu_context'

const BankCard = ({ type }) => {
  const [data, setData] = useState({ amount: 0, debit: "" });
  const [action, setAction] = useState('');

  const { postAccoutDeposit, postAccoutWithdraw } = useBankAccountsMenuContext()

  const submitForm = async (event) => {
    event.preventDefault();
    if (type === 'deposit') {
      postAccoutDeposit(data.amount)
    }
    if (type === 'withdraw') {
      postAccoutWithdraw(data.amount)
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    if (type === 'deposit') {
      setAction('depositar')
    }
    if (type === 'withdraw') {
      setAction('retirar')
    }
    if (type === 'transfer') {
      setAction('transferir')
    }
  }, [])
  return (
    <form
      onSubmit={submitForm}
    >
      <div className="align-items-center flex-column d-flex">
        {
          type === 'transfer' && (
          <>          
            <span>
              Escriba el número de cuenta a la que desea transferir:
            </span>
            <div className="mb-3">
              <input
                required
                type="text"
                name="debit"
                className="form-control"
                value={data.debit}
                onChange={handleChange}
              />
            </div>
          </>
        )}
        <span>
          Escriba la cantidad a {action}
        </span>
        <div className="mb-3">
          <input
            required
            type="number"
            name="amount"
            className="form-control"
            value={data.amount}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="col-3 border-0 text-white shadow rounded-bottom fs-4 btn-dark p-1"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default BankCard;