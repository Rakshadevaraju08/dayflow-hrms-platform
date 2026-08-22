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
  ChevronRight,
  BriefcaseBusiness,
  UserCircle,
} from "lucide-react";

import "./PersonalJobDetails.css";

function PersonalJobDetails() {
  return (
    <div className="personal-job-page">

      {/* ================= SIDEBAR ================= */}
      <aside className="personal-job-sidebar">

        <div className="personal-job-logo">
          <div className="personal-job-logo-box">
            <span>⌁</span>
          </div>
          <h2>HRMS</h2>
        </div>

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

        <div className="personal-job-logout-section">
          <div className="personal-job-menu-item">
            <LogOut size={21} />
            <span>Logout</span>
          </div>
        </div>

      </aside>


      {/* ================= MAIN ================= */}
      <main className="personal-job-main">

        {/* Header */}
        <header className="personal-job-header">

          <div>
            <h1>Personal &amp; Job Details</h1>

            <div className="personal-job-breadcrumb">
              <span>Home</span>
              <ChevronRight size={15} />
              <span>Profile</span>
              <ChevronRight size={15} />
              <span className="active">
                Personal &amp; Job Details
              </span>
            </div>
          </div>

        </header>


        {/* ================= PERSONAL DETAILS ================= */}
        <section className="personal-job-card">

          <div className="personal-job-card-header">

            <div className="personal-job-card-icon">
              <UserCircle size={21} />
            </div>

            <div>
              <h2>Personal Details</h2>
              <p>Your personal information</p>
            </div>

          </div>


          <div className="personal-job-details-grid">

            <div className="personal-job-detail">
              <span>Full Name</span>
              <strong>Hemalatha L</strong>
            </div>

            <div className="personal-job-detail">
              <span>Email</span>
              <strong>hemalatha.l@company.com</strong>
            </div>

            <div className="personal-job-detail">
              <span>Phone</span>
              <strong>+91 98765 43210</strong>
            </div>

            <div className="personal-job-detail">
              <span>Date of Birth</span>
              <strong>21 May 1996</strong>
            </div>

            <div className="personal-job-detail">
              <span>Gender</span>
              <strong>Female</strong>
            </div>

            <div className="personal-job-detail">
              <span>Marital Status</span>
              <strong>Single</strong>
            </div>

            <div className="personal-job-detail full-width">
              <span>Address</span>
              <strong>
                No. 45, 2nd Main, Koramangala,
                Bengaluru - 560034, Karnataka
              </strong>
            </div>

          </div>

        </section>


        {/* ================= JOB DETAILS ================= */}
        <section className="personal-job-card">

          <div className="personal-job-card-header">

            <div className="personal-job-card-icon">
              <BriefcaseBusiness size={21} />
            </div>

            <div>
              <h2>Job Details</h2>
              <p>Your employment information</p>
            </div>

          </div>


          <div className="personal-job-details-grid">

            <div className="personal-job-detail">
              <span>Employee ID</span>
              <strong>EMP00125</strong>
            </div>

            <div className="personal-job-detail">
              <span>Department</span>
              <strong>Human Resources</strong>
            </div>

            <div className="personal-job-detail">
              <span>Designation</span>
              <strong>HR Manager</strong>
            </div>

            <div className="personal-job-detail">
              <span>Reporting To</span>
              <strong>Ramesh Kumar</strong>
            </div>

            <div className="personal-job-detail">
              <span>Date of Joining</span>
              <strong>15 Mar 2022</strong>
            </div>

            <div className="personal-job-detail">
              <span>Employment Type</span>
              <strong>Full Time</strong>
            </div>

            <div className="personal-job-detail">
              <span>Location</span>
              <strong>Bengaluru</strong>
            </div>

            <div className="personal-job-detail">
              <span>Probation Period</span>
              <strong className="status-completed">
                Completed
              </strong>
            </div>

            <div className="personal-job-detail">
              <span>Notice Period</span>
              <strong>60 Days</strong>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default PersonalJobDetails;