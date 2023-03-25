import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const LayoutPage = () => {
  return (
    <main>
      <Header />
      <div className='my-5'>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default LayoutPage;