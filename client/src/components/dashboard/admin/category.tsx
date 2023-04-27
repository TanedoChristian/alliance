import axios from "axios";
import React, { useEffect, useState } from "react";

const Category = (props: any) => {
  const handleDelete = () => {
    const filteredData = props.send({ type: "ON_DELETE", data: props.data });
  };

  return (
    <div className="flex justify-end px-5  items-center w-full  gap-3 h-[7vh]  z-10  ">
      {/* <span
        className="flex  items-center gap-3  shadow-md px-5 py-2.5 rounded-md  cursor-pointer bg-red-500"
        onClick={() => {
          props.setModalOpen(true);
        }}
      >
        <p className="text-xs flex items-center gap-3  text-white">
          <span className="material-symbols-outlined text-[20px]"></span>
        </p>
      </span> */}
      <div className="flex w-[80%] justify-end gap-2">
        <span
          className="flex items-center bg-white shadow-md px-5 py-2  rounded-md border border-gray-200 font-bold text-gray-700 cursor-pointer"
          onClick={handleDelete}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />{" "}
            <path
              fill-rule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default Category;
