import "./AdminHeader.css";
import { Settings, LogOut } from "lucide-react";
import logo from "../../assets/loksujag.png";
import { useState, useRef, useEffect } from "react";
export function AdminDropDown() {
  return (
    <div className="admin-profile-dropdown">

      <div className="dropdown-user">
        <h6>Amir Butt</h6>
        <p>amir.butt@loksujag.com</p>
      </div>

      <button className="dropdown-action">
       <Settings size={17} strokeWidth={2} />
        <span>Settings</span>
      </button>

      <button className="dropdown-action logout">
       <LogOut size={17} strokeWidth={2} />
        <span>Log Out</span>
      </button>

    </div>
  );
}

const AdminHeader = () => {
  const [DropDown, setDropDown] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropDown = () => {
    setDropDown(prev => !prev);
  }

  useEffect(() => {
    const handleClick = (event) => {
      if (dropdownRef.current && dropdownRef.current.contains(event.target)) {
        return;
      }
      setDropDown(false);
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <header className="admin-header">
      <div className="container-fluid">
        <div className="row align-items-center admin-header-row">

          {/* Left side */}
          <div className="col-8 d-flex align-items-center gap-3">
            <div className="d-flex align-items-center gap-3">
              <img
                src={logo}
                alt="Lok Sujag"
                className="admin-logo"
              />

              <h1 className="admin-title">Lok Sujag CMS</h1>
            </div>

            <span className="admin-badge">Admin Panel</span>
          </div>

          {/* Right side */}
          <div className="col-4 d-flex justify-content-end align-items-center gap-3">
            <button className="settings-btn">
              <Settings size={19} strokeWidth={2} />
              <span>Settings</span>
            </button>

            <div className="admin-profile-dropdown-wrapper">
              <button className="admin-avatar" ref={dropdownRef} onClick={toggleDropDown}>A</button>
              {
                DropDown && (
                  <AdminDropDown />
                )
              }
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};

export default AdminHeader;