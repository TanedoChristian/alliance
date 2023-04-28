import React, { useEffect, useState } from "react";
import SideNav from "../../sidenav";
import Modal from "../../modal";
import Table from "../../table";
import axios from "axios";
import Setup from "../../../Setup";
import Header from "../../header";

const CategoryManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const [addData, setAddData] = useState({
    categoryTitle: "",
    firstname: "",
    lastname: "",
  });

  const [updateData, setUpdateData] = useState({
    categoryId: "",
    categoryTitle: "",
    firstname: "",
    lastname: "",
  });

  const [employee, setEmployee] = useState([]);
  const [employeeDataDropDown, setEmployeeData] = useState([]);

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  useEffect(() => {
    axios
      .get(`${Setup.SERVER_URL()}/category/getall`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then(({ data }) => {
        setEmployee(data);
      });

    axios
      .get(`${Setup.SERVER_URL()}/employee/getall`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then(({ data }) => {
        setEmployeeData(data);
      });
  }, [success]);

  const handleAddData = () => {
    axios({
      method: "post",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      url: `${Setup.SERVER_URL()}/category/insert`,
      data: addData,
    }).then((data) => {
      console.log(data);
      setSuccess(!success);
      setShowAddModal(false);
    });
  };

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
      },
      url: `http://localhost:8080/spring-hibernate-jpa/category/update/${updateData.categoryId}`,
      data: updateData,
    }).then((data) => {
      console.log(data);
      setSuccess(!success);
      setShowUpdateModal(false);
    });
  };

  const deleteTicket = (id: any) => {
    console.log(id);
    axios({
      method: "delete",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      url: `http://localhost:8080/spring-hibernate-jpa/category/delete/${id}`,
    }).then((data) => {
      setSuccess(!success);
    });
  };

  const handleChangeEmployee = (e: any) => {
    console.log(e.target.value);

    employeeDataDropDown.map((item: any) => {
      if (item.employeeId == e.target.value) {
        setAddData((prev: any) => {
          return {
            ...prev,
            firstname: item.firstname,
            lastname: item.lastname,
            employeeId: item.employeeId,
          };
        });
      }
    });
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <Header />
      <div className="flex justify-between">
        <SideNav category={true} />

        <div className="flex  items-center w-full   py-5  flex-col h-screen bg-gray-50   rounded-t-xl shadow-xl">
          <div className="w-[95%] flex flex-col  gap-3     h-[90%] rounded-xl bg-white shadow-xl border border-gray-200 ">
            <div className="w-full flex justify-between px-10 items-center p-2">
              <h1 className="font-bold text-xl">Category Assignments</h1>
              <button
                className="p-2.5 text-white bg-red-500 rounded-xl shadow-md text-sm"
                onClick={() => setShowAddModal(true)}
              >
                Add Category
              </button>
            </div>

            <Table
              headers={[
                "Category ID",
                "Category ",
                "First Name",
                "Last Name",
                "Actions",
              ]}
            >
              {employee.map((item: any) => (
                <tr
                  className="border border-gray-200 text-gray-600 hover:shadow-md hover:bg-blue-50 hover:font-medium hover:text-gray-700 hover:cursor-pointer"
                  key={item.categoryId}
                >
                  <td className="border-t-0 px-6 align-middle  border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left  overflow-hidden text-ellipsis">
                    {item.categoryId}
                  </td>
                  <td className="border-t-0 px-6 align-middle  border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left  overflow-hidden text-ellipsis">
                    {item.categoryTitle}
                  </td>
                  <td className="border-t-0 px-6 align-middle  border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left  overflow-hidden text-ellipsis">
                    {item.firstname}
                  </td>
                  <td className="border-t-0 px-6 align-middle  border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left  overflow-hidden text-ellipsis">
                    {item.lastname}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-red-500 flex gap-2 ">
                    <button
                      onClick={() => {
                        setShowUpdateModal(true);
                        setUpdateData(item);
                      }}
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button
                      onClick={() => {
                        deleteTicket(item.categoryId);
                      }}
                    >
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
        height={"h-[70%]"}
        width={"w-[50%]"}
        title="Add Category"
        handleClose={handleCloseAddModal}
      >
        <div className="w-full bg-white flex p-10 justify-center">
          <div className="w-[55%] flex flex-col  gap-3 ">
            <div className="flex gap-2 items-center justify-between">
              <label>Category: </label>
              <input
                type="text"
                placeholder="Category"
                className="p-2 bg-gray-200 rounded-md"
                onChange={(e) => {
                  setAddData((prev) => {
                    return { ...prev, categoryTitle: e.target.value };
                  });
                }}
              />
            </div>
            <div className="flex gap-2 items-center justify-between">
              <label>Assignee: </label>
              <select
                className="bg-gray-100 outline-none text-gray-900 text-sm rounded-lg block py-2.5 w-[60%] "
                onChange={handleChangeEmployee}
                name="status"
              >
                {employeeDataDropDown.map((item: any) => (
                  <option value={item.employeeId}>
                    {item.firstname} {item.lastname}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-center">
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
        </div>
      </Modal>

      <Modal
        isOpen={showUpdateModal}
        height={"h-[70%]"}
        width={"w-[50%]"}
        title="Update Category"
        handleClose={handleCloseUpdateModal}
      >
        <div className="w-full bg-white flex p-10 justify-center">
          <div className="w-[55%] flex flex-col  gap-3 ">
            <div className="flex gap-2 items-center justify-between">
              <label>Category: </label>
              <input
                type="text"
                placeholder="Category"
                name="categoryTitle"
                className="p-2 bg-gray-200 rounded-md"
                defaultValue={updateData.categoryTitle}
                onChange={(e) => onChangeData(e)}
              />
            </div>
            <div className="flex gap-2 items-center justify-between">
              <label>First Name: </label>
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
          </div>
        </div>

        <div className="flex gap-2 justify-center">
          <button
            className="p-3 px-6 rounded-xl bg-red-500 text-white font-medium"
            onClick={handleUpdateData}
          >
            Update
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

export default CategoryManagement;
