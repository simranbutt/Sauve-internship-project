import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";
import "./AdminLayout.css";
import { ToastContainer } from "react-toastify";

const AdminLayout = () => {
  return (
    <>
    <div className="admin-layout">
      <AdminHeader />


        <div className="admin-layout-body">
          <div className="admin-sidebar-col">
            <AdminSidebar />
          </div>

          <div className="admin-content-col">
            <main className="admin-page-content">
              <Outlet />
            </main>
          </div>
      </div>
          <ToastContainer
        position="bottom-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
    </>
  );
};

export default AdminLayout;