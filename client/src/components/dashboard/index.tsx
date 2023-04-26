import React, { useEffect, useState } from "react";
import Dashboard from "./admin";
import EmployeeDashBoard from "./employee";
import DashBoardHr from "../hr/dashboard";

const DashboardContainer = () => {
  const [type, setType]: any = useState(localStorage.getItem("type"));

  return (
    <div>
      {type == "admin" ? (
        <Dashboard />
      ) : type === "employee" ? (
        <EmployeeDashBoard />
      ) : (
        <DashBoardHr />
      )}
    </div>
  );
};

export default DashboardContainer;
