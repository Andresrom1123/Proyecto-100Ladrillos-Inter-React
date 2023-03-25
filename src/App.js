import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  Home,
  Layout,
  Page404,
  Balance,
  Deposit,
  Transfer,
  Withdraw,
  Menu
} from "./pages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Page404 />} />
          <Route path="/saldo" element={<Balance />} />
          <Route path="/deposito" element={<Deposit />} />
          <Route path="/transferencia" element={<Transfer />} />
          <Route path="/retiro" element={<Withdraw />} />
          <Route path="/menu" element={<Menu />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}