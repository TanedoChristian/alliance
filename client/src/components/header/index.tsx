import React from "react";

const Header = (props: any) => {
  return (
    <header
      className={`flex -ml-2  h-[8vh] overflow-hidden top-0 w-full   justify-around fixed bg-gray-700 `}
      style={{ transition: "background-color 0.5s ease" }}
      id="nav"
    >
      <div className="w-[40%] flex items-center">
        <img
          src="https://www.alliance.com.ph/images/asi-logo.svg"
          className="h-15"
        />
      </div>

      <ul className="flex gap-[4rem] items-center w-[20%] text-md font-medium invisible lg:visible text-gray-50">
        {props.children}
      </ul>
    </header>
  );
};

export default Header;
