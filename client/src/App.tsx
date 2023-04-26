import React from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import HomePage from "./components";
import DashboardContainer from "./components/dashboard";
import UserManagement from "./components/admin/user-management";
import CategoryManagement from "./components/admin/category-management";
import AdminPanel from "./components/admin/admin-panel";
<<<<<<< HEAD
=======
import RoleManagement from "./components/admin/role-management";
import AccountSettings from "./components/account-settings";
import UserManagementHr from "./components/hr/user-management";

>>>>>>> 3933eae243268bdab94ae55e1f685fef88411544

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/account/settings" element={<AccountSettings />}></Route>
          <Route path="/dashboard" element={<DashboardContainer />}></Route>
          <Route
            path="/admin/usermanagement"
            element={<UserManagement />}
          ></Route>
          <Route
            path="/admin/panel"
            element={<AdminPanel />}
          ></Route>
          <Route
            path="/admin/categorymanagement"
            element={<CategoryManagement />}
          ></Route>
          <Route
<<<<<<< HEAD
            path="/admin/adminpanel"
            element={<AdminPanel />}
=======
            path="/admin/rolemanagement"
            element={<RoleManagement />}
          ></Route>
          <Route
            path="/hr/usermanagement"
            element={<UserManagementHr />}
>>>>>>> 3933eae243268bdab94ae55e1f685fef88411544
          ></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
