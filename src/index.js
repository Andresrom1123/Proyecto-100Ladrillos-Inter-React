import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BankAccountsLoginProvider } from "./context/bank_account_login_context";
import { BankAccountsMenuProvider } from "./context/bank_account_menu_context";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BankAccountsLoginProvider>
    <BankAccountsMenuProvider>
      <App />
    </BankAccountsMenuProvider>
  </BankAccountsLoginProvider>
);
