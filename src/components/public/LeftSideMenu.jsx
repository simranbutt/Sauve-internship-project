import supabase from '../../config/supabaseClient';
import videoImage from '../../assets/video.jpeg';
import feature from '../../assets/feature.jpeg';
import announce from '../../assets/Announcement.jpeg';
import datawatch from '../../assets/datawatch.jpeg';
import webinar from '../../assets/webinar.jpeg';
import document from '../../assets/documentary.jpeg';
import frontpage from '../../assets/frontpage.jpeg';
import locallens from '../../assets/locallens.jpeg';
import podcast from '../../assets/podcast.jpeg';
import { FaRegBookmark } from "react-icons/fa";
import { FiUser, FiLogOut, FiChevronUp } from "react-icons/fi";
import './LeftSideMenu.css';
import { useNavigate } from "react-router-dom";
import AuthModal from './AuthModal';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Profile from '../../pages/public/Profile';

export function LeftSideMenu({ language }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const isUrdu = language === 'urdu';
  const firstName = user?.user_metadata?.full_name?.split(" ")[0];

  const handleMemberClick = () => {
    if (user) {
      setShowUserMenu((prev) => !prev);
    } else {
      setShowModal(true);
    }
  };

  const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error.message);
    return;
  }

  setShowUserMenu(false);
};
  return (
    // <div className="col-3">
      <div className="sidebar" dir={isUrdu ? 'rtl' : 'ltr'}>

        <button
          className={`btn-cta btn-join-member ${isUrdu ? 'urdu-text' : ''}`}
          onClick={handleMemberClick} style={{display:'flex', justifyContent:'space-between'}}
        >
          {user ? (
            <>
              <span>{firstName + "'s page"}</span>
              <FiChevronUp style={{transform:'translateY(7px)'}}/>
            </>
          ) : (
            isUrdu ? 'ہمارے ممبر بنیں' : 'Join us as member'
          )}
        </button>

        {user && showUserMenu && (
          <div className="user-dropdown">
            <button className="user-dropdown-item">
              <FaRegBookmark />
              <span>My Bookmarks</span>
            </button>

            <button className="user-dropdown-item"  onClick={() => {navigate("/profile"); setShowUserMenu(false);}}>
              <FiUser />
              <span>Profile</span>
            </button>

            <button className="user-dropdown-item" onClick={handleLogout}>
              <FiLogOut />
              <span>Log out</span>
            </button>
          </div>
        )}

        {showModal && (
          <AuthModal onClose={() => setShowModal(false)} />
        )}

        <button className={`btn-cta btn-join-creator ${isUrdu ? 'urdu-text' : ''}`}
          onClick={() => navigate("/join-creator")}
        >
          {isUrdu ? 'ہمارے ساتھ کام کریں' : 'Join us as creator'}
        </button>

        <button
          className={`btn-cta btn-creators ${isUrdu ? 'urdu-text' : ''}`}
          onClick={() => navigate("/content-creators")}
        >
          {isUrdu ? 'ہمارے تخلیق کار' : 'Our content creators'}
        </button>

        <div className='boxx'>
          <div className="boxin">
            <input
              type="text"
              className={`search-input search ${isUrdu ? 'search-urdu' : ''}`}
              placeholder={isUrdu ? 'تلاش کریں' : 'Write search word'}
              dir={isUrdu ? 'rtl' : 'ltr'}
            />
            <button className="btn btn-go">
              {isUrdu ? 'جائیں' : 'Go'}
            </button>
          </div>
        </div>

        <button
          className={`btn-category ${isUrdu ? 'btn-category-urdu' : ''}`}
          dir={isUrdu ? 'rtl' : 'ltr'}
        >
          <img src={videoImage} alt="Video" className="btn-icon" />
          <span>{isUrdu ? 'ویڈیو' : 'Video'}</span>
        </button>

        <button
          className={`btn-category ${isUrdu ? 'btn-category-urdu' : ''}`}
          dir={isUrdu ? 'rtl' : 'ltr'}
        >
          <img src={feature} alt="Feature" className="btn-icon" />
          <span>{isUrdu ? 'فیچر' : 'Feature'}</span>
        </button>

        <button
          className={`btn-category ${isUrdu ? 'btn-category-urdu' : ''}`}
          dir={isUrdu ? 'rtl' : 'ltr'}
        >
          <img src={locallens} alt="Local Lens" className="btn-icon" />
          <span>{isUrdu ? 'لوکل لینز' : 'Local Lens'}</span>
        </button>

        <button
          className={`btn-category ${isUrdu ? 'btn-category-urdu' : ''}`}
          dir={isUrdu ? 'rtl' : 'ltr'}
        >
          <img src={datawatch} alt="Data Watch" className="btn-icon" />
          <span>{isUrdu ? 'ڈیٹا واچ' : 'Data Watch'}</span>
        </button>

        <button
          className={`btn-category ${isUrdu ? 'btn-category-urdu' : ''}`}
          dir={isUrdu ? 'rtl' : 'ltr'}
        >
          <img src={document} alt="Documentary" className="btn-icon" />
          <span>{isUrdu ? 'ڈاکومینٹری' : 'Documentary'}</span>
        </button>

        <button
          className={`btn-category ${isUrdu ? 'btn-category-urdu' : ''}`}
          dir={isUrdu ? 'rtl' : 'ltr'}
        >
          <img src={podcast} alt="Podcast" className="btn-icon" />
          <span>{isUrdu ? 'پوڈکاسٹ' : 'Podcast'}</span>
        </button>

        <button
          className={`btn-category ${isUrdu ? 'btn-category-urdu' : ''}`}
          dir={isUrdu ? 'rtl' : 'ltr'}
        >
          <img src={webinar} alt="Webinar" className="btn-icon" />
          <span>{isUrdu ? 'ویبنار' : 'Webinar'}</span>
        </button>

        <button
          className={`btn-category ${isUrdu ? 'btn-category-urdu' : ''}`}
          dir={isUrdu ? 'rtl' : 'ltr'}
        >
          <img src={frontpage} alt="Frontpage" className="btn-icon" />
          <span>{isUrdu ? 'فرنٹ پیج' : 'Frontpage'}</span>
        </button>

        <button
          className={`btn-category ${isUrdu ? 'btn-category-urdu' : ''}`}
          dir={isUrdu ? 'rtl' : 'ltr'}
        >
          <img src={announce} alt="Announcement" className="btn-icon" />
          <span>{isUrdu ? 'اعلان' : 'Announcement'}</span>
        </button>

        <button className={`btn-rm ${isUrdu ? 'urdu-text' : ''}`}>
          {isUrdu ? 'ہمارے بارے میں' : 'About Us'}
        </button>

        <button className={`btn-rm ${isUrdu ? 'urdu-text' : ''}`}>
          {isUrdu ? 'ضابطۂ اخلاق' : 'Code of conduct'}
        </button>

        <button className={`btn-rm ${isUrdu ? 'urdu-text' : ''}`}>
          {isUrdu ? 'پرائیویسی پالیسی' : 'Privacy Policy'}
        </button>

        <button className={`btn-rm ${isUrdu ? 'urdu-text' : ''}`}>
          {isUrdu ? 'استعمال کی شرائط' : 'Terms of Use'}
        </button>

        <button className={`btn-rm ${isUrdu ? 'urdu-text' : ''}`}>
          {isUrdu ? 'جابز' : 'Jobs'}
        </button>

        <button className={`btn-rm ${isUrdu ? 'urdu-text' : ''}`}>
          {isUrdu ? 'انٹرن شپس' : 'Internships'}
        </button>

        <button className={`btn-rm ${isUrdu ? 'urdu-text' : ''}`}>
          {isUrdu ? 'ہم سے رابطہ کریں' : 'Contact Us'}
        </button>

      </div>
    // </div>
  );
}

export default LeftSideMenu;