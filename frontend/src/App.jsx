import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import EmployeeProfile from "./pages/EmployeeProfile";
import EditProfile from "./pages/EditProfile";
import PersonalJobDetails from "./pages/PersonalJobDetails";
import Salary from "./pages/Salary";
import Documents from "./pages/Documents";
import ProfilePicture from "./pages/ProfilePicture";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= EMPLOYEE PROFILE ================= */}
        <Route
          path="/profile"
          element={<EmployeeProfile />}
        />

        {/* ================= EDIT PROFILE ================= */}
        <Route
          path="/profile/edit"
          element={<EditProfile />}
        />

        {/* ================= PERSONAL & JOB DETAILS ================= */}
        <Route
          path="/profile/details"
          element={<PersonalJobDetails />}
        />

        {/* ================= SALARY ================= */}
        <Route
          path="/profile/salary"
          element={<Salary />}
        />

        {/* ================= DOCUMENTS ================= */}
        <Route
          path="/profile/documents"
          element={<Documents />}
        />

        {/* ================= PROFILE PICTURE ================= */}
        <Route
          path="/profile/picture"
          element={<ProfilePicture />}
        />

        {/* ================= DEFAULT ================= */}
        <Route
          path="*"
          element={
            <Navigate
              to="/profile"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;