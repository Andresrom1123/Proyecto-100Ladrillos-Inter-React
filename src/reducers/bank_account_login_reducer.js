import {
  GET_BANK_ACCOUNTS_BEGIN,
  GET_BANK_ACCOUNTS_SUCCESS,
  GET_BANK_ACCOUNTS_ERROR,
  VALID_BANK_LOGIN_DEBIT_SUCCESS,
  VALID_BANK_LOGIN_DEBIT_ERROR,
} from "../actions";

const bank_accounts_login_reducer = (state, action) => {
  if (action.type === GET_BANK_ACCOUNTS_BEGIN) {
    return { ...state, bank_loading: true}  
  }
  if (action.type === GET_BANK_ACCOUNTS_SUCCESS) {
    return {
      ...state,
      bank_loading: false,
      debits: action.payload
    } 
  }
  if (action.type === GET_BANK_ACCOUNTS_ERROR) {
    return { ...state, bank_loading: false, bank_error: true}  
  }
  if (action.type === VALID_BANK_LOGIN_DEBIT_SUCCESS) {
    return {
      ...state,
      login_error_msg: '',
      login_success: true,
      login_error: false,
      debits_logged: [...state.debits_logged, action.payload]
    }
  }
  if (action.type === VALID_BANK_LOGIN_DEBIT_ERROR) {
    return {
      ...state,
      login_error_msg: action.payload,
      login_success: false,
      login_error: true,
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default bank_accounts_login_reducer;
