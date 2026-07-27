import {
  FiFileText,
  FiCheckCircle,
  FiEdit3,
  FiPlus,
  FiClock,
  FiSearch,
  FiChevronDown,
  FiCheck,
  FiEyeOff,
  FiEdit2,
  FiEye,
  FiUpload,
  FiCopy,
  FiTrash2,
  FiGlobe,
  FiMoreHorizontal
} from "react-icons/fi";
import './AllPosts.css'
import StatCard from "../../components/admin/StatCard";
import feature from '../../assets/feature.jpeg'
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import supabase from "../../config/supabaseClient";
import { useNavigate } from "react-router-dom";



const statusConfig = {
  published: {
    icon: <FiCheckCircle />,
    className: "published",
  },

  unpublished: {
    icon: <FiEyeOff />,
    className: "unpublished",
  },

  draft: {
    icon: <FiEdit3 />,
    className: "draft",
  },

  scheduled: {
    icon: <FiClock />,
    className: "scheduled",
  },
};

export function StatusBadge({ status }) {
  const config = statusConfig[status];

  return (
    <span className={`status-badge ${config.className}`}>
      {config.icon}
      <span>{status}</span>
    </span>
  );
}



export function ActionDropdown({ status, postId, navigate,onDelete }) {
  const [open, setOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    {
      label: "View",
      icon: <FiEye />
    },
    {
      label: "Edit",
      icon: <FiEdit2 />
    },

    ...(status === "draft"
      ? [
        {
          label: "Publish",
          icon: <FiUpload />
        }
      ]
      : []),

    {
      label: "Duplicate",
      icon: <FiCopy />
    },
    {
      label: "Delete",
      icon: <FiTrash2 />
    }
  ];
  const handleToggle = () => {
    if (!dropdownRef.current) return;

    const rect = dropdownRef.current.getBoundingClientRect();

    const spaceBelow = window.innerHeight - rect.bottom;

    const menuHeight = 220; // approximate height

    setOpenUp(spaceBelow < menuHeight);

    setOpen(!open);
  };

  const handleDropDownClick = (item) => {

  if(item.label === "Edit"){
    navigate(`/admin/posts/edit/${postId}`);
  }
   if(item.label === "Delete"){
    onDelete(postId);
  }

  setOpen(false);
};
  return (
    <div className="action-dropdown" ref={dropdownRef}>

      <button
        className="action-button"
        onClick={handleToggle}
      >
        <FiMoreHorizontal />
      </button>

      {open && (
        <div
          className={`action-menu ${openUp ? "top" : "bottom"
            }`}>

          {menuItems.map(item => (

            <button
              key={item.label}
              className="action-item"
           onClick={() => handleDropDownClick(item)}
            >
              {item.icon}

              <span>{item.label}</span>

            </button>

          ))}

        </div>
      )}

    </div>
  );
}

const FilterDropdown = ({
  placeholder,
  options,
  value,
  onChange,
  icon = null,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="filter-dropdown" ref={dropdownRef}>
      <button
        className="filter-button"
        onClick={() => setOpen(!open)}
      >
        <span className="filter-label">
          {icon}
          {value}
        </span>

        <FiChevronDown />
      </button>

      {open && (
        <div className="filter-menu">
          {options.map((option) => (
            <button
              key={option}
              className={`filter-item ${value === option ? "active" : ""}`}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
            >
              <span className="check-icon">
                {value === option && <FiCheck />}
              </span>

              <span>{option}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};



export function AllPosts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("All statuses");
  const [contentType, setContentType] = useState("All content types");
  const [language, setLanguage] = useState("All languages");
  const [geotag, setGeotag] = useState("All geotags");

  const [highlight, setHighlight] = useState("All posts (highlights)");
  const [poll, setPoll] = useState("All opinion polls");
  const [creator, setCreator] = useState("All content creators");
  const [hashtag, setHashtag] = useState("All hashtags");
  const statusOptions = [
    "All statuses",
    "Published",
    "Drafts",
    "Scheduled",
    "Unpublished",
  ];

  const contentTypeOptions = [
    "All content types",
    "Article",
    "Video",
    "Podcast",
  ];

  const languageOptions = [
    "All languages",
    "English",
    "Urdu",
  ];

  const geotagOptions = [
    "All geotags",
    "Lahore",
    "Karachi",
    "Islamabad"
  ];

  const highlightOptions = [
    "All posts (highlights)",
    "Featured Only",
    "Pinned Only",
    "Special Reports Only"
  ];

  const pollOptions = [
    "All opinion polls",
    "No opinion poll",
    "Has opinion poll",
    "Reason for rising inflation-Do you think the recent increase in fuel prices in Pakistan is the main reason for rising inflation?",
    "Climate change-How can Pakistan protect itself from the impact of climate change?",
    "Source of green energy-What is the best source of green energy?",
    "Energy type-Which energy type is best?"
  ];

  const creatorOptions = [
    "All content creators",
    "Ali",
    "Sara",
    "Ahmed",
  ];

  const hashtagOptions = [
    "All hashtags",
    "#news",
    "#politics",
    "#sports",
  ];

  const fetchPosts = async () => {
    console.log("Fetching posts...");
    const { data, error } = await supabase.from('postTable').select('*').order("created_at", { ascending: false })
    if (error) {
      toast.error("Failed to load posts.");
      console.error(error);
      return;
    }
    console.log(data)
    setPosts(data)
  };
  useEffect(() => {
    console.log("useEffect ran");
    fetchPosts();
  }, []);


  const totalPosts = posts.length;

  const numOfPublishedPosts = posts.filter(
    post => post.status === "published"
  ).length;

  const numOfDrafts = posts.filter(
    post => post.status === "draft"
  ).length;

  const numOfScheduledPosts = posts.filter(
    post => post.status === "scheduled"
  ).length;
const handleDeletePost = async (postId) => {

    const confirmed = window.confirm(
        "Are you sure you want to delete this post?"
    );

    if (!confirmed) return;

    const { error } = await supabase
        .from("postTable")
        .delete()
        .eq("id", postId);

    if (error) {
        console.log(error);
        toast.error("Failed to delete post");
        return;
    }

    setPosts(prev =>
        prev.filter(post => post.id !== postId)
    );

    toast.success("Post deleted successfully");
};
  return (
    <>
      <div className="all-post-header">
        <div className="d-flex flex-column">
          <h1 style={{ color: 'hsl(220 90% 56%)', fontSize: '24px', fontWeight: '700' }}>Posts Management</h1>
          <p>Manage all posts, drafts, and scheduled content</p>
        </div>
        <button className="create-post-btn">
          <FiPlus />
          <span>Create post</span>
        </button>
      </div>
      <div className="d-flex flex-column gap-3">
        <div className="cards">
          <div className="all-posts-cards d-flex gap-2">

            <StatCard
              title="Total Posts"
              value={totalPosts}
              color="#2563eb"
              icon={<FiFileText />}
            />

            <StatCard
              title="Published"
              value={numOfPublishedPosts}
              color="#16a34a"
              icon={<FiCheckCircle />}
            />

            <StatCard
              title="Drafts"
              value={numOfDrafts}
              color="#d97706"
              icon={<FiEdit3 />}
            />
            <StatCard
              title="Scheduled"
              value={numOfScheduledPosts}
              color="#2563eb"
              icon={<FiClock />}
            />
          </div>
        </div>
        <div className="posts-selection-table">
          <div className="search-box">
            <FiSearch className="search-icon" />

            <input
              type="search"
              placeholder="Search title, excerpt, slug..."
            />
          </div>


          <div className="filters-grid">
            <FilterDropdown
              value={status}
              options={statusOptions}
              onChange={setStatus}
            />

            <FilterDropdown
              value={contentType}
              options={contentTypeOptions}
              onChange={setContentType}
            />

            <FilterDropdown
              value={language}
              options={languageOptions}
              onChange={setLanguage}
            />

            <FilterDropdown
              value={geotag}
              options={geotagOptions}
              onChange={setGeotag}
            />

            <FilterDropdown
              value={highlight}
              options={highlightOptions}
              onChange={setHighlight}
            />

            <FilterDropdown
              value={poll}
              options={pollOptions}
              onChange={setPoll}
            />

            <FilterDropdown
              value={creator}
              options={creatorOptions}
              onChange={setCreator}
            />

            <FilterDropdown
              value={hashtag}
              options={hashtagOptions}
              onChange={setHashtag}
            />
          </div>
        </div>
        <div style={{ marginTop: '24px', backgroundColor: '#ffff', borderRadius: '8px' }}>
          <div style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '20px' }}>Posts</h3>
          </div>
          <div>
            <div className="post-table-container">
              <table className="posts-table">
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th>Posts</th>
                    <th>Creator</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map(post => (
                    <tr key={post.id}>

                      <td> <input type="checkbox" /></td>
                      <td>
                        <div className="post-info">

                          <img
                            src="https://placehold.co/80x60"
                            alt=""
                            className="post-thumbnail"
                          />

                          <div className="post-content">

                            <h6 className="post-title">
                              {post.meta_title}
                            </h6>

                            <div className="post-badges">

                              <span className="post-badge">
                                <img src={feature} style={{ width: '17px', height: '17px', borderRadius: '50%' }} />
                                Feature
                              </span>

                              <span className="post-badge">
                                <FiGlobe />
                                UR
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="creator-info">

                          <div className="creator-avatar">
                            U
                          </div>

                          <div className="creator-details">
                            <span className="creator-name">
                              Umar Bacha
                            </span>
                          </div>

                        </div>
                      </td>
                      <td>
                        <StatusBadge status={post.status} />
                      </td>
                      <td>
                        <ActionDropdown
                          status={post.status}
                          postId={post.id}
                          navigate={navigate}
                          onDelete={handleDeletePost}
                        />
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>

      </div>
    </>
  )

}

export default AllPosts;