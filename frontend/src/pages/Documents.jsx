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
  Upload,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "./Documents.css";

function Documents() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Aadhar Card",
      category: "Personal",
      date: "12 Jan 2023",
      fileUrl: null,
      file: null,
    },
    {
      id: 2,
      name: "PAN Card",
      category: "Personal",
      date: "12 Jan 2023",
      fileUrl: null,
      file: null,
    },
    {
      id: 3,
      name: "Educational Certificate",
      category: "Education",
      date: "15 Mar 2022",
      fileUrl: null,
      file: null,
    },
    {
      id: 4,
      name: "Experience Letter",
      category: "Experience",
      date: "15 Mar 2022",
      fileUrl: null,
      file: null,
    },
    {
      id: 5,
      name: "Offer Letter",
      category: "Employment",
      date: "15 Mar 2022",
      fileUrl: null,
      file: null,
    },
    {
      id: 6,
      name: "Bank Proof",
      category: "Personal",
      date: "20 Apr 2022",
      fileUrl: null,
      file: null,
    },
  ]);

  /* =====================================================
     OPEN FILE SELECTOR
  ===================================================== */

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  /* =====================================================
     HANDLE FILE UPLOAD
  ===================================================== */

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Maximum file size: 2 MB
    const maxSize = 2 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("File size must be less than 2 MB.");
      event.target.value = "";
      return;
    }

    const fileUrl = URL.createObjectURL(file);

    const today = new Date();

    const formattedDate = today.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const newDocument = {
      id: Date.now(),
      name: file.name,
      category: "Uploaded",
      date: formattedDate,
      fileUrl: fileUrl,
      file: file,
    };

    setDocuments((prevDocuments) => [
      ...prevDocuments,
      newDocument,
    ]);

    // Reset input so the same file can be selected again
    event.target.value = "";
  };

  /* =====================================================
     VIEW DOCUMENT
  ===================================================== */

  const handleView = (document) => {
    if (!document.fileUrl) {
      alert(
        `${document.name} is a sample document and does not have a file attached yet.`
      );
      return;
    }

    window.open(
      document.fileUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* =====================================================
     DOWNLOAD DOCUMENT
  ===================================================== */

  const handleDownload = (document) => {
    if (!document.fileUrl) {
      alert(
        `${document.name} is a sample document and does not have a file attached yet.`
      );
      return;
    }

    const link = document.createElement("a");

    link.href = document.fileUrl;
    link.download = document.name;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  return (
    <div className="documents-page">

      {/* ================= SIDEBAR ================= */}
      <aside className="documents-sidebar">

        {/* Logo */}
        <div className="documents-logo">

          <div className="documents-logo-box">
            <span>⌁</span>
          </div>

          <h2>HRMS</h2>

        </div>


        {/* ================= NAVIGATION ================= */}
        <nav className="documents-menu">

          {/* Dashboard */}
          <div
            className="documents-menu-item"
            onClick={() => navigate("/profile")}
          >
            <Grid2X2 size={18} />
            <span>Dashboard</span>
          </div>


          {/* Profile */}
          <div
            className="documents-menu-item"
            onClick={() => navigate("/profile")}
          >
            <UserRound size={18} />
            <span>Profile</span>
          </div>


          {/* Documents */}
          <div
            className="documents-menu-item active"
            onClick={() => navigate("/profile/documents")}
          >
            <FileText size={18} />
            <span>My Documents</span>
          </div>


          {/* Salary */}
          <div
            className="documents-menu-item"
            onClick={() => navigate("/profile/salary")}
          >
            <WalletCards size={18} />
            <span>Salary</span>
          </div>


          {/* Leave */}
          <div className="documents-menu-item">
            <CalendarDays size={18} />
            <span>Leave</span>
          </div>


          {/* Attendance */}
          <div className="documents-menu-item">
            <CalendarDays size={18} />
            <span>Attendance</span>
          </div>


          {/* Performance */}
          <div className="documents-menu-item">
            <ChartNoAxesCombined size={18} />
            <span>Performance</span>
          </div>


          {/* Training */}
          <div className="documents-menu-item">
            <GraduationCap size={18} />
            <span>Training</span>
          </div>


          {/* Help & Support */}
          <div className="documents-menu-item">
            <Headphones size={18} />
            <span>Help & Support</span>
          </div>

        </nav>


        {/* Logout */}
        <div className="documents-logout">

          <LogOut size={18} />

          <span>Logout</span>

        </div>

      </aside>


      {/* ================= MAIN CONTENT ================= */}
      <main className="documents-main">

        {/* Header */}
        <div className="documents-header">

          <div>

            <h1>Profile</h1>

            <div className="documents-breadcrumb">

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
                Documents
              </span>

            </div>

          </div>


          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />


          {/* Upload Button */}
          <button
            className="upload-button"
            onClick={handleUploadClick}
          >
            <Upload size={15} />

            <span>
              Upload Document
            </span>

          </button>

        </div>


        {/* ================= DOCUMENTS CARD ================= */}
        <section className="documents-card">

          <div className="documents-card-header">

            <div>
              <h2>
                My Documents
              </h2>

              <p>
                {documents.length} documents available
              </p>
            </div>

          </div>


          <div className="documents-table-wrapper">

            <table className="documents-table">

              <thead>
                <tr>

                  <th>
                    Document Name
                  </th>

                  <th>
                    Category
                  </th>

                  <th>
                    Uploaded On
                  </th>

                  <th className="action-column">
                    Action
                  </th>

                </tr>
              </thead>


              <tbody>

                {documents.map((document) => (

                  <tr key={document.id}>

                    {/* Document name */}
                    <td className="document-name">

                      <div className="document-name-wrapper">

                        <div className="document-file-icon">
                          <FileText size={14} />
                        </div>

                        <span>
                          {document.name}
                        </span>

                      </div>

                    </td>


                    {/* Category */}
                    <td>

                      <span className="category">
                        {document.category}
                      </span>

                    </td>


                    {/* Date */}
                    <td>
                      {document.date}
                    </td>


                    {/* Actions */}
                    <td className="document-actions">

                      {/* View */}
                      <button
                        className="icon-button"
                        title="View"
                        onClick={() =>
                          handleView(document)
                        }
                      >
                        <Eye size={15} />
                      </button>


                      {/* Download */}
                      <button
                        className="icon-button"
                        title="Download"
                        onClick={() =>
                          handleDownload(document)
                        }
                      >
                        <Download size={15} />
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>


          {/* ================= PAGINATION ================= */}
          <div className="pagination">

            <button className="pagination-arrow">
              <ChevronLeft size={15} />
            </button>

            <button className="page-number active">
              1
            </button>

            <button className="page-number">
              2
            </button>

            <button className="page-number">
              3
            </button>

            <button className="pagination-arrow">
              <ChevronRight size={15} />
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Documents;