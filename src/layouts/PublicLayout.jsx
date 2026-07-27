import { Outlet } from "react-router-dom";
import Header from "../components/public/Header";
import Footer from "../components/public/Footer";
import LeftSideMenu from "../components/public/LeftSideMenu";
import RightSideMenu from "../components/public/RightSideMenu";
import "./PublicLayout.css";

const PublicLayout = () => {
  return (
    <div className="public-layout">
      <Header />

      <main className="public-layout-main">
        <div className="container-fluid">
          <div className="row gx-4">
            <div className="col-3">
              <LeftSideMenu />
            </div>

             <div className="col-6">
              <Outlet />
            </div>

            <div className="col-3">
              <RightSideMenu />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;