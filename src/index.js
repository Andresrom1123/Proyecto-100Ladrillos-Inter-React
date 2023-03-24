import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BankAccountsProvider } from "./context/bank_context";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BankAccountsProvider>
    <App />
  </BankAccountsProvider>
);
