import React, { useEffect, useState } from "react";

import axios from "axios";
import Setup from "../../Setup";
import Modal from "../modal";

const ForgotPassword = () => {
  const [error, setError] = useState(false);

  const [employeeData, setEmployeeData]: any = useState({});
  const [isOpen, setOpenModal] = useState(false);

  const handleSubmit = () => {
    axios({
      method: "POST",
      url: `${Setup.SERVER_URL()}/employee/sendotp`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "multipart/form-data",
      },

      data: {
        email: employeeData.email,
      },
    }).then((data) => {
      setOpenModal(true);
    });
  };

  const onChange = () => {};

  return (
    <div className="flex h-screen w-full">
      <Modal
        isOpen={isOpen}
        handleClose={() => {
          setOpenModal(false);
        }}
        height="h-[40%]"
        width="w-[40%]"
      >
        <div className="w-[100%] flex  flex-col">
          <div className="w-full bg-white flex p-10 justify-center">
            <div className="flex flex-col  gap-5 ">
              <div className="flex flex-col gap-1  justify-between">
                <label className="font-bold text-slate-700">Verify OTP</label>
                <input
                  type="text"
                  placeholder="Otp"
                  className="p-2 bg-gray-100 rounded-md"
                  name="firstname"
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center">
            <button className="bg-red-600 text-white font-bold  rounded-md shadow-xl p-3 w-[40%] font-sans">
              Verify
            </button>
          </div>
        </div>
      </Modal>

      <div className="h-full w-full lg:w-[30%]  flex flex-col justify-center ">
        <div className="flex justify-center mt-10 ">
          <img src="https://www.alliance.com.ph/images/asi-logo-invert.svg" />
        </div>

        <form
          className="mt-20 p-10  flex flex-col gap-10 "
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="flex flex-col">
            <p className="text-sm text-red-500 mb-3">
              {error ? "Account not found" : ""}
            </p>
            <label className="font-medium text-slate-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your email"
              onChange={(e) => {
                setEmployeeData((prev: any) => {
                  return { ...prev, email: e.target.value };
                });
              }}
              className="h-[2.5rem] border-b-2 border-gray-100 mt-1 outline-none  px-4 w-[90%] focus:border-red-500"
            />

            <input
              type="submit"
              value="Send Otp"
              className="h-[2.5rem] bg-red-500 text-white mt-2  shadow-xl border-b-2 border-gray-100 mt-1 outline-none  px-4 w-[90%] focus:border-red-500"
            />
          </div>
        </form>
      </div>
      <div className="h-screen w-[70%]  hidden lg:flex">
        <img
          src="https://www.alliance.com.ph/images/timekeeping-bg-low-res.jpg"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
