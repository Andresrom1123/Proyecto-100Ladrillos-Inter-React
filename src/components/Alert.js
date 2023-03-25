import { useState } from "react";
import { useBankAccountsMenuContext } from '../context/bank_account_menu_context'

const Alert = () => {
  const { alert_type, alert_msg, alert_active, closeAlert, data } = useBankAccountsMenuContext()
  return (
    <>
    { alert_active && (
      <div className={`alert alert-${alert_type} alert-dismissible fade show`}>
        {alert_msg}
        <button type="button" onClick={() => closeAlert()} className="btn-close"></button>
      </div>
    )}
    </>
  );
};

export default Alert