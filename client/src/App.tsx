import React from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import HomePage from "./components";
import DashboardContainer from "./components/dashboard";
import UserManagement from "./components/admin/user-management";
import CategoryManagement from "./components/admin/category-management";
import RoleManagement from "./components/admin/role-management";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/dashboard" element={<DashboardContainer />}></Route>
          <Route
            path="/admin/usermanagement"
            element={<UserManagement />}
          ></Route>
          <Route
            path="/admin/categorymanagement"
            element={<CategoryManagement />}
          ></Route>
          <Route
            path="/admin/rolemanagement"
            element={<RoleManagement />}
          ></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
