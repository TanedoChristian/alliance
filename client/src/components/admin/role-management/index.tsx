import { useState } from "react";
import Modal from "../../modal";
import SideNav from "../../sidenav";
import Table from "../../table";
import Header from "../../header";

const RoleManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [updateData, setUpdateData] = useState({
    roleId: "",
    roleTitle: "",
    description: "",
  });

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };
  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const onChangeData = (e: any) => {
    const [name, value] = e.target;

    setUpdateData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <Header />

      <div className="flex justify-between">
        <SideNav roles={true} />

        <div className="flex  items-center w-full   py-5  flex-col h-screen bg-gray-50   rounded-t-xl shadow-xl">
          <div className="w-[95%] flex flex-col  gap-3     h-[90%] rounded-xl bg-white shadow-xl border border-gray-200 ">
            <div className="w-full flex justify-between px-10 items-center p-2">
              <h1 className="font-bold text-xl">Roles</h1>
              <button
                className="p-2.5 text-white bg-red-500 rounded-xl shadow-md text-sm"
                onClick={() => setShowAddModal(true)}
              >
                Add Role
              </button>
            </div>
            <Table headers={["Role ID", "Role", "Description", "Action"]}>
              <tr className="border border-gray-200 text-gray-600 hover:shadow-md hover:bg-blue-50 hover:font-medium hover:text-gray-700 hover:cursor-pointer">
                <td className="border-t-0 px-6 align-middle  border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left  overflow-hidden text-ellipsis">
                  Sample
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left  overflow-hidden text-ellipsis">
                  Sample
                </td>

                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left  ">
                  Sample
                </td>

                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-red-500 flex gap-2 ">
                  <button
                    onClick={() => {
                      setShowUpdateModal(true);
                    }}
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>
                  <button>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            </Table>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showAddModal}
        height={"h-[70%]"}
        width={"w-[50%]"}
        title="Add Role"
        handleClose={handleCloseAddModal}
      >
        <div className="w-full bg-white flex p-10 justify-center">
          <div className="w-[55%] flex flex-col  gap-3 ">
            <div className="flex gap-2 items-center justify-between">
              <label>Role: </label>
              <input
                type="text"
                placeholder="Role"
                name="roleTitle"
                className="p-2 bg-gray-200 rounded-md"
              />
            </div>
            <div className="flex gap-2 items-center justify-between">
              <label>Description: </label>
              <input
                type="text"
                placeholder="Description"
                name="description"
                className="p-2 bg-gray-200 rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-center">
          <button className="p-3 px-6 rounded-xl bg-red-500 text-white font-medium">
            Add Role
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

      <Modal
        isOpen={showUpdateModal}
        height={"h-[70%]"}
        width={"w-[50%]"}
        title="Update Role"
        handleClose={handleCloseUpdateModal}
      >
        <div className="w-full bg-white flex p-10 justify-center">
          <div className="w-[55%] flex flex-col  gap-3 ">
            <div className="flex gap-2 items-center justify-between">
              <label>Role: </label>
              <input
                type="text"
                placeholder="Role"
                name="roleTitle"
                className="p-2 bg-gray-200 rounded-md"
                defaultValue={updateData.roleTitle}
                onChange={(e) => onChangeData(e)}
              />
            </div>
            <div className="flex gap-2 items-center justify-between">
              <label>Description: </label>
              <input
                type="text"
                placeholder="Description"
                name="description"
                className="p-2 bg-gray-200 rounded-md"
                defaultValue={updateData.description}
                onChange={(e) => onChangeData(e)}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-center">
          <button className="p-3 px-6 rounded-xl bg-red-500 text-white font-medium">
            Update Role
          </button>
          <button
            className="p-3 px-6 rounded-xl bg-gray-400 text-white font-medium"
            onClick={() => {
              setShowUpdateModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default RoleManagement;
