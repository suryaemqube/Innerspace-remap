import { Outlet, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main> {children} </main>
      <Footer />
    </>
  )
};

export default Layout;