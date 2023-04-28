import { useMachine } from "@xstate/react";
import React, { useEffect, useState } from "react";
import testMachine from "./machine";
import axios from "axios";
import Setup from "../../Setup";

const Login = () => {
  const [current, send] = useMachine(testMachine);

  const [error, setError] = useState(false);

  return (
    <div className="flex h-screen w-full">
      <div className="h-full w-full lg:w-[30%]  flex flex-col justify-center ">
        <div className="flex justify-center mt-10 ">
          <img src="https://www.alliance.com.ph/images/asi-logo-invert.svg" />
        </div>

        <form
          className="mt-20 p-10  flex flex-col gap-10 "
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col">
            <p className="text-sm text-red-500 mb-3">
              {current.context.error ? "Account not found" : ""}
            </p>
            <label className="font-medium text-slate-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your email"
              className="h-[2.5rem] border-b-2 border-gray-100 mt-1 outline-none  px-4 w-[90%] focus:border-red-500"
              onChange={(e) =>
                send({ type: "HANDLE_EMAIL", data: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-md text-slate-800">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="h-[2.5rem] border-b-2 border-gray-100 mt-1 outline-none  px-4 w-[90%] focus:border-red-500 "
              onChange={(e) =>
                send({ type: "HANDLE_PASSWORD", data: e.target.value })
              }
            />
          </div>

          <a href="/forgotpassword">
            <p className="text-sm text-blue-600">Forgot Password?</p>
          </a>

          <button
            className="p-2 test text-lg text-white bg-red-500 shadow-xl rounded"
            onClick={() => send("HANDLE_SUBMIT")}
          >
            Login
          </button>
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

export default Login;
