import React from "react";
import SideNav from "../../sidenav";
import Table from "../../table";
import { useMachine } from "@xstate/react";
import EmployeeDashboardMachine from "./machine";

const EmployeeDashBoard = () => {
  const [current, send] = useMachine(EmployeeDashboardMachine);
  return (
    <div>
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
                className="rounded-lg bg-red-600 text-white px-5 py-1.5 text-sm font-bold antialiased shadow-md outline outline-white"
                onClick={() => {}}
              >
                Add Ticket
              </button>
            </div>

            <div className="bg-white rounded-xl w-full h-[100%] flex flex-col gap-5">
              <Table headers={current.context.tableHeaders}>
                {current.context.ticket.map((item: any) => (
                  <tr
                    className="border border-gray-200  text-gray-600 hover:shadow-md hover:bg-blue-50 hover:font-medium hover:text-gray-700 hover:cursor-pointer"
                    key={item.ticketId}
                  >
                    <td
                      className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 overflow-hidden text-ellipsis"
                      onClick={() => {
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
