import supabase from "../../config/supabaseClient";

import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Profile.css";

export default function Profile() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [fullName, setFullName] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("");
    const [avatarFile, setAvatarFile] = useState(null);
    const [removeAvatar, setRemoveAvatar] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const fileInputRef = useRef(null);


    useEffect(() => {
        if (user) {
            setFullName(user.user_metadata?.full_name || "");
            setAvatarPreview(user.user_metadata?.avatar_url || "");
            setAvatarFile(null);
            setRemoveAvatar(false);
        }
    }, [user]);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
        setRemoveAvatar(false);
    };

    const handleRemoveAvatar = () => {
        setAvatarFile(null);
        setAvatarPreview("");
        setRemoveAvatar(true);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setMessage("");
        if (!user) return;
        setSaving(true);
        let avatarUrl = user.user_metadata?.avatar_url || "";
        
        if (removeAvatar) {
            if (avatarPath) {
                const { error: deleteError } = await supabase.storage
                    .from("avatars")
                    .remove([avatarPath]);

                if (deleteError) {
                    alert(deleteError.message);
                    setSaving(false);
                    return;
                }
            }

            avatarUrl = "";
            avatarPath = "";
        }
        //upload block
        if (avatarFile) {
            const fileExt = avatarFile.name.split(".").pop();  //file extension
            const fileName = `${user.id}-${Date.now()}.${fileExt}`;//user.id helps identify which file belongs to which user and date.now keeps each filename unique
            const filePath = fileName;

            const { error: uploadError } = await supabase.storage
                .from("avatars")
                .upload(filePath, avatarFile);

            if (uploadError) {
                alert(uploadError.message);
                setSaving(false);
                return;
            }
            const { data: publicUrlData } = supabase.storage
                .from("avatars")
                .getPublicUrl(filePath);

            avatarUrl = publicUrlData.publicUrl;
            avatarPath = filePath;
        }
        //upload block end
        const { data, error } = await supabase.auth.updateUser({
            data: {
                full_name: fullName,
                avatar_url: avatarUrl,
                avatar_path: avatarPath,
            },
        });
        if (error) {
            setMessage(error.message);
            setSaving(false);
            return;
        }
        setMessage("Profile updated successfully");
        setSaving(false);
    };

    return (
        // <div className="col-6">
            <div className="profile-page">
                <div className="profile-header">
                    <button className="profile-back-btn" onClick={() => navigate(-1)}>
                        <FiArrowLeft size={20} />
                    </button>
                    <h1>Profile Settings</h1>
                </div>

                <div className="profile-card">
                    <h2>Personal Information</h2>
                    <p className="profile-subtitle">
                        Update your profile picture and personal details
                    </p>

                    <form className="profile-form" onSubmit={handleSaveProfile}>
                        <div className="form-group">
                            <label>Avatar Image</label>
                            <div className="avatar-row">
                                <div className="avatar-circle">
                                    {avatarPreview ? (
                                        <img src={avatarPreview} alt="Profile avatar" className="avatar-image" />
                                    ) : fullName ? (
                                        fullName
                                            .split(" ")
                                            .map((word) => word[0])
                                            .join("")
                                            .slice(0, 2)
                                            .toUpperCase()
                                    ) : (
                                        "U"
                                    )}
                                </div>

                                <div className="avatar-upload">
                                    <input type="file" accept="image/*" onChange={handleAvatarChange} ref={fileInputRef} />
                                    <p>Upload a profile picture (JPEG, PNG, WebP, or GIF, max 5MB)</p>
                                    {avatarPreview && (
                                        <button
                                            type="button"
                                            className="remove-avatar-btn"
                                            onClick={handleRemoveAvatar}
                                        >
                                            Remove avatar
                                        </button>
                                    )}

                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" value={user?.email || ""} disabled />
                            <p>Email cannot be changed from this page</p>
                        </div>

                        <div className="profile-actions">
                            <button type="submit" className="save-profile-btn" disabled={saving}>
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                            {message && <p className="profile-message">{message}</p>}
                        </div>
                    </form>
                </div>
            </div>
        // </div>
    );
}