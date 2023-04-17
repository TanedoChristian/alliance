/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import Header from "../header";
// import { useMachine } from "@xstate/react";
// import DashboardMachine from "./machine";
// import Category from "./category";
// import TicketTable from "./table";

// const Dashboard = () => {
//   const [ticket, setTicket] = useState([]);
//   const [onDone, setDone] = useState(false);

//   const [tickets, setTickets]: any = useState([]);
//   const [showOptions, setShowOptions] = useState(true);

//   const [{ context, value }, send] = useMachine(DashboardMachine);

//   const handleChange = (id: any) => {
//     setTickets([...tickets, id]);
//   };

//   return (
//     <div className="flex  h-screen w-full overflow-hidden ">
//       <div className=" w-full   h-screen  bg-[#f6f8fc]  ">
//         <div className="h-[8vh] w-full  flex relative border-b">
//           <div className="absolute flex w-full  h-full ">
//             <div className="flex p-5 justify-between items-center w-full ">
//               <img
//                 src="https://www.alliance.com.ph/images/asi-logo-invert.svg"
//                 className=""
//               />
//               <div className="flex gap-2">
//                 <img
//                   className="w-9 h-9 rounded-full "
//                   src="https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=600"
//                 />
//                 <span className="inline-flex justify-center items-center ml-4">
//                   <svg
//                     className="w-6 h-6 text-gray-600"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                       stroke-width="2"
//                       d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
//                     ></path>
//                     <path
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                       stroke-width="2"
//                       d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                     ></path>
//                   </svg>
//                 </span>
//                 <span className="inline-flex justify-center items-center ml-4">
//                   <svg
//                     className="w-6 h-6 text-gray-600"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                       stroke-width="2"
//                       d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                     ></path>
//                   </svg>
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex w-full justify-between ">
//           <div className="w-[15%]  h-screen flex z-50 relative ">
//             <div className="absolute flex flex-col top-0 left-0  bg-[#f6f8fc] h-full border-r w-full">
//               <div className="overflow-y-auto overflow-x-hidden flex-grow">
//                 <ul className="flex flex-col py-4 space-y-1">
//                   <li className="px-5">
//                     <div className="flex flex-row items-center h-8">
//                       <div className="text-sm font-light tracking-wide text-gray-500">
//                         Menu
//                       </div>
//                     </div>
//                   </li>
//                   <li>
//                     <a
//                       href="#"
//                       className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
//                     >
//                       <span className="inline-flex justify-center items-center ml-4">
//                         <svg
//                           className="w-5 h-5"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                             stroke-width="2"
//                             d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
//                           ></path>
//                         </svg>
//                       </span>
//                       <span className="ml-2 text-sm tracking-wide truncate">
//                         Dashboard
//                       </span>
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="#"
//                       className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
//                     >
//                       <span className="inline-flex justify-center items-center ml-4">
//                         <svg
//                           className="w-5 h-5"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                             stroke-width="2"
//                             d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
//                           ></path>
//                         </svg>
//                       </span>
//                       <span className="ml-2 text-sm tracking-wide truncate">
//                         Inbox
//                       </span>
//                       <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">
//                         New
//                       </span>
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="#"
//                       className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
//                     >
//                       <span className="inline-flex justify-center items-center ml-4">
//                         <svg
//                           className="w-5 h-5"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                             stroke-width="2"
//                             d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
//                           ></path>
//                         </svg>
//                       </span>
//                       <span className="ml-2 text-sm tracking-wide truncate">
//                         Messages
//                       </span>
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="#"
//                       className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
//                     >
//                       <span className="inline-flex justify-center items-center ml-4">
//                         <svg
//                           className="w-5 h-5"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                             stroke-width="2"
//                             d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
//                           ></path>
//                         </svg>
//                       </span>
//                       <span className="ml-2 text-sm tracking-wide truncate">
//                         Notifications
//                       </span>
//                       <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">
//                         1.2k
//                       </span>
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           <div className="flex  items-center w-full  flex-col h-screen  border border-gray-100 rounded-t-xl shadow-xl   ">
//             <Category
//               showOptions={showOptions}
//               setShowOptions={setShowOptions}
//               data={tickets}
//               ticket={context.ticket}
//               send={send}
//             />

//             <div className=" flex flex-col  bg-white w-full  rounded h-screen   overflow-y-auto ">
//               <TicketTable
//                 ticket={context.ticket}
//                 handleChange={handleChange}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
