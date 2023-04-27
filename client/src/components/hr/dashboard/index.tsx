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
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCloseGenerateModal = () => {
    setShowGenerateModal(false);
  };

  useEffect(() => {
    axios
      .get(
        `${Setup.SERVER_URL()}/ticket/assignee/${localStorage.getItem(
          "employee_id"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then(({ data }) => {
        console.log(data.data);
        setTickets(data.data);
      });
  }, [success]);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setTicket((prev: any) => {
      return { ...prev, [name]: value };
    });
  };

  const handleUpdate = (ticket: any) => {
    axios({
      method: "PUT",
      url: `http://localhost:8080/spring-hibernate-jpa/ticket/update-status/${ticket.ticketId}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      data: { ...ticket },
    }).then((data) => {
      setOpenModal(false);
      setSuccess(!success);
    });
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
                defaultValue={ticket.date_issued}
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
              <select
                className="bg-gray-100 outline-none text-gray-900 text-sm rounded-lg block py-2.5 w-[60%] "
                onChange={handleChange}
                name="status"
              >
                <option selected>
                  {ticket.status == 1
                    ? "Pending"
                    : ticket.status == 2
                    ? "Ongoing"
                    : ticket.status == 3
                    ? "Done"
                    : "Cancel"}
                </option>
                <option value={1}>Pending</option>
                <option value={2}>On Going</option>
                <option value={3}>Done</option>
                <option value={4}>Cancel</option>
              </select>
            </div>

            <div className="flex gap-5 items-center mt-10">
              <label>Requested By: </label>
              <h1>{ticket.requested_by}</h1>
            </div>

            <div className="flex gap-2 items-center mt-10">
              <label>
                <i className="fa-solid text-xl fa-paperclip"></i>
              </label>

              <a
                href={`${Setup.SERVER_URL()}/file/${ticket.attachment}`}
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
              <button
                className="bg-red-500 text-white p-3 rounded-md"
                onClick={() => {
                  handleUpdate(ticket);
                }}
              >
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
                  href="/hr/usermanagement"
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
              <button
                className="p-3 bg-red-600 text-white rounded-md shadow-md"
                onClick={() => setShowGenerateModal(true)}
              >
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
                    {item.requested_by}
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

      <Modal
        isOpen={showGenerateModal}
        height={"h-[80%]"}
        width={"w-[40%]"}
        title="Generate Reports"
        handleClose={handleCloseGenerateModal}
      >
        <div className="flex flex-col h-full py-8 px-10">
          <div className="flex flex-col gap-4 mx-auto">
            <div className="flex items-center gap-5">
              <input type="checkbox" />
              <label htmlFor="">Aging Tickets</label>

              <select className="ml-auto border border-gray-600 rounded-md py-1 px-2 text-sm">
                <option value="">Sample</option>
              </select>
            </div>
            <div className="flex items-center gap-5">
              <input type="checkbox" />
              <label htmlFor="">Ticket Count Per Category</label>
            </div>
            <div className="flex items-center gap-5">
              <input type="checkbox" />
              <label htmlFor="">Ticket Count Per HR Personnel</label>
            </div>
            <div className="flex items-center gap-5">
              <input type="checkbox" />
              <label htmlFor="">Generate All Tickets</label>
            </div>
          </div>

          <hr className="my-5 border-t border-gray-400" />

          <p className="font-semibold">Date Range</p>

          <div className="flex mt-4 justify-around text-sm">
            <div className="flex gap-1 flex-col">
              <label className="font-bold">From</label>
              <input
                type="date"
                className="border border-gray-600 py-1 px-2 rounded-md"
              />
            </div>

            <div className="flex gap-1 flex-col">
              <label className="font-bold">To</label>
              <input
                type="date"
                className="border border-gray-600 py-1 px-2 rounded-md"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-center mt-auto">
            <button className="p-3 px-6 rounded-xl bg-red-500 text-white font-medium">
              Generate
            </button>
            <button
              className="p-3 px-6 rounded-xl bg-gray-400 text-white font-medium"
              onClick={() => {
                setShowGenerateModal(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DashBoardHr;
