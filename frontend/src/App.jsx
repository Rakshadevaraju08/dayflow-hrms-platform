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

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Employee Profile */}
        <Route
          path="/profile"
          element={<EmployeeProfile />}
        />

        {/* Edit Profile */}
        <Route
          path="/profile/edit"
          element={<EditProfile />}
        />

        {/* Personal & Job Details */}
        <Route
          path="/profile/details"
          element={<PersonalJobDetails />}
        />

        {/* Salary */}
        <Route
          path="/profile/salary"
          element={<Salary />}
        />

        {/* Default page */}
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