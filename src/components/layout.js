import Header from "./Header";
import Footer from "./Footer";

import "swiper/css/bundle";
import "swiper/css/navigation";

import "../assets/css/normalize.css";
import "../assets/css/home-common-responsive.css";
import "../assets/css/main.css";
import "../assets/css/inside.css";

import "../assets/css/uifixer.css";
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