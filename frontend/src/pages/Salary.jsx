import React, { useMemo } from "react";

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
import { jsPDF } from "jspdf";

import "./Salary.css";

function Salary() {
  const navigate = useNavigate();

  // =====================================================
  // EMPLOYEE + SALARY DATA
  // =====================================================

  const employee = {
    name: "Hemalatha L",
    employeeId: "EMP00125",
    designation: "HR Manager",
    department: "Human Resources",
  };

  const salaryData = {
    basic: 50000,
    hra: 20000,
    specialAllowance: 15000,
    transportAllowance: 5000,

    providentFund: 4000,
    professionalTax: 200,
    incomeTax: 5350,
  };

  // =====================================================
  // CALCULATE SALARY DYNAMICALLY
  // =====================================================

  const salary = useMemo(() => {
    const grossSalary =
      salaryData.basic +
      salaryData.hra +
      salaryData.specialAllowance +
      salaryData.transportAllowance;

    const totalDeductions =
      salaryData.providentFund +
      salaryData.professionalTax +
      salaryData.incomeTax;

    const takeHome = grossSalary - totalDeductions;

    const annualCTC = grossSalary * 12;

    return {
      grossSalary,
      totalDeductions,
      takeHome,
      annualCTC,
    };
  }, []);

  // =====================================================
  // MONTH
  // =====================================================

  const payslipMonth = "May 2026";
  const paymentDate = "31 May 2026";

  // =====================================================
  // CURRENCY FORMAT
  // =====================================================

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  // =====================================================
  // DYNAMIC PDF DOWNLOAD
  // =====================================================

  const handleDownloadPayslip = () => {
    const pdf = new jsPDF();

    // -------------------------
    // HEADER
    // -------------------------

    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");

    pdf.text("DAYFLOW HRMS", 20, 20);

    pdf.setFontSize(15);
    pdf.text("EMPLOYEE PAYSLIP", 20, 32);

    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");

    pdf.text(`Pay Period: ${payslipMonth}`, 140, 20);
    pdf.text(`Payment Date: ${paymentDate}`, 140, 27);

    // Divider
    pdf.line(20, 38, 190, 38);

    // -------------------------
    // EMPLOYEE DETAILS
    // -------------------------

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");

    pdf.text("Employee Details", 20, 50);

    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");

    pdf.text(`Employee Name: ${employee.name}`, 20, 60);
    pdf.text(`Employee ID: ${employee.employeeId}`, 20, 68);

    pdf.text(`Designation: ${employee.designation}`, 110, 60);
    pdf.text(`Department: ${employee.department}`, 110, 68);

    // -------------------------
    // SALARY DETAILS
    // -------------------------

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");

    pdf.text("Salary Details", 20, 84);

    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");

    let y = 96;

    const addRow = (label, value) => {
      pdf.text(label, 25, y);
      pdf.text(formatCurrency(value), 155, y);
      y += 9;
    };

    addRow("Basic Salary", salaryData.basic);
    addRow("House Rent Allowance", salaryData.hra);
    addRow(
      "Special Allowance",
      salaryData.specialAllowance
    );
    addRow(
      "Transport Allowance",
      salaryData.transportAllowance
    );

    // -------------------------
    // GROSS SALARY
    // -------------------------

    pdf.setFont("helvetica", "bold");

    pdf.line(20, y, 190, y);

    y += 9;

    pdf.text("Gross Salary", 25, y);
    pdf.text(
      formatCurrency(salary.grossSalary),
      155,
      y
    );

    y += 18;

    // -------------------------
    // DEDUCTIONS
    // -------------------------

    pdf.setFontSize(12);
    pdf.text("Deductions", 20, y);

    pdf.setFontSize(10);

    y += 12;

    addRow(
      "Provident Fund",
      salaryData.providentFund
    );

    addRow(
      "Professional Tax",
      salaryData.professionalTax
    );

    addRow(
      "Income Tax",
      salaryData.incomeTax
    );

    pdf.line(20, y, 190, y);

    y += 9;

    pdf.text("Total Deductions", 25, y);
    pdf.text(
      formatCurrency(salary.totalDeductions),
      155,
      y
    );

    // -------------------------
    // TAKE HOME
    // -------------------------

    y += 20;

    pdf.setFillColor(235, 249, 242);

    pdf.roundedRect(
      20,
      y - 7,
      170,
      18,
      3,
      3,
      "F"
    );

    pdf.setFontSize(12);
    pdf.setTextColor(25, 145, 100);

    pdf.text("Take Home Salary", 27, y + 4);

    pdf.text(
      formatCurrency(salary.takeHome),
      155,
      y + 4
    );

    // -------------------------
    // CTC
    // -------------------------

    y += 28;

    pdf.setTextColor(30, 40, 70);

    pdf.setFontSize(10);

    pdf.text(
      `Annual CTC: ${formatCurrency(
        salary.annualCTC
      )}`,
      20,
      y
    );

    // -------------------------
    // FOOTER
    // -------------------------

    y += 22;

    pdf.setFontSize(9);

    pdf.setTextColor(120, 130, 150);

    pdf.text(
      "Generated by Dayflow HRMS",
      20,
      y
    );

    // -------------------------
    // DOWNLOAD
    // -------------------------

    const safeEmployeeName = employee.name
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_]/g, "");

    const safeMonth = payslipMonth
      .replace(/\s+/g, "_");

    pdf.save(
      `${safeEmployeeName}_Payslip_${safeMonth}.pdf`
    );
  };

  return (
    <div className="salary-page">

      {/* ================= SIDEBAR ================= */}
      <aside className="salary-sidebar">

        <div className="salary-logo">
          <div className="salary-logo-box">
            <span>⌁</span>
          </div>

          <h2>HRMS</h2>
        </div>

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

          {/* Documents */}
          <div
            className="salary-menu-item"
            onClick={() =>
              navigate("/profile/documents")
            }
          >
            <FileText size={17} />
            <span>My Documents</span>
          </div>

          {/* Salary */}
          <div
            className="salary-menu-item active"
            onClick={() =>
              navigate("/profile/salary")
            }
          >
            <WalletCards size={17} />
            <span>Salary</span>
          </div>

          {/* Leave */}
          <div
            className="salary-menu-item"
            onClick={() =>
              navigate("/profile/leave")
            }
          >
            <CalendarDays size={17} />
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
          <div className="salary-menu-item">
            <ChartNoAxesCombined size={17} />
            <span>Performance</span>
          </div>

          {/* Training */}
          <div className="salary-menu-item">
            <GraduationCap size={17} />
            <span>Training</span>
          </div>

          {/* Help */}
          <div className="salary-menu-item">
            <Headphones size={17} />
            <span>Help & Support</span>
          </div>

        </nav>

        {/* Logout */}
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


      {/* ================= MAIN ================= */}
      <main className="salary-main">

        {/* Header */}
        <div className="salary-header">

          <div>

            <h1>Profile</h1>

            <div className="salary-breadcrumb">

              <span
                className="breadcrumb-link"
                onClick={() =>
                  navigate("/profile")
                }
              >
                Home
              </span>

              <ChevronRight size={13} />

              <span
                className="breadcrumb-link"
                onClick={() =>
                  navigate("/profile")
                }
              >
                Profile
              </span>

              <ChevronRight size={13} />

              <span className="salary-current">
                Salary
              </span>

            </div>

          </div>

          {/* DYNAMIC DOWNLOAD BUTTON */}
          <button
            className="download-button"
            type="button"
            onClick={handleDownloadPayslip}
          >
            <Download size={14} />
            <span>Download Payslips</span>
          </button>

        </div>


        {/* ================= TABS ================= */}
        <div className="profile-tabs">

          <div
            className="profile-tab"
            onClick={() =>
              navigate("/profile")
            }
          >
            Personal Details
          </div>

          <div
            className="profile-tab"
            onClick={() =>
              navigate("/profile/details")
            }
          >
            Job Details
          </div>

          <div
            className="profile-tab active"
            onClick={() =>
              navigate("/profile/salary")
            }
          >
            Salary
          </div>

          <div
            className="profile-tab"
            onClick={() =>
              navigate("/profile/documents")
            }
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
              <strong>
                {formatCurrency(
                  salary.annualCTC
                )}
              </strong>
            </div>

            <div className="overview-item">
              <span>Monthly Salary</span>
              <strong>
                {formatCurrency(
                  salary.grossSalary
                )}
              </strong>
            </div>

            <div className="overview-item">
              <span>Take Home</span>
              <strong>
                {formatCurrency(
                  salary.takeHome
                )}
              </strong>
            </div>

          </div>

        </section>


        {/* ================= LOWER CONTENT ================= */}
        <div className="salary-lower-grid">

          {/* Salary Breakup */}
          <section className="salary-card breakdown-card">

            <h3>
              Salary Breakup (Monthly)
            </h3>

            <div className="salary-breakdown">

              <div className="salary-row">
                <span>Basic Salary</span>
                <strong>
                  {formatCurrency(
                    salaryData.basic
                  )}
                </strong>
              </div>

              <div className="salary-row">
                <span>
                  House Rent Allowance
                </span>

                <strong>
                  {formatCurrency(
                    salaryData.hra
                  )}
                </strong>
              </div>

              <div className="salary-row">
                <span>
                  Special Allowance
                </span>

                <strong>
                  {formatCurrency(
                    salaryData.specialAllowance
                  )}
                </strong>
              </div>

              <div className="salary-row">
                <span>
                  Transport Allowance
                </span>

                <strong>
                  {formatCurrency(
                    salaryData.transportAllowance
                  )}
                </strong>
              </div>

              <div className="salary-row deduction">
                <span>
                  Provident Fund (Employee)
                </span>

                <strong>
                  -{" "}
                  {formatCurrency(
                    salaryData.providentFund
                  )}
                </strong>
              </div>

              <div className="salary-row deduction">
                <span>
                  Professional Tax
                </span>

                <strong>
                  -{" "}
                  {formatCurrency(
                    salaryData.professionalTax
                  )}
                </strong>
              </div>

              <div className="salary-row deduction">
                <span>
                  Income Tax
                </span>

                <strong>
                  -{" "}
                  {formatCurrency(
                    salaryData.incomeTax
                  )}
                </strong>
              </div>

              <div className="take-home-row">
                <span>
                  Take Home Salary
                </span>

                <strong>
                  {formatCurrency(
                    salary.takeHome
                  )}
                </strong>
              </div>

            </div>

          </section>


          {/* Recent Payslips */}
          <section className="salary-card payslip-card">

            <h3>
              Recent Payslips
            </h3>

            <div className="payslip-list">

              <div className="payslip-item">

                <div className="payslip-icon">
                  <PayslipIcon size={15} />
                </div>

                <div className="payslip-info">
                  <strong>
                    May 2026
                  </strong>

                  <span>
                    31 May 2026
                  </span>
                </div>

                <strong className="payslip-amount">
                  {formatCurrency(
                    salary.takeHome
                  )}
                </strong>

              </div>


              <div className="payslip-item">

                <div className="payslip-icon">
                  <PayslipIcon size={15} />
                </div>

                <div className="payslip-info">
                  <strong>
                    Apr 2026
                  </strong>

                  <span>
                    30 Apr 2026
                  </span>
                </div>

                <strong className="payslip-amount">
                  {formatCurrency(
                    salary.takeHome
                  )}
                </strong>

              </div>


              <div className="payslip-item">

                <div className="payslip-icon">
                  <PayslipIcon size={15} />
                </div>

                <div className="payslip-info">
                  <strong>
                    Mar 2026
                  </strong>

                  <span>
                    31 Mar 2026
                  </span>
                </div>

                <strong className="payslip-amount">
                  {formatCurrency(
                    salary.takeHome
                  )}
                </strong>

              </div>

            </div>


            <button
              className="all-payslips"
              type="button"
              onClick={handleDownloadPayslip}
            >
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