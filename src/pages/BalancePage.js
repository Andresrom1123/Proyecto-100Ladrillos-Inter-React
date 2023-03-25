import React, { useEffect, useState } from "react";
import PrivateRoute from '../components/PrivateRoute'
import axios from "axios";
import { useBankAccountsLoginContext } from '../context/bank_account_login_context'
import { base_url as url } from "../utils/constants";

const BalancePage = () => {
  const [data, setData] = useState('');
  const { login_success } = useBankAccountsLoginContext()


  const fetchBalance = async (url) => {
    try {
      const response = await axios.get(`${url}balance/${login_success}/`)
      const { success } = response.data
      setData(success)
    } catch(error) {
      setData(error.response.data.error)
    }
  }
  useEffect(() => {
    fetchBalance(url)
  }, [])
  if (!(login_success)) {
    return (
      <PrivateRoute />
    )
  }
  return (
    <main className='px-5 py-3'>
      {data}
    </main>
  );
};

export default BalancePage;
