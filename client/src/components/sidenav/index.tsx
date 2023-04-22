import React from "react";

const SideNav = (props: any) => {
  return (
    <div className="w-[15%]  h-screen flex ">
      <div className="flex flex-col top-0 left-0  bg-[#f6f8fc]  h-screen  w-full">
      <ul className="flex flex-col py-20 space-y-1 justify-between  p-4 h-[90vh]">
              <div className="flex flex-col gap-5">
                <li className="w-[100%]">
                  <a
                    href="/dashboard"
                    className={`relative flex flex-row items-center ${props.dashboard ? "text-red-500" : ""}  text-sm focus:outline-none text-gray-700  gap-2 rounded-xl font-medium`}
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
                    className={`relative flex flex-row items-center ${props.user ? "text-red-500" : ""}  text-sm focus:outline-none text-gray-700  gap-2 rounded-xl font-medium`}
                  >
                    <i className="fa-solid fa-user text-lg"></i>
                  
                    <span className="inline-flex justify-center items-center ml-2">
                      Users Management
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`relative flex flex-row items-center ${props.roles ? "text-red-500" : ""}  text-sm focus:outline-none text-gray-700  gap-2 rounded-xl font-medium`}
                  >
                      <span className="material-symbols-outlined">apps</span>
                    <span className="inline-flex justify-center items-center ml-2">
                      Roles Management
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
      </div>
    </div>
  );
};

export default SideNav;
