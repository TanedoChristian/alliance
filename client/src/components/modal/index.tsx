import React, { useState } from "react";

const Modal = (props: any) => {
  const [isOpen, setOpenModal] = useState(props.isOpen);

  return (
    <div
      className="top-0 left-0 right-0 z-40 fixed backdrop-blur-[1px]  "
      style={{ display: !props.isOpen ? "none" : "block" }}
    >
      <div className="relative w-full h-screen  flex items-center justify-center z-50">
        <div
          className={`${props.height} ${props.width} border rounded-xl border-gray-300 bg-white shadow-xl w3-animate-top	flex`}
        >
          <div className="w-full h-full flex flex-col">
            <div className="w-full p-3 bg-gray-800 text-white font-medium text-2xl tracking-wide flex justify-between items-center">
              {props.title}
              <i
                className="fa-solid fa-square-xmark text-[2rem] cursor-pointer
                "
                onClick={props.handleClose}
              ></i>
            </div>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
