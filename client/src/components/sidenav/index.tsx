import React from "react";

const SideNav = (props: any) => {
  return (
    <div className="w-[15%]  h-screen flex ">
      <div className="flex flex-col top-0 left-0  bg-[#f6f8fc]  h-screen  w-full">
        {props.children}
      </div>
    </div>
  );
};

export default SideNav;
