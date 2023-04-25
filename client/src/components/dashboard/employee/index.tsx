import React, { useState, useEffect } from "react";
import SideNav from "../../sidenav";
import Table from "../../table";
import { useMachine } from "@xstate/react";
import Modal from "../../modal";
import axios from "axios";

const EmployeeDashBoard = () => {
  const [tickets, setTickets]: any = useState([]);
  const [ticket, setTicket]: any = useState({});
  const [file, setFile]: any = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:8080/spring-hibernate-jpa/ticket/gettable",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }).then(({ data }) => {
      setTickets(data.data);
    });
  }, [success]);

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setTicket((prev: any) => {
      return { ...ticket, [name]: value };
    });
  };

  const onChangeFile = (e: any) => {
    setFile(e.target.files[0]);
  };

  const submitTicket = () => {
    axios({
      method: "POST",
      url: "http://localhost:8080/spring-hibernate-jpa/ticket/create",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "multipart/form-data",
      },

      data: {
        ...ticket,
        file: file,
        employee_id: localStorage.getItem("employee_id"),
        date_issued: new Date(),
        assingee_id: ticket.category,
      },
    }).then(({ data }) => {
      setSuccess(!success);
      setModalOpen(false);
      setFile([]);
    });
  };

  const [isOpen, setModalOpen] = useState(false);

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        handleClose={handleClose}
        height="h-[70%]"
        width="w-[60%]"
        title="Add Ticket"
      >
        <form
          className="p-5 flex flex-col gap-10 h-full "
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex gap-3 items-center ">
            <label>Category: </label>
            <div className="relative ">
              <div className="h-10 flex border border-gray-100 rounded-md items-center">
                <select
                  className="bg-gray-100 outline-none text-gray-900 text-sm rounded-lg block w-full p-3 "
                  name="category"
                  onChange={onChange}
                >
                  <option selected>
                    Choose Category
                    <i className="fa-solid fa-ellipsis-vertical fa-rotate-90 px-2"></i>
                  </option>
                  <option value="1">Benefits</option>
                  <option value="2">Payroll</option>
                  <option value="3">Recruitment</option>
                  <option value="4">Training</option>
                  <option value="5">Pes</option>
                  <option value="6">Memo</option>
                  <option value="7">COE</option>
                  <option value="8">Engagement</option>
                  <option value="9">Policy</option>
                  <option value="10">Others</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-3 items-center ">
            <label>Priority: </label>
            <div className="relative ">
              <div className="h-10  flex border border-gray-100 rounded-md items-center">
                <select
                  className="bg-gray-100 outline-none text-gray-900 text-sm rounded-lg block w-full p-3 "
                  name="status"
                  onChange={onChange}
                >
                  <option selected>Choose a Status</option>
                  <option value="1">High</option>
                  <option value="2">Mid</option>
                  <option value="3">Low</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
              <div className="flex items-center justify-between px-3 py-2 border-b ">
                <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x ">
                  <div className="flex items-center space-x-1 sm:pr-4">
                    <span className=" hover:bg-gray-600 hover:text-white  p-2 rounded cursor-pointer">
                      <label className="cursor-pointer">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 hover:bg-gray-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          onChange={onChangeFile}
                        />
                      </label>
                    </span>
                    <span className="sr-only">Upload image</span>
                  </div>
                </div>
                <button
                  type="button"
                  data-tooltip-target="tooltip-fullscreen"
                  className="p-2 text-gray-500 rounded cursor-pointer sm:ml-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Full screen</span>
                </button>
                <div
                  id="tooltip-fullscreen"
                  role="tooltip"
                  className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                >
                  Show full screen
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
              </div>

              <div className="px-4 py-2 bg-white rounded-b-lg ">
                <textarea
                  id="editor"
                  rows={8}
                  className="block w-full px-0 text-sm text-gray-800 bg-white border-0  focus:ring-0 outline-none "
                  placeholder="Description"
                  name="description"
                  onChange={onChange}
                  required
                ></textarea>
              </div>
            </div>

            <div className="w-full flex justify-between px-3">
              <p className="text-ellipsis">
                Supported types: jpeg, jpg, pdf, png
              </p>
              <div
                className="p-2 rounded-xl bg-red-100 text-red-500  relative"
                style={{ display: file.name ? "block" : "none" }}
              >
                <p className="text-ellipsis">{file.name ?? ""}</p>

                <p className="text-ellipsis">
                  Supported types: jpeg, jpg, pdf, png
                </p>

                <button className="absolute top-[-5px] right-0  rounded-full ">
                  <i className="fa-regular fa-circle-xmark "></i>
                </button>
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                onClick={submitTicket}
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </Modal>

      <div className="w-full h-screen flex flex-col">
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
        <div className="flex justify-between h-screen">
          <div className="test w-[15%]"></div>
          <main className="w-[85%] flex flex-col p-8 bg-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-medium mb-2"> Ticket</h1>
              <button
                className="rounded-lg bg-red-600 text-white px-5 py-1.5 text-sm font-bold antialiased shadow-md"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                Add Ticket
              </button>
            </div>

            <div className="bg-white rounded-xl w-full h-[100%] flex flex-col gap-5">
              <Table
                headers={[
                  "Ticket ID",
                  "Description",
                  "Category",
                  "Status",
                  "Assign To",
                  "Date Issued",
                ]}
              >
                {tickets.map((item: any) => (
                  <tr
                    className="border border-gray-200  text-gray-600 hover:shadow-md hover:bg-blue-50 hover:font-medium hover:text-gray-700 hover:cursor-pointer"
                    key={item.ticketId}
                  >
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 overflow-hidden text-ellipsis">
                      {item.ticketId}
                    </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 overflow-hidden text-ellipsis">
                      {item.description}
                    </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                      {item.category_title}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                      <span className="p-2 bg-red-200  text-red-600 rounded-md flex w-[40%] justify-center">
                        {item.status === 1
                          ? "High"
                          : item.status === 2
                          ? "Mid"
                          : "Low"}
                      </span>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                      {item.assign_to}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                      {new Date(item.date_issued).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                      })}
                    </td>
                  </tr>
                ))}
              </Table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashBoard;
