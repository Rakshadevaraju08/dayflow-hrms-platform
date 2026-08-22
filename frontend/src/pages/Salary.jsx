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
  Download,
  FileText as PayslipIcon,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import "./Salary.css";

function Salary() {
  const navigate = useNavigate();

  return (
    <div className="salary-page">

      {/* ================= SIDEBAR ================= */}
      <aside className="salary-sidebar">

        {/* Logo */}
        <div className="salary-logo">
          <div className="salary-logo-box">
            <span>⌁</span>
          </div>
          <h2>HRMS</h2>
        </div>

        {/* ================= NAVIGATION ================= */}
        <nav className="salary-menu">

          {/* Dashboard */}
          <div
            className="salary-menu-item"
            onClick={() => navigate("/profile")}
          >
            <Grid2X2 size={17} />
            <span>Dashboard</span>
          </div>

          {/* Profile */}
          <div
            className="salary-menu-item"
            onClick={() => navigate("/profile")}
          >
            <UserRound size={17} />
            <span>Profile</span>
          </div>

          {/* My Documents */}
          <div
            className="salary-menu-item"
            onClick={() => navigate("/profile/documents")}
          >
            <FileText size={17} />
            <span>My Documents</span>
          </div>

          {/* Salary */}
          <div
            className="salary-menu-item active"
            onClick={() => navigate("/profile/salary")}
          >
            <WalletCards size={17} />
            <span>Salary</span>
          </div>

          {/* Leave - route not created yet */}
          <div className="salary-menu-item">
            <CalendarDays size={17} />
            <span>Leave</span>
          </div>

          {/* Attendance - route not created yet */}
          <div className="salary-menu-item">
            <CalendarDays size={17} />
            <span>Attendance</span>
          </div>

          {/* Performance - route not created yet */}
          <div className="salary-menu-item">
            <ChartNoAxesCombined size={17} />
            <span>Performance</span>
          </div>

          {/* Training - route not created yet */}
          <div className="salary-menu-item">
            <GraduationCap size={17} />
            <span>Training</span>
          </div>

          {/* Help - route not created yet */}
          <div className="salary-menu-item">
            <Headphones size={17} />
            <span>Help & Support</span>
          </div>

        </nav>

        {/* ================= LOGOUT ================= */}
        <div className="salary-logout-section">
          <div
            className="salary-logout"
            onClick={() => navigate("/profile")}
          >
            <LogOut size={17} />
            <span>Logout</span>
          </div>
        </div>

      </aside>


      {/* ================= MAIN CONTENT ================= */}
      <main className="salary-main">

        {/* Header */}
        <div className="salary-header">

          <div>
            <h1>Profile</h1>

            <div className="salary-breadcrumb">
              <span
                onClick={() => navigate("/profile")}
                className="breadcrumb-link"
              >
                Home
              </span>

              <ChevronRight size={13} />

              <span
                onClick={() => navigate("/profile")}
                className="breadcrumb-link"
              >
                Profile
              </span>

              <ChevronRight size={13} />

              <span className="salary-current">
                Salary
              </span>
            </div>
          </div>

          <button className="download-button">
            <Download size={14} />
            <span>Download Payslips</span>
          </button>

        </div>


        {/* ================= TABS ================= */}
        <div className="profile-tabs">

          {/* Personal Details */}
          <div
            className="profile-tab"
            onClick={() => navigate("/profile")}
          >
            Personal Details
          </div>

          {/* Job Details */}
          <div
            className="profile-tab"
            onClick={() => navigate("/profile/details")}
          >
            Job Details
          </div>

          {/* Salary */}
          <div
            className="profile-tab active"
            onClick={() => navigate("/profile/salary")}
          >
            Salary
          </div>

          {/* Documents */}
          <div
            className="profile-tab"
            onClick={() => navigate("/profile/documents")}
          >
            Documents
          </div>

        </div>


        {/* ================= SALARY OVERVIEW ================= */}
        <section className="salary-overview">

          <h3>Salary Overview</h3>

          <div className="overview-grid">

            <div className="overview-item">
              <span>CTC (Annual)</span>
              <strong>₹ 12,00,000</strong>
            </div>

            <div className="overview-item">
              <span>Monthly Salary</span>
              <strong>₹ 1,00,000</strong>
            </div>

            <div className="overview-item">
              <span>Take Home</span>
              <strong>₹ 78,650</strong>
            </div>

          </div>

        </section>


        {/* ================= LOWER SECTION ================= */}
        <div className="salary-lower-grid">

          {/* Salary Breakdown */}
          <section className="salary-card breakdown-card">

            <h3>Salary Breakup (Monthly)</h3>

            <div className="salary-breakdown">

              <div className="salary-row">
                <span>Basic Salary</span>
                <strong>₹ 50,000</strong>
              </div>

              <div className="salary-row">
                <span>House Rent Allowance</span>
                <strong>₹ 20,000</strong>
              </div>

              <div className="salary-row">
                <span>Special Allowance</span>
                <strong>₹ 15,000</strong>
              </div>

              <div className="salary-row">
                <span>Transport Allowance</span>
                <strong>₹ 5,000</strong>
              </div>

              <div className="salary-row deduction">
                <span>Provident Fund (Employee)</span>
                <strong>- ₹ 4,000</strong>
              </div>

              <div className="salary-row deduction">
                <span>Professional Tax</span>
                <strong>- ₹ 200</strong>
              </div>

              <div className="salary-row deduction">
                <span>Income Tax</span>
                <strong>- ₹ 5,350</strong>
              </div>

              <div className="take-home-row">
                <span>Take Home Salary</span>
                <strong>₹ 78,650</strong>
              </div>

            </div>

          </section>


          {/* Recent Payslips */}
          <section className="salary-card payslip-card">

            <h3>Recent Payslips</h3>

            <div className="payslip-list">

              <div className="payslip-item">

                <div className="payslip-icon">
                  <PayslipIcon size={15} />
                </div>

                <div className="payslip-info">
                  <strong>May 2026</strong>
                  <span>31 May 2026</span>
                </div>

                <strong className="payslip-amount">
                  ₹ 78,650
                </strong>

              </div>


              <div className="payslip-item">

                <div className="payslip-icon">
                  <PayslipIcon size={15} />
                </div>

                <div className="payslip-info">
                  <strong>Apr 2026</strong>
                  <span>30 Apr 2026</span>
                </div>

                <strong className="payslip-amount">
                  ₹ 78,650
                </strong>

              </div>


              <div className="payslip-item">

                <div className="payslip-icon">
                  <PayslipIcon size={15} />
                </div>

                <div className="payslip-info">
                  <strong>Mar 2026</strong>
                  <span>31 Mar 2026</span>
                </div>

                <strong className="payslip-amount">
                  ₹ 78,650
                </strong>

              </div>

            </div>


            <button className="all-payslips">
              View All Payslips
              <ChevronRight size={14} />
            </button>

          </section>

        </div>

      </main>

    </div>
  );
}

export default Salary;