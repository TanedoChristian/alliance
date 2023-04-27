import Modal from "../../modal";
import SideNav from "../../sidenav";
import { useEffect, useState } from "react";
import Table from "../../table";
import Header from "../../header";
import axios from "axios";
import Setup from "../../../Setup";

const AdminPanel = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const [addData, setAddData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    username: "",
    password: "default",
    type: "admin",
  });

  const [admin, setAdmin] = useState([]);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios
      .get(`${Setup.SERVER_URL()}/employee/admin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then(({ data }) => {
        console.log(data.data);
        setAdmin(data.data);
      });
  }, [success]);

  const handleAddData = () => {
    axios({
      method: "post",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      url: `${Setup.SERVER_URL()}/employee/insert`,
      data: addData,
    }).then((data) => {
      console.log(data);
      setSuccess(!success);
      setShowAddModal(false);
    });
  };

  const [updateData, setUpdateData] = useState({
    employeeId: "",
    email: "",
    firstname: "",
    lastname: "",
    username: "",
  });

  const onChangeData = (e: any) => {
    const { name, value } = e.target;

    setUpdateData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleUpdateData = () => {
    console.log(updateData);
    axios({
      method: "put",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "multipart/form-data",
      },
      url: `${Setup.SERVER_URL()}/employee/update/${updateData.employeeId}`,
      data: updateData,
    }).then((data) => {
      console.log(data);
      setSuccess(!success);
      setShowUpdateModal(false);
    });
  };

  const handleDeleteData = (id: any) => {
    axios({
      method: "delete",
      url: Setup.SERVER_URL() + "/employee/delete/" + id,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }).then((data) => {
      setSuccess(!success);
      console.log(data);
    });
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
            >
              {admin.map((item: any) => (
                <tr
                  className="border border-gray-200 text-gray-600 hover:shadow-md hover:bg-blue-50 hover:font-medium hover:text-gray-700 hover:cursor-pointer"
                  key={item.employeeId}
                >
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left  ">
                    {item.employeeId}
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left  ">
                    {item.firstname}
                  </td>
                  <td className="border-t-0 px-6 align-middle  border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left  overflow-hidden text-ellipsis">
                    {item.lastname}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left  overflow-hidden text-ellipsis">
                    {item.username}
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-red-500 flex gap-2 ">
                    <button
                      onClick={() => {
                        console.log(item);
                        setUpdateData(item);
                        setShowUpdateModal(true);
                      }}
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button onClick={() => handleDeleteData(item.employeeId)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </Table>
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
        <div className="w-full bg-white flex flex-col p-10 justify-center">
          <form className="flex flex-col gap-3">
            <div className="flex gap-2 items-center justify-between">
              <label>First Name:</label>
              <input
                type="text"
                required
                placeholder="First Name"
                className="p-2 bg-gray-200 rounded-md"
                onChange={(e) => {
                  setAddData((prev) => {
                    return { ...prev, firstname: e.target.value };
                  });
                }}
              />
            </div>
            <div className="flex gap-2 items-center justify-between">
              <label>Last Name: </label>
              <input
                type="text"
                placeholder="Last Name"
                className="p-2 bg-gray-200 rounded-md"
                onChange={(e) => {
                  setAddData((prev) => {
                    return { ...prev, lastname: e.target.value };
                  });
                }}
              />
            </div>
            <div className="flex gap-2 items-center justify-between">
              <label>Email: </label>
              <input
                type="text"
                placeholder="Email"
                className="p-2 bg-gray-200 rounded-md"
                onChange={(e) => {
                  setAddData((prev) => {
                    return { ...prev, email: e.target.value };
                  });
                }}
              />
            </div>
            <div className="flex gap-2 items-center justify-between">
              <label>Username: </label>
              <input
                type="text"
                placeholder="Username"
                className="p-2 bg-gray-200 rounded-md"
                onChange={(e) => {
                  setAddData((prev) => {
                    return { ...prev, username: e.target.value };
                  });
                }}
              />
            </div>

            <button
              className="p-3 px-6 rounded-xl bg-red-500 text-white font-medium"
              onClick={handleAddData}
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
          </form>
        </div>
      </Modal>
      <Modal
        isOpen={showUpdateModal}
        title="Edit Admin Details"
        height={"h-[70%]"}
        width={"w-[50%]"}
        handleClose={handleCloseUpdateModal}
      >
        <div className="w-full bg-white flex p-10 justify-center">
          <div className="w-[55%] flex flex-col  gap-3 ">
            <div className="flex gap-2 items-center justify-between">
              <label>First Name:</label>
              <input
                type="text"
                placeholder="First Name"
                name="firstname"
                className="p-2 bg-gray-200 rounded-md"
                defaultValue={updateData.firstname}
                onChange={(e) => onChangeData(e)}
              />
            </div>
            <div className="flex gap-2 items-center justify-between">
              <label>Last Name: </label>
              <input
                type="text"
                placeholder="Last Name"
                name="lastname"
                className="p-2 bg-gray-200 rounded-md"
                defaultValue={updateData.lastname}
                onChange={(e) => onChangeData(e)}
              />
            </div>
            <div className="flex gap-2 items-center justify-between">
              <label>Email: </label>
              <input
                type="text"
                placeholder="Email"
                name="email"
                className="p-2 bg-gray-200 rounded-md"
                defaultValue={updateData.email}
                onChange={(e) => onChangeData(e)}
              />
            </div>
            <div className="flex gap-2 items-center justify-between">
              <label>Username: </label>
              <input
                type="text"
                placeholder="Username"
                name="username"
                className="p-2 bg-gray-200 rounded-md"
                defaultValue={updateData.username}
                onChange={(e) => onChangeData(e)}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-center">
          <button
            className="p-3 px-6 rounded-xl bg-red-500 text-white font-medium"
            onClick={handleUpdateData}
          >
            Update Admin
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
