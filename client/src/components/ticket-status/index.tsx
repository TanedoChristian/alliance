import React from "react";

const TicketStatus = () => {
  return (
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
        <i className="fa-solid fa-circle-check text-xs"></i>6 Resolved Tickets
      </li>
      <li className="p-2 py-3 flex items-center bg-red-500 text-white rounded-lg text-xs gap-2">
        <i className="fa-solid fa-circle-xmark text-xs"></i>8 Cancelled Tickets
      </li>
    </ul>
  );
};

export default TicketStatus;
