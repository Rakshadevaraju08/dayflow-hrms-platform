import React, { useMemo, useState } from "react";

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
  Clock3,
  CheckCircle2,
  XCircle,
  Timer,
  LogIn,
  LogOut as CheckOutIcon,
  ChevronRight,
  Pencil,
  Camera,
  BriefcaseBusiness,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "./Attendance.css";

function Attendance() {
  const navigate = useNavigate();

  const [view, setView] = useState("daily");

  const [attendance, setAttendance] = useState({
    checkIn: null,
    checkOut: null,
    status: "Absent",
  });

  /* =====================================================
     DAILY RECORDS
  ===================================================== */

  const dailyRecords = [
    {
      id: 1,
      date: "22 Aug 2026",
      day: "Saturday",
      checkIn: "09:05 AM",
      checkOut: "06:10 PM",
      hours: "9h 05m",
      status: "Present",
    },
    {
      id: 2,
      date: "21 Aug 2026",
      day: "Friday",
      checkIn: "09:02 AM",
      checkOut: "06:02 PM",
      hours: "9h 00m",
      status: "Present",
    },
    {
      id: 3,
      date: "20 Aug 2026",
      day: "Thursday",
      checkIn: "-",
      checkOut: "-",
      hours: "-",
      status: "Leave",
    },
    {
      id: 4,
      date: "19 Aug 2026",
      day: "Wednesday",
      checkIn: "09:20 AM",
      checkOut: "01:00 PM",
      hours: "3h 40m",
      status: "Half-day",
    },
    {
      id: 5,
      date: "18 Aug 2026",
      day: "Tuesday",
      checkIn: "-",
      checkOut: "-",
      hours: "-",
      status: "Absent",
    },
  ];

  /* =====================================================
     WEEKLY RECORDS
  ===================================================== */

  const weeklyRecords = [
    {
      id: 1,
      day: "Monday",
      date: "17 Aug",
      checkIn: "09:00 AM",
      checkOut: "06:00 PM",
      hours: "9h 00m",
      status: "Present",
    },
    {
      id: 2,
      day: "Tuesday",
      date: "18 Aug",
      checkIn: "-",
      checkOut: "-",
      hours: "-",
      status: "Absent",
    },
    {
      id: 3,
      day: "Wednesday",
      date: "19 Aug",
      checkIn: "09:20 AM",
      checkOut: "01:00 PM",
      hours: "3h 40m",
      status: "Half-day",
    },
    {
      id: 4,
      day: "Thursday",
      date: "20 Aug",
      checkIn: "-",
      checkOut: "-",
      hours: "-",
      status: "Leave",
    },
    {
      id: 5,
      day: "Friday",
      date: "21 Aug",
      checkIn: "09:02 AM",
      checkOut: "06:02 PM",
      hours: "9h 00m",
      status: "Present",
    },
    {
      id: 6,
      day: "Saturday",
      date: "22 Aug",
      checkIn: "09:05 AM",
      checkOut: "06:10 PM",
      hours: "9h 05m",
      status: "Present",
    },
  ];

  const records =
    view === "daily" ? dailyRecords : weeklyRecords;

  /* =====================================================
     SUMMARY
  ===================================================== */

  const summary = useMemo(() => {
    return {
      present: dailyRecords.filter(
        (item) => item.status === "Present"
      ).length,

      absent: dailyRecords.filter(
        (item) => item.status === "Absent"
      ).length,

      halfDay: dailyRecords.filter(
        (item) => item.status === "Half-day"
      ).length,

      leave: dailyRecords.filter(
        (item) => item.status === "Leave"
      ).length,
    };
  }, []);

  /* =====================================================
     CHECK IN
  ===================================================== */

  const handleCheckIn = () => {
    const now = new Date();

    const time = now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    setAttendance({
      checkIn: time,
      checkOut: null,
      status: "Present",
    });
  };

  /* =====================================================
     CHECK OUT
  ===================================================== */

  const handleCheckOut = () => {
    const now = new Date();

    const time = now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    setAttendance((previous) => ({
      ...previous,
      checkOut: time,
      status: "Present",
    }));
  };

  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="attendance-page">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="attendance-sidebar">

        {/* Logo */}
        <div className="attendance-logo">

          <div className="attendance-logo-box">
            <span>⌁</span>
          </div>

          <h2>HRMS</h2>

        </div>


        {/* =====================================================
            NAVIGATION
        ===================================================== */}

        <nav className="attendance-menu">

          {/* Dashboard */}
          <div
            className="attendance-menu-item"
            onClick={() => navigate("/profile")}
          >
            <Grid2X2 size={18} />
            <span>Dashboard</span>
          </div>


          {/* Profile */}
          <div
            className="attendance-menu-item"
            onClick={() => navigate("/profile")}
          >
            <UserRound size={18} />
            <span>Profile</span>
          </div>


          {/* Edit Profile */}
          <div
            className="attendance-menu-item"
            onClick={() => navigate("/profile/edit")}
          >
            <Pencil size={18} />
            <span>Edit Profile</span>
          </div>


          {/* Personal & Job Details */}
          <div
            className="attendance-menu-item"
            onClick={() => navigate("/profile/details")}
          >
            <BriefcaseBusiness size={18} />
            <span>Personal & Job Details</span>
          </div>


          {/* Documents */}
          <div
            className="attendance-menu-item"
            onClick={() =>
              navigate("/profile/documents")
            }
          >
            <FileText size={18} />
            <span>My Documents</span>
          </div>


          {/* Salary */}
          <div
            className="attendance-menu-item"
            onClick={() =>
              navigate("/profile/salary")
            }
          >
            <WalletCards size={18} />
            <span>Salary</span>
          </div>


          {/* Leave */}
          <div
            className="attendance-menu-item"
            onClick={() =>
              navigate("/profile/leave")
            }
          >
            <CalendarDays size={18} />
            <span>Leave</span>
          </div>


          {/* Attendance */}
          <div
            className="attendance-menu-item active"
            onClick={() =>
              navigate("/profile/attendance")
            }
          >
            <CalendarDays size={18} />
            <span>Attendance</span>
          </div>


          {/* Profile Picture */}
          <div
            className="attendance-menu-item"
            onClick={() =>
              navigate("/profile/picture")
            }
          >
            <Camera size={18} />
            <span>Profile Picture</span>
          </div>


          {/* Performance */}
          <div className="attendance-menu-item">
            <ChartNoAxesCombined size={18} />
            <span>Performance</span>
          </div>


          {/* Training */}
          <div className="attendance-menu-item">
            <GraduationCap size={18} />
            <span>Training</span>
          </div>


          {/* Help & Support */}
          <div className="attendance-menu-item">
            <Headphones size={18} />
            <span>Help & Support</span>
          </div>

        </nav>


        {/* =====================================================
            LOGOUT
        ===================================================== */}

        <div className="attendance-logout-section">

          <div
            className="attendance-logout"
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

      <main className="attendance-main">

        {/* Header */}
        <div className="attendance-header">

          <div>

            <h1>Attendance</h1>

            <div className="attendance-breadcrumb">

              <span
                className="attendance-breadcrumb-link"
                onClick={() => navigate("/profile")}
              >
                Home
              </span>

              <ChevronRight size={14} />

              <span
                className="attendance-breadcrumb-link"
                onClick={() => navigate("/profile")}
              >
                Profile
              </span>

              <ChevronRight size={14} />

              <span className="attendance-current">
                Attendance
              </span>

            </div>

          </div>

          <div className="attendance-date">
            {today}
          </div>

        </div>


        {/* =====================================================
            TODAY ATTENDANCE
        ===================================================== */}

        <section className="today-attendance-card">

          <div className="today-attendance-left">

            <div className="today-attendance-icon">
              <CalendarDays size={24} />
            </div>

            <div>

              <span className="today-small-title">
                Today's Attendance
              </span>

              <h2>{today}</h2>

              <p>
                {attendance.checkIn
                  ? attendance.checkOut
                    ? `Checked in at ${attendance.checkIn} • Checked out at ${attendance.checkOut}`
                    : `Checked in at ${attendance.checkIn}`
                  : "You have not checked in yet"}
              </p>

            </div>

          </div>


          <div className="attendance-action-area">

            {!attendance.checkIn && (
              <button
                className="check-in-button"
                type="button"
                onClick={handleCheckIn}
              >
                <LogIn size={16} />
                Check In
              </button>
            )}


            {attendance.checkIn &&
              !attendance.checkOut && (
                <button
                  className="check-out-button"
                  type="button"
                  onClick={handleCheckOut}
                >
                  <CheckOutIcon size={16} />
                  Check Out
                </button>
              )}


            {attendance.checkIn &&
              attendance.checkOut && (
                <div className="completed-status">
                  <CheckCircle2 size={16} />
                  Day Completed
                </div>
              )}

          </div>

        </section>


        {/* =====================================================
            SUMMARY
        ===================================================== */}

        <section className="attendance-summary-grid">

          <div className="attendance-summary-card">

            <div className="attendance-summary-icon green">
              <CheckCircle2 size={20} />
            </div>

            <div>
              <span>Present</span>
              <strong>{summary.present}</strong>
              <small>This Period</small>
            </div>

          </div>


          <div className="attendance-summary-card">

            <div className="attendance-summary-icon red">
              <XCircle size={20} />
            </div>

            <div>
              <span>Absent</span>
              <strong>{summary.absent}</strong>
              <small>This Period</small>
            </div>

          </div>


          <div className="attendance-summary-card">

            <div className="attendance-summary-icon orange">
              <Timer size={20} />
            </div>

            <div>
              <span>Half-day</span>
              <strong>{summary.halfDay}</strong>
              <small>This Period</small>
            </div>

          </div>


          <div className="attendance-summary-card">

            <div className="attendance-summary-icon purple">
              <CalendarDays size={20} />
            </div>

            <div>
              <span>Leave</span>
              <strong>{summary.leave}</strong>
              <small>This Period</small>
            </div>

          </div>

        </section>


        {/* =====================================================
            ATTENDANCE HISTORY
        ===================================================== */}

        <section className="attendance-history-card">

          <div className="attendance-section-header">

            <div>

              <h2>
                Attendance History
              </h2>

              <p>
                View your own attendance records
              </p>

            </div>


            {/* Daily / Weekly */}
            <div className="attendance-view-toggle">

              <button
                className={
                  view === "daily"
                    ? "active"
                    : ""
                }
                type="button"
                onClick={() => setView("daily")}
              >
                Daily
              </button>

              <button
                className={
                  view === "weekly"
                    ? "active"
                    : ""
                }
                type="button"
                onClick={() => setView("weekly")}
              >
                Weekly
              </button>

            </div>

          </div>


          <div className="attendance-table-wrapper">

            <table className="attendance-table">

              <thead>

                <tr>

                  <th>
                    {view === "daily"
                      ? "Date"
                      : "Day"}
                  </th>

                  <th>
                    {view === "daily"
                      ? "Day"
                      : "Date"}
                  </th>

                  <th>
                    Check In
                  </th>

                  <th>
                    Check Out
                  </th>

                  <th>
                    Working Hours
                  </th>

                  <th>
                    Status
                  </th>

                </tr>

              </thead>


              <tbody>

                {records.map((record) => (

                  <tr key={record.id}>

                    <td className="attendance-date-cell">
                      {view === "daily"
                        ? record.date
                        : record.day}
                    </td>

                    <td>
                      {view === "daily"
                        ? record.day
                        : record.date}
                    </td>

                    <td>
                      {record.checkIn}
                    </td>

                    <td>
                      {record.checkOut}
                    </td>

                    <td>
                      {record.hours}
                    </td>

                    <td>

                      <span
                        className={`attendance-status ${record.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {record.status}
                      </span>

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

export default Attendance;