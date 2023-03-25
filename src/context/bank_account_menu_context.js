import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/bank_account_menu_reducer";
import { base_url as url } from "../utils/constants";
import { useBankAccountsLoginContext } from './bank_account_login_context'

import {
  POST_ACCOUNT_DEPOSIT_SUCCESS,
  POST_ACCOUNT_DEPOSIT_ERROR,
  POST_ACCOUNT_WITHDRAW_SUCCESS,
  POST_ACCOUNT_WITHDRAW_ERROR,
  CLOSE_ALERT
} from "../actions";

const initialState = {
  alert_type: '',
  alert_msg: '',
  alert_active: false,
  data: []
};

const BankAccountsMenuContext = React.createContext();

export const BankAccountsMenuProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { login_success } = useBankAccountsLoginContext()

  const postAccoutDeposit = async (amount) => {
    try {
      const response = await axios.post(`${url}deposit/${login_success}/`, {'deposit': amount})
      const { success } = response.data
      dispatch({ type: POST_ACCOUNT_DEPOSIT_SUCCESS, payload: success })
      
    } catch(error) {
      dispatch({ type: POST_ACCOUNT_DEPOSIT_ERROR, payload: error.response.data.error })
    }
  }

  const postAccoutWithdraw = async (amount) => {
    try {
      const response = await axios.post(`${url}withdraw/${login_success}/`, {'withdraw': amount})
      const { success, data } = response.data
      dispatch({ type: POST_ACCOUNT_WITHDRAW_SUCCESS, payload: {success, data} })
      
    } catch(error) {
      dispatch({ type: POST_ACCOUNT_WITHDRAW_ERROR, payload: error.response.data.error })
    }
  }

  const closeAlert = () => {
    dispatch({ type: CLOSE_ALERT })
  }

  return (
    <BankAccountsMenuContext.Provider value={{ ...state, postAccoutDeposit, postAccoutWithdraw, closeAlert }}>
      {children}
    </BankAccountsMenuContext.Provider>
  );
};
// make sure use
export const useBankAccountsMenuContext = () => {
  return useContext(BankAccountsMenuContext);
};
