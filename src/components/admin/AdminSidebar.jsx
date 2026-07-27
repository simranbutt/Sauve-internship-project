import { NavLink } from "react-router-dom";
import {
  FiBarChart2,
  FiFileText,
  FiPlus,
  FiBookOpen,
  FiCopy,
  FiLayers,
  FiTag,
  FiHash,
  FiMapPin,
  FiGrid,
  FiImage,
  FiShield,
  FiUpload
} from "react-icons/fi";
import { RxPeople } from "react-icons/rx";
import { GoPerson } from "react-icons/go";
import logo from "../../assets/loksujag.png";
import { VscFileMedia } from "react-icons/vsc";
import { BsListCheck } from "react-icons/bs";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">

      <nav className="admin-sidebar-nav">
        <div className="admin-nav-group">
          <NavLink
            to="/admin"
            end
            className="admin-nav-link">
            <FiBarChart2 />
            <span>Dashboard</span>
          </NavLink>
        </div>

        <div className="admin-nav-group">
          <div className="admin-nav-heading">
            <FiFileText />
           <span> Posts</span>
            </div>

          <NavLink
            to="/admin/posts"
            className={({ isActive }) =>
              isActive ? "admin-nav-sublink active" : "admin-nav-sublink"
            }
          >
            <FiFileText />
            <span>All Posts</span>
          </NavLink>

          <NavLink
            to="/admin/create"
            className={({ isActive }) =>
              isActive ? "admin-nav-sublink active" : "admin-nav-sublink"
            }
          >
            <FiPlus />
            <span>Create Post</span>
          </NavLink>

              <NavLink
            to="/admin/site-pages"
            className={({ isActive }) =>
              isActive ? "admin-nav-sublink active" : "admin-nav-sublink"
            }
          >
            <FiCopy />
            <span>Site Pages</span>
          </NavLink>

          <NavLink
            to="/admin/site-pages/create"
            className={({ isActive }) =>
              isActive ? "admin-nav-sublink active" : "admin-nav-sublink"
            }
          >
            <FiPlus />
            <span>Create Page</span>
          </NavLink>

          <NavLink
            to="/admin/special-pages"
            className={({ isActive }) =>
              isActive ? "admin-nav-sublink active" : "admin-nav-sublink"
            }
          >
            <FiBookOpen />
            <span>Special Pages</span>
          </NavLink>

          <NavLink
            to="/admin/special-pages/create"
            className={({ isActive }) =>
              isActive ? "admin-nav-sublink active" : "admin-nav-sublink"
            }
          >
            <FiPlus />
            <span>Create Special Page</span>
          </NavLink>
        </div>

      

        <div className="admin-nav-group">
          <div className="admin-nav-heading">
            <FiLayers />
            <span>Content Management</span>
            </div>

          <NavLink
            to="/admin/categories"
            className={({ isActive }) =>
              isActive ? "admin-nav-sublink active" : "admin-nav-sublink"
            }
          >
            <FiLayers />
            <span>Categories</span>
          </NavLink>

          <NavLink
            to="/admin/hashtags"
            className={({ isActive }) =>
              isActive ? "admin-nav-sublink active" : "admin-nav-sublink"
            }
          >
            <FiHash />
            <span>Hashtags</span>
          </NavLink>

          <NavLink
            to="/admin/geotags"
            className={({ isActive }) =>
              isActive ? "admin-nav-sublink active" : "admin-nav-sublink"
            }
          >
            <FiMapPin />
            <span>Geotags</span>
          </NavLink>

          <NavLink
            to="/admin/content-types"
            className={({ isActive }) =>
              isActive ? "admin-nav-sublink active" : "admin-nav-sublink"
            }
          >
            <FiGrid />
            <span>Content Types</span>
          </NavLink>

          <NavLink
            to="/admin/homepage-tiles"
            className={({ isActive }) =>
              isActive ? "admin-nav-sublink active" : "admin-nav-sublink"
            }
          >
            <FiImage />
            <span>Homepage Tiles</span>
          </NavLink>

            <NavLink
            to="/admin/homepage-tiles"
            className={({ isActive }) =>
              isActive ? "admin-nav-sublink active" : "admin-nav-sublink"
            }
          >
            <BsListCheck />
            <span>Opinion Polls</span>
          </NavLink>
        </div>
       
      <div className="admin-nav-group">
        <div className="admin-nav-heading">
        <RxPeople />
          <span>Creator Management</span>
        </div>
          <NavLink
            to="/admin/homepage-tiles"
            className={({ isActive }) =>
              isActive ? "admin-nav-sublink active" : "admin-nav-sublink"
            }
          >
         <GoPerson />
            <span>Content Creators</span>
          </NavLink>
            <NavLink
            to="/admin/homepage-tiles"
            className={({ isActive }) =>
              isActive ? "admin-nav-sublink active" : "admin-nav-sublink"
            }
          >
           <FiShield />
            <span>Roles</span>
          </NavLink>

      </div>
           <div className="admin-nav-group">
        <div className="admin-nav-heading">
    <VscFileMedia />
          <span>Media</span>
        </div>
          <NavLink
            to="/admin/homepage-tiles"
            className={({ isActive }) =>
              isActive ? "admin-nav-sublink active" : "admin-nav-sublink"
            }
          >
       <VscFileMedia />
            <span>Media Library</span>
          </NavLink>
            <NavLink
            to="/admin/homepage-tiles"
            className={({ isActive }) =>
              isActive ? "admin-nav-sublink active" : "admin-nav-sublink"
            }
          >
           <FiUpload />
            <span>Upload Media</span>
          </NavLink>

      </div>

          <div className="admin-nav-group">
              <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive ? " admin-nav-link-users active" : "admin-nav-link-users"
            } >
             <RxPeople />
            <span>Users</span>
          </NavLink>
          </div>
        
        
      </nav>
    </aside>
  );
};

export default AdminSidebar;