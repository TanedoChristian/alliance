import React, { useState, useEffect } from "react";
import Header from "../../header";
import Table from "../../table";
import Setup from "../../../Setup";
import axios from "axios";
import Modal from "../../modal";

const DashBoardHr = (props: any) => {
  const [tickets, setTickets]: any = useState([]);
  const [ticket, setTicket]: any = useState({});
  const [isOpenModal, setOpenModal] = useState(false);

  useEffect(() => {
    axios
      .get(`${Setup.SERVER_URL()}/ticket/gettable`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then(({ data }) => {
        setTickets(data.data);
      });
  }, []);

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div className="w-full h-screen h-screen overflow-hidden">
      <Modal
        title="Edit Ticket"
        isOpen={isOpenModal}
        handleClose={handleClose}
        width="w-[50%]"
        height="h-[90%]"
      >
        <div className="w-full bg-white flex p-10 justify-center">
          <div className="w-[80%] flex flex-col  gap-3 px-10">
            <div className="flex  items-center justify-between">
              <label>Ticket ID: </label>
              <input
                type="text"
                placeholder="Category"
                className="p-2 bg-gray-200 rounded-md"
                defaultValue={ticket.ticketId}
              />
            </div>
            <div className="flex gap-2 items-center justify-between">
              <label>Category: </label>
              <input
                type="text"
                placeholder="First Name"
                defaultValue={ticket.category_title}
                className="p-2 bg-gray-200 rounded-md"
              />
            </div>
            <div className="flex gap-2 items-center justify-between">
              <label>Date Issued: </label>
              <input
                type="text"
                placeholder="Last Name"
                className="p-2 bg-gray-200 rounded-md"
                defaultValue={new Date(ticket.date_issued).toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                  }
                )}
              />
            </div>

            <div className="flex flex-col gap-2  justify-between">
              <label>Description: </label>
              <textarea
                rows={5}
                className="bg-gray-200 rounded-xl w-full px-0 text-sm text-gray-800 border-0  focus:ring-0 outline-none px-5 py-5"
                defaultValue={ticket.description}
              />
            </div>

            <div className="flex gap-2 items-center justify-between">
              <label>Status: </label>
              <select className="bg-gray-100 outline-none text-gray-900 text-sm rounded-lg block py-2.5 w-[60%] ">
                <option selected value="1">
                  {ticket.status}
                </option>
                <option value="1">Benefits</option>
                <option value="2">Payroll</option>
                <option value="3">MEMO</option>
                <option value="4">Request</option>
              </select>
            </div>

            <div className="flex gap-5 items-center mt-10">
              <label>Requested By: </label>
              <h1>{ticket.employee_id}</h1>
            </div>

            <div className="flex gap-2 items-center mt-10">
              <label>
                <i className="fa-solid text-xl fa-paperclip"></i>
              </label>

              <a
                href={`${Setup.SERVER_URL()}/image/${ticket.attachment}`}
                target="_blank"
                className="text-blue-500 lowercase"
              >
                {ticket.attachment}
              </a>
            </div>
            <div className="flex justify-end gap-3 w-full ">
              <button
                onClick={handleClose}
                className="bg-gray-200 text-slate-800 p-3 rounded-md"
              >
                Cancel
              </button>
              <button className="bg-red-500 text-white p-3 rounded-md">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Header />
      <div className="flex justify-between h-[92vh]">
        <div className="flex w-[15%] bg-[#f6f8fc] h-full">
          <ul className="flex flex-col py-20 space-y-1 justify-between  p-4 h-[90vh]">
            <div className="flex flex-col gap-5">
              <li className="w-[100%]">
                <a
                  href="/dashboard"
                  className={` flex  items-center text-red-500 text-sm focus:outline-none text-gray-700 text-[0.8rem] gap-3 rounded-xl font-medium`}
                >
                  <span className="material-symbols-outlined w-[2rem]">
                    confirmation_number
                  </span>
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/admin/usermanagement"
                  className={` flex flex-row items-center ${
                    props.user ? "text-red-500" : ""
                  }  text-sm focus:outline-none text-gray-700 text-[0.8rem]  gap-3 rounded-xl font-medium`}
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
                {" "}
                Tickets
              </h1>
              <button className="p-3 bg-red-600 text-white rounded-md shadow-md">
                {" "}
                Generate Reports
              </button>
            </div>

            <Table
              headers={[
                "Ticket ID",
                "Description",
                "Category",
                "Date Issued",
                "Status",
                "Requested By",
                "Action",
              ]}
            >
              {tickets.map((item: any) => (
                <tr
                  className="border border-gray-200 text-gray-600 hover:shadow-md hover:bg-blue-50 hover:font-medium hover:text-gray-700 hover:cursor-pointer"
                  key={item.ticketId}
                >
                  <td className="border-t-0 px-6 align-middle  border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left  overflow-hidden text-ellipsis">
                    {item.description}
                  </td>
                  <td className="border-t-0 px-6 align-middle  border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left  overflow-hidden text-ellipsis">
                    {item.description}
                  </td>
                  <td className="border-t-0 px-6 align-middle  border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left  overflow-hidden text-ellipsis">
                    {item.category_title}
                  </td>
                  <td className="border-t-0 px-6 align-middle  border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left  overflow-hidden text-ellipsis">
                    {item.date_issued}
                  </td>
                  <td className="border-t-0 px-6 align-middle  border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left  overflow-hidden text-ellipsis">
                    {item.status}
                  </td>
                  <td className="border-t-0 px-6 align-middle  border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left  overflow-hidden text-ellipsis">
                    {item.assign_to}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-red-500 flex gap-2 ">
                    <button
                      onClick={() => {
                        setOpenModal(true);

                        setTicket(item);
                      }}
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button>
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

export default DashBoardHr;
