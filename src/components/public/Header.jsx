import { FiHome } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../../assets/loksujag.png";
import { useState } from "react";
import "./Header.css";
import AuthModal from "./AuthModal";
import { useAuth } from "../../context/AuthContext";

export function Header({ language, toggleLanguage }) {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  return (
    <header className="head">
      <div className="container">
        <div className="row">
          <div className="col-1">
            <div className="homeicon">
              <Link to="/" className="home-link">
                <FiHome size={20} />
              </Link>
            </div>
          </div>
          <div className="col-9">
            <div className="Sujaglogo">
              <div className="logo-block">
                <Link to="/" className="logo-link">
                  <img
                    src={logo}
                    alt="Lok Sujag"
                    style={{ width: "130px" }}
                  />
                </Link>
              </div>
            </div>
          </div>

          <div className="col-2">
            <div className="headerbuttons">
              <button className="urdu" type="button" onClick={toggleLanguage}>{language === 'urdu' ? 'اوردو' : 'ENG'}</button>
              {!user && (
                <button className="Sign" type="button" onClick={() => setShowModal(true)}>
                  Sign in
                </button>
              )}
              {showModal && (
                <AuthModal
                  onClose={() => setShowModal(false)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;