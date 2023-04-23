import Modal from "../../modal";
import SideNav from "../../sidenav";
import { useState } from "react";
import Table from "../../table";

const AdminPanel = () => {
    const [showAddModal, setShowAddModal] = useState(false)
    const handleCloseAddModal = () => {setShowAddModal(false)}


    return (
        <div className = "w-full h-screen overflow-hidden">
            <div className="h-[8vh] w-full  flex relative bg-gray-800 ">
                <div className="absolute flex w-full  h-full ">
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
            <div className="flex justify-between">
            
                <SideNav admin={true}/ >
                <div className="flex  items-center w-full   py-5  flex-col h-screen bg-gray-50   rounded-t-xl shadow-xl">
                    <div className="w-[95%] flex flex-col  gap-3     h-[90%] rounded-xl bg-white shadow-xl border border-gray-200 ">
                        <div className="w-full flex justify-between px-10 items-center p-2">
                            <h1 className="font-bold text-xl">Admins</h1>
                            <button onClick={() => setShowAddModal(true)}
                                className="p-2.5 text-white bg-red-500 rounded-xl shadow-md text-sm"
                            >
                            Add Admin
                            </button>
                        </div>
                    <Table headers={["Admin ID", "First name", "Last name", "Username", "Actions"]}></Table> 
                       
                    </div>
                </div>
            </div>

            <Modal isOpen={showAddModal} title="Add New Admin" height={'h-[70%]'} width={'w-[50%]'} handleClose={handleCloseAddModal}>
            <div className="w-full bg-white flex p-10 justify-center">
                    <div className="w-[55%] flex flex-col  gap-3 ">
                        <div className="flex gap-2 items-center justify-between">
                            <label>First Name:</label>
                            <input
                                type="text"
                                placeholder="First Name"
                                className="p-2 bg-gray-200 rounded-md"
                            />
                        </div>
                        <div className="flex gap-2 items-center justify-between">
                            <label>Last Name: </label>
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="p-2 bg-gray-200 rounded-md"
                            />
                        </div>
                        <div className="flex gap-2 items-center justify-between">
                            <label>Username: </label>
                            <input
                                type="text"
                                placeholder="Username"
                                className="p-2 bg-gray-200 rounded-md"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 justify-center">
                    <button
                        className="p-3 px-6 rounded-xl bg-red-500 text-white font-medium"
                    >
                        Add
                    </button>
                    <button
                        className="p-3 px-6 rounded-xl bg-gray-400 text-white font-medium"
                        onClick={() => {
                        setShowAddModal(false);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </div>
    )
}

export default AdminPanel;