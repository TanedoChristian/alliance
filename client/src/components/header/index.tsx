import React from "react";
import Setup from "../../Setup";

const Header = (props: any) => {
  return (
    <div className="h-[8vh] w-full  flex  bg-gray-800 ">
      <div className=" flex w-full  h-full ">
        <div className="flex p-5 px-7 justify-between items-center w-full ">
          <img
            src="https://www.alliance.com.ph/images/asi-logo.svg"
            className="w-[10%] cursor-pointer"
            onClick={() => {
              window.location.href = "/dashboard";
            }}
          />
          <div className="flex gap-2 items-center">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                window.location.href = "/account/settings";
              }}
            >
              <h1 className="text-white font-bold poppins text-lg">
                {localStorage.getItem("username")}
              </h1>
              <img
                className="w-9 h-9 rounded-full "
                src={`${
                  localStorage.getItem("profile_img") == "null"
                    ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                    : `${Setup.SERVER_URL()}/image/${localStorage.getItem(
                        "profile_img"
                      )}`
                }`}
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </span>
            </div>

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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
