import React from "react";
import "./index.css";
import { BrowserRouter, Routes, Route, Form } from "react-router-dom";
import Login from "./components/login";
import HomePage from "./components";
import Dashboard from "./components/dashboard/admin";
import DashboardContainer from "./components/dashboard";
import UserManagement from "./components/admin/user-management";

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
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
