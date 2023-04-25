import Modal from "../../modal";
import SideNav from "../../sidenav";
import { useState } from "react";
import Table from "../../table";
import Header from "../../header";

const AdminPanel = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <Header />
      <div className="flex justify-between">
        <SideNav admin={true} />
        <div className="flex  items-center w-full   py-5  flex-col h-screen bg-gray-50   rounded-t-xl shadow-xl">
          <div className="w-[95%] flex flex-col  gap-3     h-[90%] rounded-xl bg-white shadow-xl border border-gray-200 ">
            <div className="w-full flex justify-between px-10 items-center p-2">
              <h1 className="font-bold text-xl">Admins</h1>
              <button
                onClick={() => setShowAddModal(true)}
                className="p-2.5 text-white bg-red-500 rounded-xl shadow-md text-sm"
              >
                Add Admin
              </button>
            </div>
            <Table
              headers={[
                "Admin ID",
                "First name",
                "Last name",
                "Username",
                "Actions",
              ]}
            ></Table>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showAddModal}
        title="Add New Admin"
        height={"h-[70%]"}
        width={"w-[50%]"}
        handleClose={handleCloseAddModal}
      >
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
          <button className="p-3 px-6 rounded-xl bg-red-500 text-white font-medium">
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
  );
};

export default AdminPanel;
