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
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  Users,
  CheckCircle2,
  XCircle,
  Clock3,
  Download,
  Eye,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const payslips = [
    {
      month: "May 2026",
      date: "31 May 2026",
      gross: "₹ 1,00,000",
      takeHome: "₹ 78,650",
    },
    {
      month: "Apr 2026",
      date: "30 Apr 2026",
      gross: "₹ 1,00,000",
      takeHome: "₹ 78,650",
    },
    {
      month: "Mar 2026",
      date: "31 Mar 2026",
      gross: "₹ 1,00,000",
      takeHome: "₹ 78,650",
    },
  ];

  return (
    <div className="dashboard-page">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="dashboard-sidebar">

        {/* LOGO */}
        <div className="dashboard-logo">

          <div className="dashboard-logo-box">
            <span>⌁</span>
          </div>

          <h2>HRMS</h2>

        </div>


        {/* MENU */}
        <nav className="dashboard-menu">

          {/* Dashboard */}
          <div
            className="dashboard-menu-item active"
            onClick={() => navigate("/profile/dashboard")}
          >
            <Grid2X2 size={18} />
            <span>Dashboard</span>
          </div>


          {/* Profile */}
          <div
            className="dashboard-menu-item"
            onClick={() => navigate("/profile")}
          >
            <UserRound size={18} />
            <span>Profile</span>
          </div>


          {/* Documents */}
          <div
            className="dashboard-menu-item"
            onClick={() =>
              navigate("/profile/documents")
            }
          >
            <FileText size={18} />
            <span>My Documents</span>
          </div>


          {/* Salary */}
          <div
            className="dashboard-menu-item"
            onClick={() =>
              navigate("/profile/salary")
            }
          >
            <WalletCards size={18} />
            <span>Salary</span>
          </div>


          {/* Leave */}
          <div
            className="dashboard-menu-item"
            onClick={() =>
              navigate("/profile/leave")
            }
          >
            <CalendarDays size={18} />
            <span>Leave</span>
          </div>


          {/* Attendance */}
          <div
            className="dashboard-menu-item"
            onClick={() =>
              navigate("/profile/attendance")
            }
          >
            <CalendarDays size={18} />
            <span>Attendance</span>
          </div>


          {/* Performance */}
          <div className="dashboard-menu-item">
            <ChartNoAxesCombined size={18} />
            <span>Performance</span>
          </div>


          {/* Training */}
          <div className="dashboard-menu-item">
            <GraduationCap size={18} />
            <span>Training</span>
          </div>


          {/* Help */}
          <div className="dashboard-menu-item">
            <Headphones size={18} />
            <span>Help & Support</span>
          </div>

        </nav>


        {/* LOGOUT */}
        <div className="dashboard-logout-section">

          <div
            className="dashboard-logout"
            onClick={() => navigate("/profile")}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </div>

        </div>

      </aside>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="dashboard-main">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="dashboard-header">

          <div className="dashboard-title">

            <h1>Dashboard</h1>

            <p>
              Welcome back, Hemalatha 👋
            </p>

          </div>


          <div className="dashboard-header-right">

            {/* SEARCH */}
            <div className="dashboard-search">

              <Search size={17} />

              <input
                type="text"
                placeholder="Search..."
              />

            </div>


            {/* NOTIFICATION */}
            <button
              type="button"
              className="notification-button"
            >
              <Bell size={19} />

              <span>2</span>

            </button>


            {/* USER */}
            <div className="dashboard-user">

              <div className="dashboard-user-avatar">
                H
              </div>

              <div className="dashboard-user-info">

                <strong>
                  Hemalatha L
                </strong>

                <span>
                  HR Manager
                </span>

              </div>

              <ChevronDown size={15} />

            </div>

          </div>

        </header>


        {/* =====================================================
            SUMMARY CARDS
        ===================================================== */}

        <section className="dashboard-summary-grid">

          {/* PRESENT */}
          <div className="dashboard-stat-card">

            <div className="stat-icon purple">
              <CheckCircle2 size={21} />
            </div>

            <div className="stat-content">

              <span>
                Present Today
              </span>

              <strong>
                18
              </strong>

              <small className="positive">
                ↑ 8 this month
              </small>

            </div>

          </div>


          {/* LEAVE */}
          <div className="dashboard-stat-card">

            <div className="stat-icon green">
              <CalendarDays size={21} />
            </div>

            <div className="stat-content">

              <span>
                Leave Balance
              </span>

              <strong>
                8
              </strong>

              <small>
                Casual leave
              </small>

            </div>

          </div>


          {/* WORKING HOURS */}
          <div className="dashboard-stat-card">

            <div className="stat-icon blue">
              <Clock3 size={21} />
            </div>

            <div className="stat-content">

              <span>
                Working Hours
              </span>

              <strong>
                8h 01m
              </strong>

              <small>
                Average this month
              </small>

            </div>

          </div>


          {/* ABSENT */}
          <div className="dashboard-stat-card">

            <div className="stat-icon red">
              <XCircle size={21} />
            </div>

            <div className="stat-content">

              <span>
                Absent Days
              </span>

              <strong>
                1
              </strong>

              <small className="negative">
                This month
              </small>

            </div>

          </div>

        </section>


        {/* =====================================================
            ATTENDANCE + LEAVE
        ===================================================== */}

        <section className="dashboard-two-column">


          {/* ATTENDANCE */}
          <div className="dashboard-card">

            <div className="dashboard-card-header">

              <div>

                <h2>
                  Attendance Overview
                </h2>

                <p>
                  Your attendance this month
                </p>

              </div>

              <select defaultValue="month">

                <option value="month">
                  This Month
                </option>

                <option value="week">
                  This Week
                </option>

              </select>

            </div>


            <div className="attendance-dashboard-content">

              {/* RING */}
              <div className="attendance-ring">

                <div className="attendance-ring-center">

                  <strong>
                    75%
                  </strong>

                  <span>
                    Attendance
                  </span>

                </div>

              </div>


              {/* STATS */}
              <div className="attendance-legend">

                <div>

                  <span>
                    <i className="legend-dot green"></i>
                    Present
                  </span>

                  <strong>
                    18
                  </strong>

                </div>


                <div>

                  <span>
                    <i className="legend-dot red"></i>
                    Absent
                  </span>

                  <strong>
                    1
                  </strong>

                </div>


                <div>

                  <span>
                    <i className="legend-dot yellow"></i>
                    Half-day
                  </span>

                  <strong>
                    2
                  </strong>

                </div>


                <div>

                  <span>
                    <i className="legend-dot purple"></i>
                    Leave
                  </span>

                  <strong>
                    3
                  </strong>

                </div>

              </div>

            </div>


            <button
              className="dashboard-outline-button"
              onClick={() =>
                navigate("/profile/attendance")
              }
            >
              View Attendance
              <ChevronRight size={14} />
            </button>

          </div>


          {/* LEAVE */}
          <div className="dashboard-card">

            <div className="dashboard-card-header">

              <div>

                <h2>
                  Leave Balance
                </h2>

                <p>
                  Available leave
                </p>

              </div>

              <button
                className="header-link"
                onClick={() =>
                  navigate("/profile/leave")
                }
              >
                View All
              </button>

            </div>


            <div className="leave-list">

              {/* CASUAL */}
              <div className="leave-item">

                <div className="leave-item-header">

                  <span>
                    Casual Leave
                  </span>

                  <strong>
                    8 Days
                  </strong>

                </div>

                <div className="leave-bar">

                  <span
                    style={{
                      width: "67%",
                    }}
                  />

                </div>

              </div>


              {/* SICK */}
              <div className="leave-item">

                <div className="leave-item-header">

                  <span>
                    Sick Leave
                  </span>

                  <strong>
                    6 Days
                  </strong>

                </div>

                <div className="leave-bar blue">

                  <span
                    style={{
                      width: "50%",
                    }}
                  />

                </div>

              </div>


              {/* EARNED */}
              <div className="leave-item">

                <div className="leave-item-header">

                  <span>
                    Earned Leave
                  </span>

                  <strong>
                    10 Days
                  </strong>

                </div>

                <div className="leave-bar green">

                  <span
                    style={{
                      width: "82%",
                    }}
                  />

                </div>

              </div>

            </div>


            <button
              className="dashboard-outline-button"
              onClick={() =>
                navigate("/profile/leave")
              }
            >
              View Leave
              <ChevronRight size={14} />
            </button>

          </div>

        </section>


        {/* =====================================================
            SALARY OVERVIEW
        ===================================================== */}

        <section className="dashboard-card salary-dashboard-card">

          <div className="dashboard-card-header">

            <div>

              <h2>
                Salary Overview
              </h2>

              <p>
                Current salary details
              </p>

            </div>

            <button
              className="header-link"
              onClick={() =>
                navigate("/profile/salary")
              }
            >
              View Salary
            </button>

          </div>


          <div className="salary-summary-row">

            <div>

              <span>
                Annual CTC
              </span>

              <strong>
                ₹ 12,00,000
              </strong>

            </div>


            <div>

              <span>
                Monthly Gross
              </span>

              <strong>
                ₹ 1,00,000
              </strong>

            </div>


            <div>

              <span>
                Take Home
              </span>

              <strong className="salary-green">
                ₹ 78,650
              </strong>

            </div>

          </div>

        </section>


        {/* =====================================================
            RECENT PAYSLIPS
        ===================================================== */}

        <section className="dashboard-card payslips-card">

          <div className="dashboard-card-header">

            <div>

              <h2>
                Recent Payslips
              </h2>

              <p>
                Your latest salary slips
              </p>

            </div>

            <button
              className="header-link"
              onClick={() =>
                navigate("/profile/salary")
              }
            >
              View All
            </button>

          </div>


          <div className="payslip-table-wrapper">

            <table className="dashboard-payslip-table">

              <thead>

                <tr>

                  <th>
                    Month
                  </th>

                  <th>
                    Pay Date
                  </th>

                  <th>
                    Gross Salary
                  </th>

                  <th>
                    Take Home
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {payslips.map((payslip) => (

                  <tr key={payslip.month}>

                    <td>
                      <div className="month-cell">

                        <div className="month-icon">
                          <FileText size={14} />
                        </div>

                        <strong>
                          {payslip.month}
                        </strong>

                      </div>
                    </td>

                    <td>
                      {payslip.date}
                    </td>

                    <td>
                      {payslip.gross}
                    </td>

                    <td className="take-home-value">
                      {payslip.takeHome}
                    </td>

                    <td>

                      <div className="payslip-actions">

                        <button type="button">
                          <Eye size={13} />
                          View
                        </button>

                        <button type="button">
                          <Download size={13} />
                          Download
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;