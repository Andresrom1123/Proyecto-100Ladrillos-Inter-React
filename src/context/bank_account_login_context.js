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
} from "../actions";

const getLocalStorageLoginSuccess = () => {
  let bankAccountLogin = localStorage.getItem('bankAccountLogin')
  if (bankAccountLogin) {
    return JSON.parse(localStorage.getItem('bankAccountLogin'))
  } else {
    return ""
  }
}

const initialState = {
  debits: [],
  debits_logged: [],
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


  
  useEffect(() => {
    fetchDebits(url)
  }, [])

  useEffect(() => {
    localStorage.setItem('bankAccountLogin', JSON.stringify(state.login_success))
  }, [state.login_success])

  return (
    <BankAccountsLoginContext.Provider value={{ ...state, postLoginBankAccount }}>
      {children}
    </BankAccountsLoginContext.Provider>
  );
};
// make sure use
export const useBankAccountsLoginContext = () => {
  return useContext(BankAccountsLoginContext);
};
