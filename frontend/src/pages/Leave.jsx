import React, { useState } from "react";

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
  Plus,
  Clock3,
  CheckCircle2,
  XCircle,
  CalendarCheck,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "./Leave.css";

function Leave() {
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);

  const [leaveForm, setLeaveForm] = useState({
    leaveType: "Casual Leave",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      type: "Casual Leave",
      from: "10 Aug 2026",
      to: "11 Aug 2026",
      days: 2,
      reason: "Personal work",
      status: "Approved",
    },
    {
      id: 2,
      type: "Sick Leave",
      from: "25 Jul 2026",
      to: "26 Jul 2026",
      days: 2,
      reason: "Health issue",
      status: "Pending",
    },
    {
      id: 3,
      type: "Casual Leave",
      from: "15 Jun 2026",
      to: "15 Jun 2026",
      days: 1,
      reason: "Family function",
      status: "Rejected",
    },
  ]);

  /* =====================================================
     FORM CHANGE
  ===================================================== */

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setLeaveForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =====================================================
     SUBMIT LEAVE
  ===================================================== */

  const handleSubmitLeave = (event) => {
    event.preventDefault();

    if (
      !leaveForm.fromDate ||
      !leaveForm.toDate ||
      !leaveForm.reason
    ) {
      alert("Please fill all the leave details.");
      return;
    }

    const from = new Date(leaveForm.fromDate);
    const to = new Date(leaveForm.toDate);

    if (to < from) {
      alert("To date cannot be before From date.");
      return;
    }

    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    const days =
      Math.floor(
        (to - from) / millisecondsPerDay
      ) + 1;

    const formatDate = (date) =>
      date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

    const newRequest = {
      id: Date.now(),
      type: leaveForm.leaveType,
      from: formatDate(from),
      to: formatDate(to),
      days,
      reason: leaveForm.reason,
      status: "Pending",
    };

    setLeaveRequests((previous) => [
      newRequest,
      ...previous,
    ]);

    setLeaveForm({
      leaveType: "Casual Leave",
      fromDate: "",
      toDate: "",
      reason: "",
    });

    setShowForm(false);

    alert("Leave request submitted successfully.");
  };

  return (
    <div className="leave-page">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="leave-sidebar">

        {/* Logo */}
        <div className="leave-logo">

          <div className="leave-logo-box">
            <span>⌁</span>
          </div>

          <h2>HRMS</h2>

        </div>


        {/* Navigation */}
        <nav className="leave-menu">

          {/* Dashboard */}
          <div
            className="leave-menu-item"
            onClick={() => navigate("/profile")}
          >
            <Grid2X2 size={18} />
            <span>Dashboard</span>
          </div>


          {/* Profile */}
          <div
            className="leave-menu-item"
            onClick={() => navigate("/profile")}
          >
            <UserRound size={18} />
            <span>Profile</span>
          </div>


          {/* Documents */}
          <div
            className="leave-menu-item"
            onClick={() => navigate("/profile/documents")}
          >
            <FileText size={18} />
            <span>My Documents</span>
          </div>


          {/* Salary */}
          <div
            className="leave-menu-item"
            onClick={() => navigate("/profile/salary")}
          >
            <WalletCards size={18} />
            <span>Salary</span>
          </div>


          {/* Leave */}
          <div
            className="leave-menu-item active"
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
         


          {/* Performance */}
          <div className="leave-menu-item">
            <ChartNoAxesCombined size={18} />
            <span>Performance</span>
          </div>


          {/* Training */}
          <div className="leave-menu-item">
            <GraduationCap size={18} />
            <span>Training</span>
          </div>


          {/* Help */}
          <div className="leave-menu-item">
            <Headphones size={18} />
            <span>Help & Support</span>
          </div>

        </nav>


        {/* Logout */}
        <div className="leave-logout-section">

          <div
            className="leave-logout"
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

      <main className="leave-main">

        {/* Header */}
        <div className="leave-header">

          <div>

            <h1>Leave</h1>

            <div className="leave-breadcrumb">

              <span
                className="leave-breadcrumb-link"
                onClick={() => navigate("/profile")}
              >
                Home
              </span>

              <ChevronRight size={14} />

              <span
                className="leave-breadcrumb-link"
                onClick={() => navigate("/profile")}
              >
                Profile
              </span>

              <ChevronRight size={14} />

              <span className="leave-current">
                Leave
              </span>

            </div>

          </div>


          {/* Apply Leave */}
          <button
            className="apply-leave-button"
            onClick={() => setShowForm(true)}
          >
            <Plus size={16} />
            <span>Apply Leave</span>
          </button>

        </div>


        {/* =====================================================
            LEAVE BALANCE CARDS
        ===================================================== */}

        <section className="leave-summary-grid">

          {/* Casual */}
          <div className="leave-summary-card">

            <div className="leave-summary-icon purple">
              <CalendarCheck size={20} />
            </div>

            <div>
              <span>Casual Leave</span>
              <strong>8 Days</strong>
              <small>Available</small>
            </div>

          </div>


          {/* Sick */}
          <div className="leave-summary-card">

            <div className="leave-summary-icon blue">
              <Plus size={20} />
            </div>

            <div>
              <span>Sick Leave</span>
              <strong>6 Days</strong>
              <small>Available</small>
            </div>

          </div>


          {/* Earned */}
          <div className="leave-summary-card">

            <div className="leave-summary-icon green">
              <CheckCircle2 size={20} />
            </div>

            <div>
              <span>Earned Leave</span>
              <strong>10 Days</strong>
              <small>Available</small>
            </div>

          </div>


          {/* Used */}
          <div className="leave-summary-card">

            <div className="leave-summary-icon orange">
              <Clock3 size={20} />
            </div>

            <div>
              <span>Leave Used</span>
              <strong>7 Days</strong>
              <small>This Year</small>
            </div>

          </div>

        </section>


        {/* =====================================================
            APPLY LEAVE FORM
        ===================================================== */}

        {showForm && (
          <section className="leave-form-card">

            <div className="leave-form-header">

              <div>
                <h2>Apply for Leave</h2>
                <p>Submit a new leave request</p>
              </div>

              <button
                className="close-form-button"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>

            </div>


            <form onSubmit={handleSubmitLeave}>

              <div className="leave-form-grid">

                {/* Leave Type */}
                <div className="leave-form-group">

                  <label>
                    Leave Type
                  </label>

                  <select
                    name="leaveType"
                    value={leaveForm.leaveType}
                    onChange={handleFormChange}
                  >
                    <option>
                      Casual Leave
                    </option>

                    <option>
                      Sick Leave
                    </option>

                    <option>
                      Earned Leave
                    </option>

                    <option>
                      Unpaid Leave
                    </option>
                  </select>

                </div>


                {/* From */}
                <div className="leave-form-group">

                  <label>
                    From Date
                  </label>

                  <input
                    type="date"
                    name="fromDate"
                    value={leaveForm.fromDate}
                    onChange={handleFormChange}
                  />

                </div>


                {/* To */}
                <div className="leave-form-group">

                  <label>
                    To Date
                  </label>

                  <input
                    type="date"
                    name="toDate"
                    value={leaveForm.toDate}
                    onChange={handleFormChange}
                  />

                </div>


                {/* Reason */}
                <div className="leave-form-group full-width">

                  <label>
                    Reason
                  </label>

                  <textarea
                    name="reason"
                    rows="3"
                    value={leaveForm.reason}
                    onChange={handleFormChange}
                    placeholder="Enter the reason for your leave..."
                  />

                </div>

              </div>


              <div className="leave-form-actions">

                <button
                  type="button"
                  className="leave-cancel-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="leave-submit-button"
                >
                  Submit Leave Request
                </button>

              </div>

            </form>

          </section>
        )}


        {/* =====================================================
            RECENT LEAVE REQUESTS
        ===================================================== */}

        <section className="leave-requests-card">

          <div className="leave-section-header">

            <div>
              <h2>Recent Leave Requests</h2>
              <p>Track your submitted leave applications</p>
            </div>

          </div>


          <div className="leave-table-wrapper">

            <table className="leave-table">

              <thead>

                <tr>
                  <th>Leave Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Days</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>

              </thead>


              <tbody>

                {leaveRequests.map((request) => (

                  <tr key={request.id}>

                    <td className="leave-type">
                      {request.type}
                    </td>

                    <td>
                      {request.from}
                    </td>

                    <td>
                      {request.to}
                    </td>

                    <td>
                      {request.days}
                    </td>

                    <td className="leave-reason">
                      {request.reason}
                    </td>

                    <td>

                      <span
                        className={`leave-status ${request.status.toLowerCase()}`}
                      >
                        {request.status}
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

export default Leave;