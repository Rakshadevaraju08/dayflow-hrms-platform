import React, { useRef, useState } from "react";
import {
  Grid2X2,
  UserRound,
  FileText,
  WalletCards,
  CalendarDays,
  ChartNoAxesCombined,
  GraduationCap,
  Headphones,
  LogOut,
  Camera,
  Upload,
  X,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import "./ProfilePicture.css";

function ProfilePicture() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(
    "https://randomuser.me/api/portraits/women/44.jpg"
  );

  const handleUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleRemove = () => {
    setProfileImage(
      "https://randomuser.me/api/portraits/women/44.jpg"
    );
  };

  return (
    <div className="picture-page">

      {/* ================= SIDEBAR ================= */}
      <aside className="picture-sidebar">

        {/* Logo */}
        <div className="picture-logo">
          <div className="picture-logo-box">
            <span>⌁</span>
          </div>

          <h2>HRMS</h2>
        </div>


        {/* Navigation */}
          <nav className="sidebar-menu">
          
                    {/* Dashboard */}
                    <div
                      className="menu-item"
                      onClick={() => navigate("/profile")}
                    >
                      <Grid2X2 size={18} />
                      <span>Dashboard</span>
                    </div>
          
                    {/* Profile */}
                                      <div
                                        className="menu-item active"
                                        onClick={() => navigate("/profile")}
                                      >
                                        <UserRound size={18} />
                                        <span>Profile</span>
                                      </div>
          
                    {/* Documents */}
                    <div
                      className="menu-item"
                      onClick={() => navigate("/profile/documents")}
                    >
                      <FileText size={18} />
                      <span>My Documents</span>
                    </div>
          
                    {/* Salary */}
                    <div
                      className="menu-item"
                      onClick={() => navigate("/profile/salary")}
                    >
                      <WalletCards size={18} />
                      <span>Salary</span>
                    </div>
          
                    {/* Leave - not created yet */}
                        {/* Leave */}
                        <div
                          className="menu-item"
                          onClick={() => navigate("/profile/leave")}
                        >
                          <CalendarDays size={18} />
                          <span>Leave</span>
                        </div>
          
                    {/* Attendance */}
                    <div
                      className="menu-item"
                      onClick={() => navigate("/profile/attendance")}
                    >
                      <CalendarDays size={18} />
                      <span>Attendance</span>
                    </div>
          
                    {/* Performance - not created yet */}
                    <div className="menu-item">
                      <ChartNoAxesCombined size={18} />
                      <span>Performance</span>
                    </div>
          
                    {/* Training - not created yet */}
                    <div className="menu-item">
                      <GraduationCap size={18} />
                      <span>Training</span>
                    </div>
          
                    {/* Help - not created yet */}
                    <div className="menu-item">
                      <Headphones size={18} />
                      <span>Help & Support</span>
                    </div>
          
                  </nav>

        {/* Logout */}
        <div className="picture-logout-section">

          <div
            className="picture-logout"
            onClick={() => navigate("/profile")}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </div>

        </div>

      </aside>


      {/* ================= MAIN CONTENT ================= */}
      <main className="picture-main">

        {/* Header */}
        <div className="picture-header">

          <div>
            <h1>Profile</h1>

            <div className="picture-breadcrumb">
              <span
                onClick={() => navigate("/profile")}
                className="breadcrumb-link"
              >
                Home
              </span>

              <span>›</span>

              <span
                onClick={() => navigate("/profile")}
                className="breadcrumb-link"
              >
                Profile
              </span>

              <span>›</span>

              <span className="breadcrumb-active">
                Profile Picture
              </span>
            </div>
          </div>

        </div>


        {/* ================= PROFILE PICTURE CARD ================= */}
        <section className="picture-card">

          <h2>Update Profile Picture</h2>


          {/* Profile Image */}
          <div className="picture-image-wrapper">

            <img
              src={profileImage}
              alt="Hemalatha"
              className="picture-image"
            />

            {/* Camera Button */}
            <button
              className="picture-camera"
              onClick={() => fileInputRef.current.click()}
              title="Change profile picture"
            >
              <Camera size={16} />
            </button>

          </div>


          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/png,image/jpeg,image/gif"
            onChange={handleUpload}
            className="hidden-file-input"
          />


          {/* Helper Text */}
          <p className="picture-help">
            JPG, PNG or GIF. Max size of 2MB.
          </p>


          {/* Upload Button */}
          <button
            className="upload-photo-button"
            onClick={() => fileInputRef.current.click()}
          >
            <Upload size={15} />
            <span>Upload Photo</span>
          </button>


          {/* Remove Button */}
          <button
            className="remove-photo-button"
            onClick={handleRemove}
          >
            <X size={15} />
            <span>Remove</span>
          </button>

        </section>

      </main>

    </div>
  );
}

export default ProfilePicture;