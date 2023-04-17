import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../header";
import { useMachine } from "@xstate/react";
import DashboardMachine from "./machine";
import Category from "./category";

import Modal from "../../modal";
import Table from "../../table";
import SideNav from "../../sidenav";

const Dashboard = () => {
  const [ticket, setTicket] = useState([]);

  const [onDone, setDone] = useState(false);

  const [tickets, setTickets]: any = useState([]);
  const [showOptions, setShowOptions] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [{ context, value }, send] = useMachine(DashboardMachine);

  const [file, setFile]: any = useState();
  const [showFile, setShowFile] = useState(false);

  const handleChange = (id: any) => {
    setTickets([...tickets, id]);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
  };

  return (
    // <div className="flex flex-col w-full h-screen">
    //   <div className=" w-full   h-screen  ">
    //     <div className="h-[8vh] w-full  flex relative bg-gray-800 ">
    //       <div className="absolute flex w-full  h-full ">
    //         <div className="flex p-5 px-7 justify-between items-center w-full ">
    //           <img
    //             src="https://www.alliance.com.ph/images/asi-logo.svg"
    //             className="w-[10%]"
    //           />
    //           <div className="flex gap-2">
    //             <img
    //               className="w-9 h-9 rounded-full "
    //               src="https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=600"
    //             />
    //             <span className="inline-flex justify-center items-center ml-4">
    //               <svg
    //                 className="w-6 h-6 text-white"
    //                 fill="none"
    //                 stroke="currentColor"
    //                 viewBox="0 0 24 24"
    //                 xmlns="http://www.w3.org/2000/svg"
    //               >
    //                 <path
    //                   stroke-linecap="round"
    //                   stroke-linejoin="round"
    //                   stroke-width="2"
    //                   d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    //                 ></path>
    //                 <path
    //                   stroke-linecap="round"
    //                   stroke-linejoin="round"
    //                   stroke-width="2"
    //                   d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    //                 ></path>
    //               </svg>
    //             </span>
    //             <div
    //               className="inline-flex justify-center items-center ml-4 cursor-pointer"
    //               onClick={() => {
    //                 window.location.href = "/";
    //               }}
    //             >
    //               <svg
    //                 className="w-6 h-6 text-white"
    //                 fill="none"
    //                 stroke="currentColor"
    //                 viewBox="0 0 24 24"
    //                 xmlns="http://www.w3.org/2000/svg"
    //               >
    //                 <path
    //                   stroke-linecap="round"
    //                   stroke-linejoin="round"
    //                   stroke-width="2"
    //                   d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    //                 ></path>
    //               </svg>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className=" w-full  h-[92vh] flex">
    //       <div className="w-[20%]  flex justify-center">
    //         <ul className="w-[90%] flex flex-col gap-20 text-2xl font-bold text-gray-700 items-center p-10">
    //           <li>
    //             <a>Dashboard</a>
    //           </li>
    //           <li>
    //             <a>Dashboard</a>
    //           </li>
    //           <li>
    //             <a>Dashboard</a>
    //           </li>
    //         </ul>
    //       </div>
    //       <div className="w-[80%] ">
    //         <div className=" flex flex-col  bg-white w-full  rounded h-screen   overflow-y-auto ">
    //           <TicketTable
    //             ticket={context.ticket}
    //             handleChange={handleChange}
    //             openModal={setUpdateModalOpen}
    //             send={send}
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="flex  h-screen w-full overflow-hidden ">
      <Modal
        handleClose={handleClose}
        isOpen={modalOpen}
        height="w-[80%]"
        title="Create Tickets"
      >
        <form className="p-5 flex flex-col gap-10 h-full ">
          <div className="flex gap-3 items-center ">
            <label>Category: </label>
            <div className="relative ">
              <div className="h-10  flex border border-gray-100 rounded-md items-center">
                <select className="bg-gray-100 outline-none text-gray-900 text-sm rounded-lg block w-full p-3 ">
                  <option selected>
                    <i className="fa-solid fa-ellipsis-vertical fa-rotate-90 px-2"></i>
                  </option>
                  <option value="1">Benefits</option>
                  <option value="2">Payroll</option>
                  <option value="3">MEMO</option>
                  <option value="4">Request</option>
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
                  onChange={(e) =>
                    send({
                      type: "ON_UPDATE_CATEGORY",
                      data: e.target.value,
                    })
                  }
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
                          onChange={(e: any) => {
                            setShowFile(true);
                            send({
                              type: "ON_CHANGE_TICKET",
                              data: {
                                ...context.updateTicket,
                                attachment: e.target.files[0].name,
                              },
                            });
                          }}
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
                  onChange={(e) =>
                    send({
                      type: "ON_CHANGE_DESCRIPTION",
                      data: e.target.value,
                    })
                  }
                  required
                ></textarea>
              </div>
            </div>
            <div className="w-full flex justify-between px-3">
              <div
                className="p-2 rounded-xl bg-red-100 text-red-500  relative"
                style={{ display: showFile ? "block" : "none" }}
              >
                <p className="text-ellipsis">
                  {context.updateTicket.attachment}
                </p>
                <button
                  className="absolute top-[-5px] right-0  rounded-full "
                  onClick={() => {
                    send({
                      type: "ON_CHANGE_TICKET",
                      data: {
                        ...context.updateTicket,
                        attachment: "",
                      },
                    });
                    setShowFile(false);
                  }}
                >
                  <i className="fa-regular fa-circle-xmark "></i>
                </button>
              </div>
              <button
                type="submit"
                onClick={() => {
                  send({ type: "ON_SUBMIT" });
                  setModalOpen(false);
                }}
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={updateModalOpen}
        handleClose={handleCloseUpdateModal}
        title="Update Tickets"
        width="w-[80%]"
      >
        <form
          className="mt-5 p-5 flex  gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="w-[30%] flex flex-col gap-3 ">
            <div className="flex items-center gap-3 justify-between">
              <label>Category: </label>

              <select
                className="bg-gray-100 outline-none text-gray-900 text-sm rounded-lg block w-full p-3 "
                onChange={(e) => {
                  send({
                    type: "ON_CHANGE_TICKET",
                    data: {
                      ...context.updateTicket,
                      category: e.target.value,
                    },
                  });
                }}
              >
                <option selected value="1">
                  {context.updateTicket.category}
                </option>
                <option value="1">Benefits</option>
                <option value="2">Payroll</option>
                <option value="3">MEMO</option>
                <option value="4">Request</option>
              </select>
            </div>

            <div className="flex items-center gap-3  justify-between">
              <label className="font-bold tracking-wide">Assingee:</label>
              <input
                type="text"
                className="p-3 bg-gray-100 rounded-xl placeholder-gray-600"
                defaultValue={context.updateTicket.assignee}
                onChange={(e) => {
                  send({
                    type: "ON_CHANGE_TICKET",
                    data: {
                      ...context.updateTicket,
                      assignee_id: e.target.value,
                    },
                  });
                }}
              />
            </div>

            <div className="flex items-center gap-3  justify-between">
              <label className="font-bold tracking-wide">Status: </label>
              <input
                type="text"
                defaultValue={context.updateTicket.status}
                onChange={(e) => {
                  send({
                    type: "ON_CHANGE_TICKET",
                    data: {
                      ...context.updateTicket,
                      status: e.target.value,
                    },
                  });
                }}
                className="p-3 bg-gray-100 rounded-xl placeholder-gray-600"
              />
            </div>
          </div>

          <div className="w-[70%]  h-full">
            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
              <div className="flex items-center justify-between px-3 py-2 border-b ">
                <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x ">
                  <div className="flex items-center space-x-1 sm:pr-4">
                    <button
                      type="button"
                      className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
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
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span className="sr-only">Upload image</span>
                    </button>
                    <button
                      type="button"
                      className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
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
                          d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span className="sr-only">Format code</span>
                    </button>
                    <button
                      type="button"
                      className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
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
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span className="sr-only">Add emoji</span>
                    </button>
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
                  defaultValue={context.updateTicket.description}
                  onChange={(e) => {
                    send({
                      type: "ON_CHANGE_TICKET",
                      data: {
                        ...context.updateTicket,
                        description: e.target.value,
                      },
                    });
                  }}
                  required
                ></textarea>
              </div>
            </div>
            <div className="w-full flex justify-end">
              <button
                type="submit"
                onClick={() => {
                  setUpdateModalOpen(false);
                  send({ type: "ON_UPDATE_TICKETS" });
                }}
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </Modal>

      <div className=" w-full">
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

        <div className="flex w-full justify-between h-screen">
          <SideNav>
            <ul className="flex flex-col py-4 space-y-1 justify-around h-screen p-4">
              <div className="flex flex-col gap-5">
                <li>
                  <a
                    href="#"
                    className="relative flex flex-row items-center text-sm focus:outline-none text-red-500  p-4 rounded-xl font-medium"
                  >
                    <span className="material-symbols-outlined">
                      confirmation_number
                    </span>
                    <span className="inline-flex justify-center items-center ml-2">
                      Dashboard
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="/admin/usermanagement"
                    className="relative flex flex-row items-center text-sm focus:outline-none text-gray-800   rounded-xl"
                  >
                    <span className="material-symbols-outlined">apps</span>
                    <span className="inline-flex justify-center items-center ml-2">
                      User Management
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="relative flex flex-row items-center text-sm focus:outline-none text-gray-800 p-4 rounded-xl"
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

          <div className="flex  items-center w-full   py-5  flex-col h-screen bg-gray-50   rounded-t-xl shadow-xl    ">
            <div className="w-[95%] flex flex-col  gap-3     h-[90%] rounded-xl bg-white shadow-xl border border-gray-200 ">
              <div className="flex  w-full p-3 justify-between px-5 items-center ">
                <h1 className="text-3xl font-bold">Tickets </h1>
                <ul className="w-[50%] flex gap-3 justify-end ">
                  <li className="p-2 py-3 flex items-center bg-gray-700 text-white rounded-lg text-xs gap-2">
                    <i className="fa-regular fa-clock text-xs"></i>
                    12 Pending Tickets
                  </li>

                  <li className="p-2 py-3 flex items-center bg-gray-700 text-white rounded-lg text-xs gap-2">
                    <i className="fa-solid fa-rotate text-xs"></i>
                    98 Ongoing Tickets
                  </li>
                  <li className="p-2 py-3 flex items-center bg-gray-700 text-white rounded-lg text-xs gap-2">
                    <i className="fa-solid fa-circle-check text-xs"></i>6
                    Resolved Tickets
                  </li>
                  <li className="p-2 py-3 flex items-center bg-red-500 text-white rounded-lg text-xs gap-2">
                    <i className="fa-solid fa-circle-xmark text-xs"></i>8
                    Cancelled Tickets
                  </li>
                </ul>
              </div>
              <Category
                showOptions={false}
                setShowOptions={false}
                data={tickets}
                ticket={context.ticket}
                send={send}
                setModalOpen={setModalOpen}
              />

              <Table headers={context.tableHeaders}>
                {context.ticket.map((item: any) => (
                  <tr
                    className="border border-gray-200  text-gray-600 hover:shadow-md hover:bg-blue-50 hover:font-medium hover:text-gray-700 hover:cursor-pointer"
                    key={item.ticketId}
                  >
                    <td className="p-3 flex justify-center">
                      <input
                        className=""
                        type="checkbox"
                        name=""
                        id=""
                        onClick={() => {
                          handleChange(item.ticketId);
                        }}
                      />
                    </td>

                    <td
                      className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 overflow-hidden text-ellipsis"
                      onClick={() => {
                        setUpdateModalOpen(true);
                        send({
                          type: "ON_CHANGE_TICKET",
                          data: {
                            ...item,
                            category: item.category_title,
                            assignee: item.assign_to,
                          },
                        });
                      }}
                    >
                      {item.description}
                    </td>

                    <td
                      className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 "
                      onClick={() => {
                        setUpdateModalOpen(true);

                        send({
                          type: "ON_CHANGE_TICKET",
                          data: {
                            ...item,
                            category: item.category_title,
                            assignee: item.assign_to,
                          },
                        });
                      }}
                    >
                      {item.category_title}
                    </td>
                    <td
                      className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 "
                      onClick={() => {
                        setUpdateModalOpen(true);
                        send({
                          type: "ON_CHANGE_TICKET",
                          data: {
                            ...item,
                            category: item.category_title,
                            assignee: item.assign_to,
                          },
                        });
                      }}
                    >
                      {item.status === 1
                        ? "High"
                        : item.status === 2
                        ? "Mid"
                        : "Low"}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;