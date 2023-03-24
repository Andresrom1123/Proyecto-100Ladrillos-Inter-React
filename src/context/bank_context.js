import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/bank_reducer";
import { bank_account_url as url } from "../utils/constants";
import {
  GET_BANK_ACCOUNTS_BEGIN,
  GET_BANK_ACCOUNTS_SUCCESS,
  GET_BANK_ACCOUNTS_ERROR
} from "../actions";

const initialState = {
  debits: [],
  bank_error: false,
  bank_loading: false
};

const BankAccountsContext = React.createContext();

export const BankAccountsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  
  const fetchDebits = async(url) => {
    dispatch({ type: GET_BANK_ACCOUNTS_BEGIN})

    try {
      const response = await axios.get(url)
      const fetch_debits = response.data
      dispatch({ type: GET_BANK_ACCOUNTS_SUCCESS, payload: fetch_debits})
    } catch(error) {
      dispatch({ type: GET_BANK_ACCOUNTS_ERROR })
    }
  }

  
  useEffect(() => {
    fetchDebits(url)
  }, [])

  return (
    <BankAccountsContext.Provider value={{ ...state }}>
      {children}
    </BankAccountsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(BankAccountsContext);
};
