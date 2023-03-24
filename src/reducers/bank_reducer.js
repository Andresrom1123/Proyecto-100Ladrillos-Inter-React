import {
  GET_BANK_ACCOUNTS_BEGIN,
  GET_BANK_ACCOUNTS_SUCCESS,
  GET_BANK_ACCOUNTS_ERROR
} from "../actions";

const bank_accounts_reducer = (state, action) => {
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
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default bank_accounts_reducer;
