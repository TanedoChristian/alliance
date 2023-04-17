import React, { useState } from "react";
import Header from "../../header";
import SideNav from "../../sidenav";
import Table from "../../table";
import { useMachine } from "@xstate/react";
import UserManagementMachine from "./machine";
import Modal from "../../modal";
import { type } from "os";
import axios from "axios";
import Setup from "../../../Setup";

const UserManagement = () => {
  const [current, send] = useMachine(UserManagementMachine);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const submitEmployee = () => {
    send("ON_SUBMIT");
    setShowAddModal(false);
  };

  const handleDelete = (id: any) => {
    send({ type: "ON_DELETE", data: id });
  };

  const updateEmployee = (user: any) => {
    send({ type: "ON_UPDATE", data: user });
    setShowUpdateModal(false);
  };

  return (
    <div className="w-full">
      <div className="h-[8vh] w-full  flex relative bg-gray-800 ">
        <div className="absolute flex w-full  h-full ">
          <div className="flex p-5 px-7 justify-between items-center w-full ">
            <img
              src="https://www.alliance.com.ph/images/asi-logo.svg"
              className="w-[10%]"
            />
            <div className="flex gap-2">
              <img
                className="w-9 h-9 rounded-full "
                src="https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=600"
              />
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </span>
              <div
                className="inline-flex justify-center items-center ml-4 cursor-pointer"
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between h-screen test">
        <SideNav>
          <ul className="flex flex-col py-4 space-y-1 justify-around h-screen p-4">
            <div className="flex flex-col gap-5">
              <li>
                <a
                  href="/dashboard"
                  className="relative flex flex-row items-center text-sm focus:outline-none text-gray-800 bg-gray-300  p-4 rounded-xl"
                >
                  <i className="fa-regular fa-ticket"></i>
                  <span className="inline-flex justify-center items-center ml-2">
                    Dashboard
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative flex flex-row items-center text-sm focus:outline-none  text-white bg-red-500 p-4 rounded-xl"
                >
                  <span className="inline-flex justify-center items-center ml-2">
                    User Management
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="relative flex flex-row items-center text-xs  focus:outline-none text-gray-800 bg-gray-300 p-4 rounded-xl"
                >
                  <span className="inline-flex justify-center items-center ml-2">
                    Category Management
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="relative flex flex-row items-center text-sm focus:outline-none text-gray-800 bg-gray-300 p-4 rounded-xl"
                >
                  <span className="inline-flex justify-center items-center ml-2">
                    Role Management
                  </span>
                </a>
              </li>
            </div>
            <li>
              <a
                href="#"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="ml-2 text-sm tracking-wide truncate">
                  Admin Panel
                </span>
              </a>
            </li>
          </ul>
        </SideNav>
        <div className="flex flex-col  bg-white w-full  rounded h-screen   overflow-y-auto">
          <div className="w-full flex justify-between px-10 items-center p-2">
            <h1 className="font-bold text-xl">Users</h1>
            <button
              className="p-2.5 text-white bg-red-500 rounded-xl shadow-md text-sm"
              onClick={() => {
                setShowAddModal(true);
              }}
            >
              Add Employee
            </button>
          </div>
          <Table headers={current.context.headers}>
            {current.context.users.map((item: any) => (
              <tr
                className="border border-gray-200  text-gray-600 hover:shadow-md hover:bg-blue-50 hover:font-medium hover:text-gray-700 hover:cursor-pointer"
                key={item.employeeId}
              >
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 overflow-hidden text-ellipsis">
                  {item.employeeId}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 overflow-hidden text-ellipsis">
                  {item.firstname}
                </td>

                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                  {item.lastname}
                </td>

                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                  {item.username}
                </td>

                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                  {item.type}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 flex gap-2 ">
                  <button
                    onClick={() => {
                      setShowUpdateModal(true);
                      send({ type: "ON_CHANGE", data: item });
                    }}
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>
                  <button onClick={() => handleDelete(item.employeeId)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </div>
      <Modal
        isOpen={showAddModal}
        height="h-[70%]"
        width="w-[50%]"
        title="Add Employee"
      >
        <div className="w-full bg-white flex p-10 justify-center">
          <div className="w-[50%] flex flex-col  gap-3 ">
            <div className="flex gap-2 items-center justify-between">
              <label>First Name: </label>
              <input
                type="text"
                placeholder="First Name"
                className="p-2 bg-gray-200 rounded-md"
                onChange={(e) => {
                  send({
                    type: "ON_CHANGE",
                    data: {
                      ...current.context.user,
                      firstname: e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div className="flex gap-2 items-center justify-between">
              <label>Last Name: </label>
              <input
                type="text"
                placeholder="Last Name"
                className="p-2 bg-gray-200 rounded-md"
                onChange={(e) => {
                  send({
                    type: "ON_CHANGE",
                    data: {
                      ...current.context.user,
                      lastname: e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div className="flex gap-2 items-center justify-between">
              <label>Username: </label>
              <input
                type="text"
                placeholder="Username"
                className="p-2 bg-gray-200 rounded-md"
                onChange={(e) => {
                  send({
                    type: "ON_CHANGE",
                    data: {
                      ...current.context.user,
                      username: e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div className="flex gap-2 items-center justify-between">
              <label>Email Address: </label>
              <input
                type="text"
                placeholder="Email Address"
                className="p-2 bg-gray-200 rounded-md"
                onChange={(e) => {
                  send({
                    type: "ON_CHANGE",
                    data: {
                      ...current.context.user,
                      username: e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div className="flex gap-2 items-center justify-between">
              <label>Type: </label>
              <input
                type="text"
                placeholder="Type"
                className="p-2 bg-gray-200 rounded-md"
                onChange={(e) => {
                  send({
                    type: "ON_CHANGE",
                    data: {
                      ...current.context.user,
                      type: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-center">
          <button
            className="p-3 px-6 rounded-xl bg-red-500 text-white font-medium"
            onClick={submitEmployee}
          >
            Submit
          </button>
          <button
            className="p-3 px-6 rounded-xl bg-gray-400 text-white font-medium"
            onClick={() => {
              setShowAddModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>

      {/* Update Modal */}

      <Modal
        isOpen={showUpdateModal}
        height="h-[70%]"
        width="w-[50%]"
        title="Add Employee"
      >
        <form>
          <div className="w-full bg-white flex p-10 justify-center">
            <div className="w-[50%] flex flex-col  gap-3 ">
              <div className="flex gap-2 items-center justify-between">
                <label>First Name: </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="p-2 bg-gray-200 rounded-md"
                  defaultValue={current.context.user.firstname}
                  onChange={(e) => {
                    send({
                      type: "ON_CHANGE",
                      data: {
                        ...current.context.user,
                        firstname: e.target.value,
                      },
                    });
                  }}
                />
              </div>
              <div className="flex gap-2 items-center justify-between">
                <label>Last Name: </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="p-2 bg-gray-200 rounded-md"
                  defaultValue={current.context.user.lastname}
                  onChange={(e) => {
                    send({
                      type: "ON_CHANGE",
                      data: {
                        ...current.context.user,
                        lastname: e.target.value,
                      },
                    });
                  }}
                />
              </div>
              <div className="flex gap-2 items-center justify-between">
                <label>Username: </label>
                <input
                  type="text"
                  placeholder="Username"
                  className="p-2 bg-gray-200 rounded-md"
                  defaultValue={current.context.user.username}
                  onChange={(e) => {
                    send({
                      type: "ON_CHANGE",
                      data: {
                        ...current.context.user,
                        username: e.target.value,
                      },
                    });
                  }}
                />
              </div>
              <div className="flex gap-2 items-center justify-between">
                <label>Email Address: </label>
                <input
                  type="text"
                  placeholder="Email Address"
                  className="p-2 bg-gray-200 rounded-md"
                  defaultValue={current.context.user.username}
                  onChange={(e) => {
                    send({
                      type: "ON_CHANGE",
                      data: {
                        ...current.context.user,
                        username: e.target.value,
                      },
                    });
                  }}
                />
              </div>
              <div className="flex gap-2 items-center justify-between">
                <label>Type: </label>
                <input
                  type="text"
                  placeholder="Type"
                  className="p-2 bg-gray-200 rounded-md"
                  defaultValue={current.context.user.type}
                  onChange={(e) => {
                    send({
                      type: "ON_CHANGE",
                      data: {
                        ...current.context.user,
                        type: e.target.value,
                      },
                    });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-center">
            <button
              className="p-3 px-6 rounded-xl bg-red-500 text-white font-medium"
              onClick={updateEmployee}
            >
              Update
            </button>
            <button
              className="p-3 px-6 rounded-xl bg-gray-400 text-white font-medium"
              onClick={() => {
                setShowUpdateModal(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UserManagement;
