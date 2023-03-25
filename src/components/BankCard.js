import { useState, useEffect } from "react";

const BankCard = ({ type }) => {
  const [data, setData] = useState({ amount: 0, debit: "" });
  const [action, setAction] = useState('');

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
    </div>
  );
};

export default BankCard;