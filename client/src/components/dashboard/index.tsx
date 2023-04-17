import React, { useEffect, useState } from "react";
import Dashboard from "./admin";
import EmployeeDashBoard from "./employee";

const DashboardContainer = () => {
  const [type, setType]: any = useState(localStorage.getItem("type"));

  return <div>{type == "admin" ? <Dashboard /> : <EmployeeDashBoard />}</div>;
};

export default DashboardContainer;
