import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/bank_account_login_reducer";
import { base_url as url } from "../utils/constants";
import {
  GET_BANK_ACCOUNTS_BEGIN,
  GET_BANK_ACCOUNTS_SUCCESS,
  GET_BANK_ACCOUNTS_ERROR,
  VALID_BANK_LOGIN_DEBIT_SUCCESS,
  VALID_BANK_LOGIN_DEBIT_ERROR,
  POST_LOGGED_BANK_ACCOUNT,
  LOG_OUT_ACCOUNT
} from "../actions";

const getLocalStorageLoginSuccess = () => {
  let bankAccountLogin = localStorage.getItem('bankAccountLogin')
  if (bankAccountLogin) {
    return JSON.parse(localStorage.getItem('bankAccountLogin'))
  } else {
    return ""
  }
}

const getLocalStorageLoginLogged = () => {
  let bankAccountLogged = localStorage.getItem('bankAccountLogged')
  if (bankAccountLogged) {
    return JSON.parse(localStorage.getItem('bankAccountLogged'))
  } else {
    return []
  }
}

const initialState = {
  debits: [],
  debits_logged: getLocalStorageLoginLogged(),
  bank_error: false,
  bank_loading: false,
  login_success: getLocalStorageLoginSuccess(),
  login_error: false,
  login_error_msg: '',
};

const BankAccountsLoginContext = React.createContext();

export const BankAccountsLoginProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  
  const fetchDebits = async(url) => {
    dispatch({ type: GET_BANK_ACCOUNTS_BEGIN})

    try {
      const response = await axios.get(`${url}debits/`)
      const fetch_debits = response.data
      dispatch({ type: GET_BANK_ACCOUNTS_SUCCESS, payload: fetch_debits})
    } catch(error) {
      dispatch({ type: GET_BANK_ACCOUNTS_ERROR })
    }
  }

  const postLoginBankAccount = async (debit, nip) => {
    const data = {
      'debit': debit,
      'nip': nip
    }
    try {
      const response = await axios.post(`${url}login/`, data)
      dispatch({ type: VALID_BANK_LOGIN_DEBIT_SUCCESS, payload: debit })
      
    } catch(error) {
      dispatch({ type: VALID_BANK_LOGIN_DEBIT_ERROR, payload: error.response.data.error })
    }
  };

  const postLoggedBankAccount = (debit) => {
    dispatch({ type: POST_LOGGED_BANK_ACCOUNT, payload: debit })
  }

  const logOutAccount = () => {
    dispatch({ type: LOG_OUT_ACCOUNT })
  }
  
  useEffect(() => {
    fetchDebits(url)
  }, [])

  useEffect(() => {
    localStorage.setItem('bankAccountLogin', JSON.stringify(state.login_success))
  }, [state.login_success])

  useEffect(() => {
    localStorage.setItem('bankAccountLogged', JSON.stringify(state.debits_logged))
  }, [state.debits_logged])

  return (
    <BankAccountsLoginContext.Provider value={{ ...state, postLoginBankAccount, postLoggedBankAccount, logOutAccount }}>
      {children}
    </BankAccountsLoginContext.Provider>
  );
};
// make sure use
export const useBankAccountsLoginContext = () => {
  return useContext(BankAccountsLoginContext);
};
