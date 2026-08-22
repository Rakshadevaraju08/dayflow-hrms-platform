import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  Camera,
  ChevronRight,
} from "lucide-react";

import "./EditProfile.css";

function EditProfile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // =====================================================
  // PROFILE IMAGE
  // =====================================================

  const [profileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"
  );

  // =====================================================
  // FORM DATA
  // =====================================================

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

  // =====================================================
  // VALIDATION ERRORS
  // =====================================================

  const [errors, setErrors] = useState({});

  // =====================================================
  // SUBMIT STATE
  // =====================================================

  const [isSubmitting, setIsSubmitting] = useState(false);

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Clear current field error while typing
    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  // =====================================================
  // VALIDATE DATE
  // Format: DD/MM/YYYY
  // =====================================================

  const isValidDate = (dateString) => {
    const datePattern =
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    if (!datePattern.test(dateString)) {
      return false;
    }

    const [day, month, year] =
      dateString.split("/").map(Number);

    const date = new Date(year, month - 1, day);

    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  };

  // =====================================================
  // CHECK AGE
  // =====================================================

  const calculateAge = (dateString) => {
    const [day, month, year] =
      dateString.split("/").map(Number);

    const birthDate = new Date(
      year,
      month - 1,
      day
    );

    const today = new Date();

    let age =
      today.getFullYear() -
      birthDate.getFullYear();

    const monthDifference =
      today.getMonth() -
      birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 &&
        today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  // =====================================================
  // VALIDATE FORM
  // =====================================================

  const validateForm = () => {
    const newErrors = {};

    // -----------------------------
    // FULL NAME
    // -----------------------------

    const fullName = formData.fullName.trim();

    if (!fullName) {
      newErrors.fullName =
        "Full name is required.";
    } else if (fullName.length < 2) {
      newErrors.fullName =
        "Full name must contain at least 2 characters.";
    } else if (fullName.length > 50) {
      newErrors.fullName =
        "Full name cannot exceed 50 characters.";
    } else if (!/^[A-Za-z\s.]+$/.test(fullName)) {
      newErrors.fullName =
        "Full name can contain only letters, spaces and periods.";
    }

    // -----------------------------
    // EMAIL
    // -----------------------------

    const email = formData.email.trim();

    if (!email) {
      newErrors.email =
        "Email address is required.";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
        email
      )
    ) {
      newErrors.email =
        "Enter a valid email address.";
    }

    // -----------------------------
    // PHONE
    // -----------------------------

    const phone = formData.phone.replace(/\D/g, "");

    if (!formData.phone.trim()) {
      newErrors.phone =
        "Phone number is required.";
    } else if (!/^[6-9]\d{9}$/.test(phone)) {
      newErrors.phone =
        "Enter a valid 10-digit Indian mobile number.";
    }

    // -----------------------------
    // DATE OF BIRTH
    // -----------------------------

    if (!formData.dateOfBirth.trim()) {
      newErrors.dateOfBirth =
        "Date of birth is required.";
    } else if (!isValidDate(formData.dateOfBirth)) {
      newErrors.dateOfBirth =
        "Use a valid date in DD/MM/YYYY format.";
    } else {
      const age = calculateAge(
        formData.dateOfBirth
      );

      if (age < 18) {
        newErrors.dateOfBirth =
          "Employee must be at least 18 years old.";
      }

      if (age > 100) {
        newErrors.dateOfBirth =
          "Please enter a valid date of birth.";
      }
    }

    // -----------------------------
    // GENDER
    // -----------------------------

    if (!formData.gender) {
      newErrors.gender =
        "Please select gender.";
    }

    // -----------------------------
    // MARITAL STATUS
    // -----------------------------

    if (!formData.maritalStatus) {
      newErrors.maritalStatus =
        "Please select marital status.";
    }

    // -----------------------------
    // ADDRESS
    // -----------------------------

    const address = formData.address.trim();

    if (!address) {
      newErrors.address =
        "Address is required.";
    } else if (address.length < 10) {
      newErrors.address =
        "Address must contain at least 10 characters.";
    } else if (address.length > 250) {
      newErrors.address =
        "Address cannot exceed 250 characters.";
    }

    // -----------------------------
    // DEPARTMENT
    // -----------------------------

    if (!formData.department) {
      newErrors.department =
        "Please select a department.";
    }

    // -----------------------------
    // DESIGNATION
    // -----------------------------

    const designation =
      formData.designation.trim();

    if (!designation) {
      newErrors.designation =
        "Designation is required.";
    } else if (designation.length < 2) {
      newErrors.designation =
        "Designation must contain at least 2 characters.";
    } else if (designation.length > 60) {
      newErrors.designation =
        "Designation cannot exceed 60 characters.";
    }

    // -----------------------------
    // REPORTING TO
    // -----------------------------

    if (!formData.reportingTo) {
      newErrors.reportingTo =
        "Please select reporting manager.";
    }

    // -----------------------------
    // EMPLOYMENT TYPE
    // -----------------------------

    if (!formData.employmentType) {
      newErrors.employmentType =
        "Please select employment type.";
    }

    // -----------------------------
    // DATE OF JOINING
    // -----------------------------

    if (!formData.dateOfJoining.trim()) {
      newErrors.dateOfJoining =
        "Date of joining is required.";
    } else if (
      !isValidDate(formData.dateOfJoining)
    ) {
      newErrors.dateOfJoining =
        "Use a valid date in DD/MM/YYYY format.";
    }

    // -----------------------------
    // LOCATION
    // -----------------------------

    if (!formData.location) {
      newErrors.location =
        "Please select a location.";
    }

    // -----------------------------
    // DATE LOGIC
    // -----------------------------

    if (
      isValidDate(formData.dateOfBirth) &&
      isValidDate(formData.dateOfJoining)
    ) {
      const [dobDay, dobMonth, dobYear] =
        formData.dateOfBirth
          .split("/")
          .map(Number);

      const [joinDay, joinMonth, joinYear] =
        formData.dateOfJoining
          .split("/")
          .map(Number);

      const dob = new Date(
        dobYear,
        dobMonth - 1,
        dobDay
      );

      const joiningDate = new Date(
        joinYear,
        joinMonth - 1,
        joinDay
      );

      if (joiningDate <= dob) {
        newErrors.dateOfJoining =
          "Date of joining must be after date of birth.";
      }

      const today = new Date();

      today.setHours(0, 0, 0, 0);
      joiningDate.setHours(0, 0, 0, 0);

      if (joiningDate > today) {
        newErrors.dateOfJoining =
          "Date of joining cannot be in the future.";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =====================================================
  // PROFILE IMAGE VALIDATION
  // =====================================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
    ];

    const maxSize = 2 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      alert(
        "Only JPG, PNG, or GIF images are allowed."
      );

      e.target.value = "";
      return;
    }

    if (file.size > maxSize) {
      alert(
        "Profile picture must be less than 2 MB."
      );

      e.target.value = "";
      return;
    }

    const imageUrl =
      URL.createObjectURL(file);

    setProfileImage(imageUrl);
  };

  // =====================================================
  // OPEN IMAGE PICKER
  // =====================================================

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // =====================================================
  // SAVE
  // =====================================================

  const handleSave = async () => {
    const isValid = validateForm();

    if (!isValid) {
      // Scroll to the top so the user can see errors
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    try {
      setIsSubmitting(true);

      // Simulate save operation
      await new Promise((resolve) =>
        setTimeout(resolve, 700)
      );

      console.log(
        "Validated employee profile:",
        formData
      );

      alert(
        "Profile updated successfully!"
      );

      navigate("/profile");
    } catch (error) {
      console.error(error);

      alert(
        "Unable to update profile. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // =====================================================
  // CANCEL
  // =====================================================

  const handleCancel = () => {
    const hasChanges =
      JSON.stringify(formData) !==
      JSON.stringify({
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

    if (hasChanges) {
      const confirmCancel = window.confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      );

      if (!confirmCancel) {
        return;
      }
    }

    navigate("/profile");
  };

  return (
    <div className="edit-profile-page">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

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

          {/* Dashboard */}
          <div
            className="edit-nav-item"
            onClick={() => navigate("/profile")}
          >
            <span className="edit-nav-icon">
              <Grid2X2 size={18} />
            </span>

            <span>Dashboard</span>
          </div>


          {/* Profile */}
          <div
            className="edit-nav-item active"
            onClick={() => navigate("/profile")}
          >
            <span className="edit-nav-icon">
              <UserRound size={18} />
            </span>

            <span>Profile</span>
          </div>


          {/* Documents */}
          <div
            className="edit-nav-item"
            onClick={() =>
              navigate("/profile/documents")
            }
          >
            <span className="edit-nav-icon">
              <FileText size={18} />
            </span>

            <span>My Documents</span>
          </div>


          {/* Salary */}
          <div
            className="edit-nav-item"
            onClick={() =>
              navigate("/profile/salary")
            }
          >
            <span className="edit-nav-icon">
              <WalletCards size={18} />
            </span>

            <span>Salary</span>
          </div>


          {/* Leave */}
          <div
            className="edit-nav-item"
            onClick={() =>
              navigate("/profile/leave")
            }
          >
            <span className="edit-nav-icon">
              <CalendarDays size={18} />
            </span>

            <span>Leave</span>
          </div>


          {/* Attendance */}
          <div
            className="edit-nav-item"
            onClick={() =>
              navigate("/profile/attendance")
            }
          >
            <span className="edit-nav-icon">
              <CalendarDays size={18} />
            </span>

            <span>Attendance</span>
          </div>


          {/* Performance */}
          <div className="edit-nav-item">

            <span className="edit-nav-icon">
              <ChartNoAxesCombined size={18} />
            </span>

            <span>Performance</span>

          </div>


          {/* Training */}
          <div className="edit-nav-item">

            <span className="edit-nav-icon">
              <GraduationCap size={18} />
            </span>

            <span>Training</span>

          </div>


          {/* Help */}
          <div className="edit-nav-item">

            <span className="edit-nav-icon">
              <Headphones size={18} />
            </span>

            <span>Help & Support</span>

          </div>

        </nav>


        {/* Logout */}
        <div className="edit-sidebar-bottom">

          <div
            className="edit-nav-item logout"
            onClick={() => navigate("/profile")}
          >

            <span className="edit-nav-icon">
              <LogOut size={18} />
            </span>

            <span>Logout</span>

          </div>

        </div>

      </aside>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="edit-main">

        {/* Header */}
        <header className="edit-header">

          <div>

            <h1>Edit Profile</h1>

            <div className="edit-breadcrumb">

              <span
                onClick={() =>
                  navigate("/profile")
                }
                style={{ cursor: "pointer" }}
              >
                Home
              </span>

              <span className="breadcrumb-arrow">
                <ChevronRight size={14} />
              </span>

              <span
                onClick={() =>
                  navigate("/profile")
                }
                style={{ cursor: "pointer" }}
              >
                Profile
              </span>

              <span className="breadcrumb-arrow">
                <ChevronRight size={14} />
              </span>

              <span className="breadcrumb-active">
                Edit
              </span>

            </div>

          </div>


          {/* Header Actions */}
          <div className="edit-header-actions">

            <button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <button
              type="button"
              className="save-button"
              onClick={handleSave}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>

        </header>


        {/* =====================================================
            TOP SECTION
        ===================================================== */}

        <section className="edit-top-grid">

          {/* PROFILE PICTURE */}
          <div className="profile-picture-card">

            <h2>Profile Picture</h2>

            <div className="profile-picture-wrapper">

              <img
                src={profileImage}
                alt="Employee"
                className="profile-picture"
              />

              <button
                type="button"
                className="picture-camera-button"
                onClick={handleUploadClick}
                title="Change profile picture"
              >
                <Camera size={18} />
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
              type="button"
              className="upload-photo-butt"
              onClick={handleUploadClick}
            >
              <Upload size={15} />
              Upload Photo
            </button>

          </div>


          {/* PERSONAL DETAILS */}
          <div className="personal-details-card">

            <h2>Personal Details</h2>

            <div className="personal-form-grid">

              {/* Full Name */}
              <div className="form-group">

                <label>
                  Full Name
                  <span className="required">*</span>
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={
                    errors.fullName
                      ? "input-error"
                      : ""
                  }
                  placeholder="Enter full name"
                  maxLength={50}
                />

                {errors.fullName && (
                  <span className="validation-error">
                    {errors.fullName}
                  </span>
                )}

              </div>


              {/* Email */}
              <div className="form-group">

                <label>
                  Email
                  <span className="required">*</span>
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={
                    errors.email
                      ? "input-error"
                      : ""
                  }
                  placeholder="example@company.com"
                />

                {errors.email && (
                  <span className="validation-error">
                    {errors.email}
                  </span>
                )}

              </div>


              {/* Phone */}
              <div className="form-group">

                <label>
                  Phone
                  <span className="required">*</span>
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={
                    errors.phone
                      ? "input-error"
                      : ""
                  }
                  placeholder="+91 98765 43210"
                  maxLength={14}
                />

                {errors.phone && (
                  <span className="validation-error">
                    {errors.phone}
                  </span>
                )}

              </div>


              {/* Date of Birth */}
              <div className="form-group">

                <label>
                  Date of Birth
                  <span className="required">*</span>
                </label>

                <div
                  className={
                    errors.dateOfBirth
                      ? "input-with-icon input-error-wrapper"
                      : "input-with-icon"
                  }
                >

                  <input
                    type="text"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    placeholder="DD/MM/YYYY"
                    maxLength={10}
                  />

                  <span className="calendar-icon">
                    ▣
                  </span>

                </div>

                {errors.dateOfBirth && (
                  <span className="validation-error">
                    {errors.dateOfBirth}
                  </span>
                )}

              </div>


              {/* Gender */}
              <div className="form-group">

                <label>
                  Gender
                  <span className="required">*</span>
                </label>

                <div
                  className={
                    errors.gender
                      ? "select-wrapper input-error-wrapper"
                      : "select-wrapper"
                  }
                >

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select Gender
                    </option>

                    <option value="Female">
                      Female
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>

                {errors.gender && (
                  <span className="validation-error">
                    {errors.gender}
                  </span>
                )}

              </div>


              {/* Marital Status */}
              <div className="form-group">

                <label>
                  Marital Status
                  <span className="required">*</span>
                </label>

                <div
                  className={
                    errors.maritalStatus
                      ? "select-wrapper input-error-wrapper"
                      : "select-wrapper"
                  }
                >

                  <select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select Status
                    </option>

                    <option value="Single">
                      Single
                    </option>

                    <option value="Married">
                      Married
                    </option>

                    <option value="Divorced">
                      Divorced
                    </option>

                    <option value="Widowed">
                      Widowed
                    </option>

                  </select>

                </div>

                {errors.maritalStatus && (
                  <span className="validation-error">
                    {errors.maritalStatus}
                  </span>
                )}

              </div>

            </div>


            {/* Address */}
            <div className="form-group address-group">

              <label>
                Address
                <span className="required">*</span>
              </label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={
                  errors.address
                    ? "input-error"
                    : ""
                }
                rows="3"
                maxLength={250}
                placeholder="Enter complete address"
              />

              <div className="field-bottom">
                <span>
                  {formData.address.length}/250
                </span>

                {errors.address && (
                  <span className="validation-error">
                    {errors.address}
                  </span>
                )}
              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            JOB DETAILS
        ===================================================== */}

        <section className="job-details-card">

          <h2>Job Details</h2>

          <div className="job-form-grid">

            {/* Department */}
            <div className="form-group">

              <label>
                Department
                <span className="required">*</span>
              </label>

              <div
                className={
                  errors.department
                    ? "select-wrapper input-error-wrapper"
                    : "select-wrapper"
                }
              >

                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                >

                  <option value="">
                    Select Department
                  </option>

                  <option value="Human Resources">
                    Human Resources
                  </option>

                  <option value="Finance">
                    Finance
                  </option>

                  <option value="Information Technology">
                    Information Technology
                  </option>

                  <option value="Marketing">
                    Marketing
                  </option>

                  <option value="Administration">
                    Administration
                  </option>

                </select>

              </div>

              {errors.department && (
                <span className="validation-error">
                  {errors.department}
                </span>
              )}

            </div>


            {/* Designation */}
            <div className="form-group">

              <label>
                Designation
                <span className="required">*</span>
              </label>

              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className={
                  errors.designation
                    ? "input-error"
                    : ""
                }
                placeholder="Enter designation"
                maxLength={60}
              />

              {errors.designation && (
                <span className="validation-error">
                  {errors.designation}
                </span>
              )}

            </div>


            {/* Reporting To */}
            <div className="form-group">

              <label>
                Reporting To
                <span className="required">*</span>
              </label>

              <div
                className={
                  errors.reportingTo
                    ? "select-wrapper input-error-wrapper"
                    : "select-wrapper"
                }
              >

                <select
                  name="reportingTo"
                  value={formData.reportingTo}
                  onChange={handleChange}
                >

                  <option value="">
                    Select Manager
                  </option>

                  <option value="Ramesh Kumar">
                    Ramesh Kumar
                  </option>

                  <option value="Karthik L">
                    Karthik L
                  </option>

                  <option value="Admin">
                    Admin
                  </option>

                </select>

              </div>

              {errors.reportingTo && (
                <span className="validation-error">
                  {errors.reportingTo}
                </span>
              )}

            </div>


            {/* Employment Type */}
            <div className="form-group">

              <label>
                Employment Type
                <span className="required">*</span>
              </label>

              <div
                className={
                  errors.employmentType
                    ? "select-wrapper input-error-wrapper"
                    : "select-wrapper"
                }
              >

                <select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                >

                  <option value="">
                    Select Type
                  </option>

                  <option value="Full Time">
                    Full Time
                  </option>

                  <option value="Part Time">
                    Part Time
                  </option>

                  <option value="Contract">
                    Contract
                  </option>

                  <option value="Intern">
                    Intern
                  </option>

                </select>

              </div>

              {errors.employmentType && (
                <span className="validation-error">
                  {errors.employmentType}
                </span>
              )}

            </div>


            {/* Date of Joining */}
            <div className="form-group">

              <label>
                Date of Joining
                <span className="required">*</span>
              </label>

              <div
                className={
                  errors.dateOfJoining
                    ? "input-with-icon input-error-wrapper"
                    : "input-with-icon"
                }
              >

                <input
                  type="text"
                  name="dateOfJoining"
                  value={formData.dateOfJoining}
                  onChange={handleChange}
                  placeholder="DD/MM/YYYY"
                  maxLength={10}
                />

                <span className="calendar-icon">
                  ▣
                </span>

              </div>

              {errors.dateOfJoining && (
                <span className="validation-error">
                  {errors.dateOfJoining}
                </span>
              )}

            </div>


            {/* Location */}
            <div className="form-group">

              <label>
                Location
                <span className="required">*</span>
              </label>

              <div
                className={
                  errors.location
                    ? "select-wrapper input-error-wrapper"
                    : "select-wrapper"
                }
              >

                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                >

                  <option value="">
                    Select Location
                  </option>

                  <option value="Bengaluru">
                    Bengaluru
                  </option>

                  <option value="Mysuru">
                    Mysuru
                  </option>

                  <option value="Hyderabad">
                    Hyderabad
                  </option>

                  <option value="Chennai">
                    Chennai
                  </option>

                  <option value="Mumbai">
                    Mumbai
                  </option>

                </select>

              </div>

              {errors.location && (
                <span className="validation-error">
                  {errors.location}
                </span>
              )}

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default EditProfile;