import React from "react";
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
  Pencil,
  Camera,
  BriefcaseBusiness,
  Phone,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import "./EmployeeProfile.css";

function EmployeeProfile() {
  const navigate = useNavigate();

  return (
    <div className="employee-page">

      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">

        {/* Logo */}
        <div className="logo-container">
          <div className="logo-box">
            <span>⌁</span>
          </div>
          <h2>HRMS</h2>
        </div>

        {/* ================= MENU ================= */}
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
        <div className="logout-section">
          <div className="logout">
            <LogOut size={18} />
            <span>Logout</span>
          </div>
        </div>

      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="main-content">

        {/* ================= HEADER ================= */}
        <div className="page-header">

          <div>
            <h1>Employee Profile</h1>

            <div className="breadcrumb">

              <span
                onClick={() => navigate("/profile")}
                className="breadcrumb-link"
              >
                Home
              </span>

              <ChevronRight size={15} />

              <span className="current">
                Profile
              </span>

            </div>
          </div>

          {/* EDIT PROFILE BUTTON */}
          <button
            className="edit-button"
            onClick={() => navigate("/profile/edit")}
          >
            <Pencil size={17} />
            <span>Edit Profile</span>
          </button>

        </div>


        {/* ================= PROFILE CARD ================= */}
        <div className="profile-card">

          {/* LEFT PROFILE */}
          <div className="profile-section">

            <div className="profile-image-container">

              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Hemalatha"
                className="profile-image"
              />

              <button className="camera-button">
                <Camera size={17} />
              </button>

            </div>

            <h2 className="employee-name">
              Hemalatha L
            </h2>

            <p className="employee-role">
              HR Manager
            </p>

            <div className="employee-id">
              <span>Employee ID</span>
              <strong>EMP00125</strong>
            </div>

          </div>


          {/* DIVIDER */}
          <div className="profile-divider"></div>


          {/* PERSONAL DETAILS */}
          <div className="personal-section">

            <h3>Personal Details</h3>

            <div className="personal-details">

              <div className="detail-row">
                <span className="label">Full Name</span>
                <span className="value">Hemalatha L</span>
              </div>

              <div className="detail-row">
                <span className="label">Email</span>
                <span className="value">
                  hemalatha.l@company.com
                </span>
              </div>

              <div className="detail-row">
                <span className="label">Phone</span>
                <span className="value">
                  +91 98765 43210
                </span>
              </div>

              <div className="detail-row">
                <span className="label">Date of Birth</span>
                <span className="value">
                  21 May 1996
                </span>
              </div>

              <div className="detail-row">
                <span className="label">Gender</span>
                <span className="value">Female</span>
              </div>

              <div className="detail-row">
                <span className="label">Marital Status</span>
                <span className="value">Single</span>
              </div>

              <div className="detail-row address-row">
                <span className="label">Address</span>

                <span className="value address">
                  No. 45, 2nd Main, Koramangala,
                  <br />
                  Bengaluru - 560034, Karnataka
                </span>
              </div>

            </div>

          </div>

        </div>


        {/* ================= BOTTOM CARDS ================= */}
        <div className="bottom-cards">

          {/* JOB DETAILS */}
          <div
            className="info-card clickable-card"
            onClick={() => navigate("/profile/details")}
          >

            <div className="card-title">

              <div className="card-icon">
                <BriefcaseBusiness size={18} />
              </div>

              <h3>Job Details</h3>

            </div>

            <div className="job-details">

              <div className="job-row">
                <span>Department</span>
                <strong>Human Resources</strong>
              </div>

              <div className="job-row">
                <span>Designation</span>
                <strong>HR Manager</strong>
              </div>

              <div className="job-row">
                <span>Reporting To</span>
                <strong>Ramesh Kumar</strong>
              </div>

              <div className="job-row">
                <span>Date of Joining</span>
                <strong>15 Mar 2022</strong>
              </div>

              <div className="job-row">
                <span>Employment Type</span>
                <strong>Full Time</strong>
              </div>

              <div className="job-row">
                <span>Location</span>
                <strong>Bengaluru</strong>
              </div>

              <div className="job-row">
                <span>Probation Period</span>
                <strong>Completed</strong>
              </div>

              <div className="job-row">
                <span>Notice Period</span>
                <strong>60 Days</strong>
              </div>

            </div>

          </div>


          {/* CONTACT DETAILS */}
          <div className="info-card">

            <div className="card-title">

              <div className="card-icon">
                <Phone size={18} />
              </div>

              <h3>Contact Details</h3>

            </div>

            <div className="contact-details">

              <div className="contact-row">
                <span>Official Email</span>
                <strong>
                  hemalatha.l@company.com
                </strong>
              </div>

              <div className="contact-row">
                <span>Official Phone</span>
                <strong>
                  +91 98765 43210
                </strong>
              </div>

              <div className="contact-row">
                <span>Emergency Contact</span>
                <strong>
                  Karthik L (+91 98765 12345)
                </strong>
              </div>

              <div className="contact-row">
                <span>Emergency Email</span>
                <strong>
                  karthik.l@gmail.com
                </strong>
              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default EmployeeProfile;