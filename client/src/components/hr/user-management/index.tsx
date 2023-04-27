import { useEffect, useState } from "react";
import Modal from "../../modal";
import SideNav from "../../sidenav";
import Table from "../../table";
import axios from "axios";
import Setup from "../../../Setup";
import Header from "../../header";

const UserManagementHr = () => {
  const [showViewModal, setShowViewModal] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [selectedData, setSelectedData] = useState({
    email: "",
    employeeId: "",
    firstname: "",
    lastname: "",
    username: "",
    type: "",
  });

  const handleCloseViewModal = () => {
    setShowViewModal(false);
  };

  useEffect(() => {
    axios
      .get(`${Setup.SERVER_URL()}/employee/getall`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then(({ data }) => {
        console.log("hr user:", data);
        setEmployee(data);
      });
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden">
      <Header />
      <div className="flex justify-between h-[92vh]">
        <div className="flex w-[15%] bg-[#f6f8fc] h-full">
          <ul className="flex flex-col py-20 space-y-1 justify-between  p-4 h-[90vh]">
            <div className="flex flex-col gap-5">
              <li className="w-[100%]">
                <a
                  href="/dashboard"
                  className={` flex  items-center text-sm focus:outline-none text-gray-700 text-[0.8rem] gap-3 rounded-xl font-medium`}
                >
                  <span className="material-symbols-outlined w-[2rem]">
                    confirmation_number
                  </span>
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/hr/usermanagement"
                  className={` flex  items-center text-red-500 text-sm focus:outline-none text-gray-700 text-[0.8rem] gap-3 rounded-xl font-medium`}
                >
                  <i className="fa-solid fa-user w-[2rem] text-lg"></i>
                  Users Management
                </a>
              </li>
            </div>
          </ul>
        </div>

        <div className="flex  items-center w-full   py-5  flex-col h-screen bg-gray-50   rounded-t-xl shadow-xl">
          <div className="w-[95%] flex flex-col  gap-3     h-[90%] rounded-xl bg-white shadow-xl border border-gray-200 ">
            <div className="flex justify-between p-5 items-center">
              <h1 className="font-bold text-2xl text-slate-700 poppins">
                Users
              </h1>
            </div>
            <Table
              headers={[
                "Employee ID",
                "Firstname",
                "Lastname",
                "Username",
                "Email",
                "Role",
                "Actions",
              ]}
            >
              {employee.map((item: any) => (
                <tr
                  className="border border-gray-200 text-gray-600 hover:shadow-md hover:bg-blue-50 hover:font-medium hover:text-gray-700 hover:cursor-pointer"
                  key={item.employeeId}
                >
                  <td className="border-t-0 px-6 align-middle  border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left  overflow-hidden text-ellipsis">
                    {item.employeeId}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left  overflow-hidden text-ellipsis">
                    {item.firstname}
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left  ">
                    {item.lastname}
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left ">
                    {item.username}
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left ">
                    {item.email}
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 uppercase border-r-0 text-xs whitespace-nowrap p-4 text-left  ">
                    {item.type}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-red-500 flex gap-2 ">
                    <button
                      onClick={() => {
                        setSelectedData(item);
                        setShowViewModal(true);
                      }}
                    >
                      <i className="fa-solid fa-eye"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </Table>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showViewModal}
        height={"h-[70%]"}
        width={"w-[50%]"}
        title="View Employee"
        handleClose={handleCloseViewModal}
      >
        <div className="w-full bg-white flex p-10 justify-center">
          <div className="w-[50%] flex flex-col  gap-3 ">
            <div className="flex gap-2 items-center justify-between">
              <label>ID: </label>
              <input
                type="text"
                placeholder="Employee ID"
                className="p-2 bg-gray-200 rounded-md"
                defaultValue={selectedData.employeeId}
              />
            </div>
            <div className="flex gap-2 items-center justify-between">
              <label>First Name: </label>
              <input
                type="text"
                placeholder="First Name"
                className="p-2 bg-gray-200 rounded-md"
                defaultValue={selectedData.firstname}
              />
            </div>
            <div className="flex gap-2 items-center justify-between">
              <label>Last Name: </label>
              <input
                type="text"
                placeholder="Last Name"
                className="p-2 bg-gray-200 rounded-md"
                defaultValue={selectedData.lastname}
              />
            </div>
            <div className="flex gap-2 items-center justify-between">
              <label>Username: </label>
              <input
                type="text"
                placeholder="Username"
                className="p-2 bg-gray-200 rounded-md"
                defaultValue={selectedData.username}
              />
            </div>
            <div className="flex gap-2 items-center justify-between">
              <label>Email Address: </label>
              <input
                type="text"
                placeholder="Email Address"
                className="p-2 bg-gray-200 rounded-md"
                defaultValue={selectedData.email}
              />
            </div>
            <div className="flex gap-2 items-center justify-between">
              <label>Type: </label>
              <input
                type="text"
                placeholder="Type"
                className="p-2 bg-gray-200 rounded-md"
                defaultValue={selectedData.type}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserManagementHr;
