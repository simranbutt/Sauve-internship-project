import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import supabase from "../config/supabaseClient";
import { FiShield, FiLock } from "react-icons/fi";
import "./AdminRoute.css";

const AdminRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    setLoggedIn(true);

    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (data?.role === "admin") {
      setIsAdmin(true);
    }

    setLoading(false);
  }

  // Loading Screen
  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loader"></div>

        <h2>Verifying Access</h2>

        <p>Please wait while we verify your administrator privileges.</p>
      </div>
    );
  }

  // Not logged in
  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }

  // Logged in but not admin
  if (!isAdmin) {
    return (
      <div className="access-denied">
        <div className="access-icon">
          <FiShield />
        </div>

        <h1>Access Denied</h1>

        <p>
          You don't have permission to access the administration dashboard.
        </p>

        <button onClick={() => (window.location.href = "/")}>
          <FiLock />
          Return to Homepage
        </button>
      </div>
    );
  }

  return <Outlet />;
};

export default AdminRoute;