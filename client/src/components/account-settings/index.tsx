import axios from "axios";
import React, { useState, useEffect } from "react";
import Setup from "../../Setup";
import Modal from "../modal";

const AccountSettings = () => {
  const [user, setUser]: any = useState({});
  const [isOpen, setModalOpen] = useState(false);
  const [isOpenUpdate, setModalUpdate] = useState(false);
  const [file, setFile]: any = useState([]);
  const [success, setSuccess]: any = useState();

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/spring-hibernate-jpa/employee/get/${localStorage.getItem(
          "employee_id"
        )}`
      )
      .then(({ data }) => {
        console.log(data);
        setUser(data.data);
      });
  }, [success]);

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setUser((prev: any) => {
      return { ...prev, [name]: value };
    });
  };

  const handleClose = () => {
    setModalOpen(false);
    setModalUpdate(false);
  };

  const handleUpdate = () => {
    axios({
      method: "PUT",
      url: `${Setup.SERVER_URL()}/employee/update/${localStorage.getItem(
        "employee_id"
      )}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "multipart/form-data",
      },
      data: {
        ...user,
        file: file,
      },
    }).then((data) => {
      console.log(data);
      setModalOpen(false);
      setSuccess(!success);
    });
  };

  const onChangeFile = (e: any) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="flex w-full h-screen flex-col overflow-hidden">
      <Modal
        isOpen={isOpenUpdate}
        handleClose={handleClose}
        title="Change Password"
        height="h-[50%]"
        width="w-[50%]"
      >
        <div className="w-full bg-white flex p-10 justify-center">
          <div className="flex flex-col  gap-5 ">
            <div className="flex flex-col gap-1  justify-between">
              <label className="font-bold text-slate-700">Old Password</label>
              <input
                type="text"
                placeholder="Old Password"
                className="p-2 bg-gray-100 rounded-md"
                name="username"
                onChange={onChange}
              />
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col gap-1  justify-between">
                <label className="font-bold text-slate-700">New Password</label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="p-2 bg-gray-100 rounded-md"
                  name="firstname"
                  onChange={onChange}
                />
              </div>
              <div className="flex flex-col gap-1  justify-between">
                <label className="font-bold text-slate-700">
                  Confirm Password
                </label>
                <input
                  type="text"
                  placeholder="Old Password"
                  className="p-2 bg-gray-100 rounded-md"
                  name="firstname"
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center">
          <button
            className="bg-red-600 text-white font-bold  rounded-md shadow-xl p-3 w-[40%] font-sans"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={isOpen}
        handleClose={handleClose}
        title="Edit Profile"
        height="h-[80%]"
        width="w-[70%]"
      >
        <div className="w-full flex h-screen  p-10 ">
          <div className="w-[40%] flex">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-lg text-blue-500">
                    {file.name ?? " SVG, PNG, JPG or GIF (MAX. 800x400px)"}
                  </p>
                </div>
                <input type="file" className="hidden" onChange={onChangeFile} />
              </label>
            </div>
          </div>
          <div className="w-[50%] flex  flex-col">
            <div className="w-full bg-white flex p-10 justify-center">
              <div className="flex flex-col  gap-5 ">
                <div className="flex flex-col gap-1  justify-between">
                  <label className="font-bold text-slate-700">First Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="p-2 bg-gray-100 rounded-md"
                    defaultValue={user.firstname}
                    name="firstname"
                    onChange={onChange}
                  />
                </div>

                <div className="flex flex-col gap-1  justify-between">
                  <label className="font-bold text-slate-700">Last Name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="p-2 bg-gray-100 rounded-md"
                    defaultValue={user.lastname}
                    name="lastname"
                    onChange={onChange}
                  />
                </div>

                <div className="flex flex-col gap-1  justify-between">
                  <label className="font-bold text-slate-700">Email</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="p-2 bg-gray-100 rounded-md"
                    defaultValue={user.email}
                    name="email"
                    onChange={onChange}
                  />
                </div>

                <div className="flex flex-col gap-1  justify-between">
                  <label className="font-bold text-slate-700">Username</label>
                  <input
                    type="text"
                    placeholder="Username"
                    className="p-2 bg-gray-100 rounded-md"
                    defaultValue={user.username}
                    name="username"
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center">
              <button
                className="bg-red-600 text-white font-bold  rounded-md shadow-xl p-3 w-[40%] font-sans"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <div className="h-[8vh] w-full  flex bg-gray-800 ">
        <div className=" flex w-full  h-full ">
          <div className="flex p-5 px-7 justify-between items-center w-full ">
            <img
              src="https://www.alliance.com.ph/images/asi-logo.svg"
              className="w-[10%]"
            />
            <div className="flex gap-2">
              <img
                className="w-9 h-9 rounded-full "
                src="https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=600"
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </span>
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-between h-screen ">
        <div className="w-[15%]  h-screen flex ">
          <div className="flex flex-col top-0 left-0  bg-[#f6f8fc]  h-screen  w-full">
            <ul className="flex flex-col py-20 space-y-1 justify-between  p-4 h-[90vh]">
              <div className="flex flex-col gap-5">
                <li className="w-[100%]">
                  <p className="text-lg font-bold poppins tracking-wide">
                    Account Role
                  </p>
                  <p className="text-green-500 camelcase">{user.type}</p>
                </li>

                <li className="w-[100%]">
                  <p className="text-lg font-bold poppins tracking-wide">
                    Account Status
                  </p>
                  <p className="text-green-500">Active</p>
                </li>
              </div>
            </ul>
          </div>
        </div>

        <div className="flex  items-center w-full   py-5  flex-col h-screen bg-gray-50   rounded-t-xl shadow-xl">
          <div className="w-[95%] flex flex-col  gap-3 h-[90%] rounded-xl bg-white shadow-xl border border-gray-200 ">
            <h1 className="text-3xl font-medium text-slate-800 p-10 poppins">
              Account Details
            </h1>

            <div className="flex w-full  h-screen">
              <div className="w-[40%] flex  items-center flex-col">
                <div className="w-[50%] h-[50%]">
                  <img
                    src={
                      user.img == null
                        ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                        : `${Setup.SERVER_URL()}/image/${user.img}`
                    }
                    className="flex rounded-full object-cover w-full h-full"
                  />
                </div>
                <button
                  className="bg-slate-700 text-white px-5 py-1 mt-5 rounded-md font-bold shadow-xl outline-black flex gap-2 items-center"
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  <h1> Edit Profile </h1>
                  <i className="fa-solid fa-pencil"></i>
                </button>
              </div>
              <div className="w-[50%] flex  flex-col">
                <div className="w-full bg-white flex p-10 justify-center">
                  <div className="flex flex-col  gap-5 ">
                    <div className="flex flex-col gap-1  justify-between">
                      <label className="font-bold text-slate-700">Name</label>
                      <input
                        type="text"
                        placeholder="First Name"
                        className="p-2 bg-gray-100 rounded-md"
                        defaultValue={user.firstname}
                        disabled
                      />
                    </div>

                    <div className="flex flex-col gap-1  justify-between">
                      <label className="font-bold text-slate-700">Email</label>
                      <input
                        type="text"
                        placeholder="First Name"
                        className="p-2 bg-gray-100 rounded-md"
                        defaultValue={user.email}
                        disabled
                      />
                    </div>

                    <div className="flex flex-col gap-1  justify-between">
                      <label className="font-bold text-slate-700">
                        Username
                      </label>
                      <input
                        type="text"
                        placeholder="First Name"
                        className="p-2 bg-gray-100 rounded-md"
                        defaultValue={user.username}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="flex w-full justify-center">
                  <button
                    className="bg-red-600 text-white font-bold  rounded-md shadow-xl p-3 w-[40%] font-sans"
                    onClick={() => {
                      setModalUpdate(true);
                    }}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;