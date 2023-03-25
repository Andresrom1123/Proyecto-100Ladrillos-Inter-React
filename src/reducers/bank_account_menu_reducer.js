import {
  POST_ACCOUNT_DEPOSIT_SUCCESS,
  POST_ACCOUNT_DEPOSIT_ERROR,
  POST_ACCOUNT_WITHDRAW_SUCCESS,  
  POST_ACCOUNT_WITHDRAW_ERROR,
  POST_ACCOUNT_TRANSFER_SUCCESS,
  POST_ACCOUNT_TRANSFER_ERROR,
  CLOSE_ALERT
} from "../actions";

const bank_accounts_menu_reducer = (state, action) => {
  if (action.type === POST_ACCOUNT_DEPOSIT_SUCCESS) {
    return {
      ...state,
      alert_type: 'success',
      alert_msg: action.payload,
      alert_active: true,
    } 
  }
  if (action.type === POST_ACCOUNT_DEPOSIT_ERROR) {
    return {
      ...state,
      alert_type: 'danger',
      alert_msg: action.payload,
      alert_active: true,
    } 
  }
  if (action.type === POST_ACCOUNT_WITHDRAW_SUCCESS) {
    const { success, data} = action.payload
    return {
      ...state,
      alert_type: 'success',
      alert_msg: success,
      alert_active: true,
      data: [data]
    } 
  }
  if (action.type === POST_ACCOUNT_WITHDRAW_ERROR) {
    return {
      ...state,
      alert_type: 'danger',
      alert_msg: action.payload,
      alert_active: true,
    } 
  }
  if (action.type === POST_ACCOUNT_TRANSFER_SUCCESS) {
    return {
      ...state,
      alert_type: 'success',
      alert_msg: action.payload,
      alert_active: true,
    } 
  }
  if (action.type === POST_ACCOUNT_TRANSFER_ERROR) {
    return {
      ...state,
      alert_type: 'danger',
      alert_msg: action.payload,
      alert_active: true,
    } 
  }
  if (action.type === CLOSE_ALERT) {
    return {
      ...state,
      alert_type: 'danger',
      alert_msg: '',
      alert_active: false,
    } 
  }
  
  return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default bank_accounts_menu_reducer;
