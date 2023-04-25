import React, { useState, useEffect } from "react";
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
    <div className="w-full h-screen overflow-hidden">
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
                      email: e.target.value,
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
        width="w-[60%]"
        title="Update Employee"
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
                  defaultValue={current.context.user.email}
                  onChange={(e) => {
                    send({
                      type: "ON_CHANGE",
                      data: {
                        ...current.context.user,
                        email: e.target.value,
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

          <div className="flex gap-5 justify-center">
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

      <Header />
      <div className="flex w-full justify-between h-screen">
        <SideNav user={true} />

        <div className="flex  items-center w-full   py-5  flex-col h-screen bg-gray-50   rounded-t-xl shadow-xl">
          <div className="w-[95%] flex flex-col  gap-3     h-[90%] rounded-xl bg-white shadow-xl border border-gray-200 ">
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

                  <td className="border-t-0 px-6 align-middle border-l-0 uppercase border-r-0 text-xs whitespace-nowrap p-4 text-left  ">
                    {item.type}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-red-500 flex gap-2 ">
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
      </div>
    </div>
  );
};

export default UserManagement;
