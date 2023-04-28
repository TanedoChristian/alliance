import React, { useEffect, useState } from "react";
import Setup from "../../Setup";
import axios from "axios";

const TicketStatus = (props: any) => {
  useEffect(() => {
    console.log(props.data);
  });

  return (
    <ul className="w-[50%] flex gap-3 justify-end ">
      <li className="p-2 py-3 flex items-center bg-gray-700 text-white rounded-lg text-xs gap-2">
        <i className="fa-regular fa-clock text-xs"></i>
        {props.data.pending} Pending Tickets
      </li>

      <li className="p-2 py-3 flex items-center bg-gray-700 text-white rounded-lg text-xs gap-2">
        <i className="fa-solid fa-rotate text-xs"></i>
        {props.data.onGoing} Ongoing Tickets
      </li>
      <li className="p-2 py-3 flex items-center bg-gray-700 text-white rounded-lg text-xs gap-2">
        <i className="fa-solid fa-circle-check text-xs"></i>
        {props.data.done} Resolved Tickets
      </li>
      <li className="p-2 py-3 flex items-center bg-red-500 text-white rounded-lg text-xs gap-2">
        <i className="fa-solid fa-circle-xmark text-xs"></i>
        {props.data.cancel} Cancelled Tickets
      </li>
    </ul>
  );
};

export default TicketStatus;
