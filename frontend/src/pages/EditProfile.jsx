import React, { useRef, useState } from "react";
import "./EditProfile.css";

function EditProfile() {
  const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"
  );

  const [formData, setFormData] = useState({
    fullName: "Hemalatha L",
    email: "hemalatha.l@company.com",
    phone: "+91 98765 43210",
    dateOfBirth: "21/05/1996",
    gender: "Female",
    maritalStatus: "Single",
    address:
      "No. 45, 2nd Main, Koramangala,\nBengaluru - 560034, Karnataka",

    department: "Human Resources",
    designation: "HR Manager",
    reportingTo: "Ramesh Kumar",
    employmentType: "Full Time",
    dateOfJoining: "15/03/2022",
    location: "Bengaluru",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    console.log("Profile saved:", formData);

    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div className="edit-profile-page">

      {/* ================= SIDEBAR ================= */}
      <aside className="edit-sidebar">

        {/* Logo */}
        <div className="edit-logo">
          <div className="edit-logo-icon">
            <span>◆</span>
          </div>

          <span>HRMS</span>
        </div>

        {/* Navigation */}
        <nav className="edit-navigation">

          <a href="#" className="edit-nav-item">
            <span className="edit-nav-icon">⊞</span>
            <span>Dashboard</span>
          </a>

          <a href="#" className="edit-nav-item active">
            <span className="edit-nav-icon">♙</span>
            <span>Profile</span>
          </a>

          <a href="#" className="edit-nav-item">
            <span className="edit-nav-icon">▣</span>
            <span>My Documents</span>
          </a>

          <a href="#" className="edit-nav-item">
            <span className="edit-nav-icon">▤</span>
            <span>Salary</span>
          </a>

          <a href="#" className="edit-nav-item">
            <span className="edit-nav-icon">□</span>
            <span>Leave</span>
          </a>

          <a href="#" className="edit-nav-item">
            <span className="edit-nav-icon">▣</span>
            <span>Attendance</span>
          </a>

          <a href="#" className="edit-nav-item">
            <span className="edit-nav-icon">⌁</span>
            <span>Performance</span>
          </a>

          <a href="#" className="edit-nav-item">
            <span className="edit-nav-icon">◇</span>
            <span>Training</span>
          </a>

          <a href="#" className="edit-nav-item">
            <span className="edit-nav-icon">♧</span>
            <span>Help &amp; Support</span>
          </a>

        </nav>

        {/* Logout */}
        <div className="edit-sidebar-bottom">
          <a href="#" className="edit-nav-item logout">
            <span className="edit-nav-icon">↪</span>
            <span>Logout</span>
          </a>
        </div>

      </aside>


      {/* ================= MAIN CONTENT ================= */}
      <main className="edit-main">

        {/* Header */}
        <header className="edit-header">

          <div>
            <h1>Edit Profile</h1>

            <div className="edit-breadcrumb">
              <span>Home</span>
              <span className="breadcrumb-arrow">›</span>
              <span>Profile</span>
              <span className="breadcrumb-arrow">›</span>
              <span className="breadcrumb-active">Edit</span>
            </div>
          </div>

          <div className="edit-header-actions">
            <button
              className="cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              className="save-button"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>

        </header>


        {/* ================= TOP SECTION ================= */}
        <section className="edit-top-grid">

          {/* Profile Picture */}
          <div className="profile-picture-card">

            <h2>Profile Picture</h2>

            <div className="profile-picture-wrapper">

              <img
                src={profileImage}
                alt="Employee"
                className="profile-picture"
              />

              <button
                className="picture-camera-button"
                onClick={handleUploadClick}
                title="Change profile picture"
              >
                <span>⌾</span>
              </button>

            </div>

            <p className="picture-info">
              JPG, PNG or GIF. Max size of 2MB.
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/gif"
              onChange={handleImageChange}
              hidden
            />

            <button
              className="upload-photo-button"
              onClick={handleUploadClick}
            >
              Upload Photo
            </button>

          </div>


          {/* ================= PERSONAL DETAILS ================= */}
          <div className="personal-details-card">

            <h2>Personal Details</h2>

            <div className="personal-form-grid">

              {/* Full Name */}
              <div className="form-group">
                <label>Full Name</label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>


              {/* Email */}
              <div className="form-group">
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>


              {/* Phone */}
              <div className="form-group">
                <label>Phone</label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>


              {/* Date of Birth */}
              <div className="form-group">
                <label>Date of Birth</label>

                <div className="input-with-icon">
                  <input
                    type="text"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />

                  <span className="calendar-icon">▣</span>
                </div>
              </div>


              {/* Gender */}
              <div className="form-group">
                <label>Gender</label>

                <div className="select-wrapper">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option>Female</option>
                    <option>Male</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>


              {/* Marital Status */}
              <div className="form-group">
                <label>Marital Status</label>

                <div className="select-wrapper">
                  <select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                  >
                    <option>Single</option>
                    <option>Married</option>
                    <option>Divorced</option>
                    <option>Widowed</option>
                  </select>
                </div>
              </div>

            </div>


            {/* Address */}
            <div className="form-group address-group">

              <label>Address</label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
              />

            </div>

          </div>

        </section>


        {/* ================= JOB DETAILS ================= */}
        <section className="job-details-card">

          <h2>Job Details</h2>

          <div className="job-form-grid">

            {/* Department */}
            <div className="form-group">
              <label>Department</label>

              <div className="select-wrapper">
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option>Human Resources</option>
                  <option>Finance</option>
                  <option>Information Technology</option>
                  <option>Marketing</option>
                  <option>Administration</option>
                </select>
              </div>
            </div>


            {/* Designation */}
            <div className="form-group">
              <label>Designation</label>

              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
              />
            </div>


            {/* Reporting To */}
            <div className="form-group">
              <label>Reporting To</label>

              <div className="select-wrapper">
                <select
                  name="reportingTo"
                  value={formData.reportingTo}
                  onChange={handleChange}
                >
                  <option>Ramesh Kumar</option>
                  <option>Karthik L</option>
                  <option>Admin</option>
                </select>
              </div>
            </div>


            {/* Employment Type */}
            <div className="form-group">
              <label>Employment Type</label>

              <div className="select-wrapper">
                <select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                >
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>Contract</option>
                  <option>Intern</option>
                </select>
              </div>
            </div>


            {/* Date of Joining */}
            <div className="form-group">
              <label>Date of Joining</label>

              <div className="input-with-icon">
                <input
                  type="text"
                  name="dateOfJoining"
                  value={formData.dateOfJoining}
                  onChange={handleChange}
                />

                <span className="calendar-icon">▣</span>
              </div>
            </div>


            {/* Location */}
            <div className="form-group">
              <label>Location</label>

              <div className="select-wrapper">
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                >
                  <option>Bengaluru</option>
                  <option>Mysuru</option>
                  <option>Hyderabad</option>
                  <option>Chennai</option>
                  <option>Mumbai</option>
                </select>
              </div>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default EditProfile;