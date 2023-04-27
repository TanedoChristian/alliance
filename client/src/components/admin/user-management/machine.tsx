import React from "react";
import axios from "axios";
import { assign, createMachine } from "xstate";
import Setup from "../../../Setup";

const UserManagementMachine = createMachine(
  {
    id: "usermanagement",
    initial: "idle",
    context: {
      users: [],
      headers: [
        "Employee ID",
        "Firstname",
        "Lastname",
        "Username",
        "Email",
        "Role",
        "Actions",
      ],
      user: {
        email: "",
        employeeId: "",
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        type: "",
      },
      id: "",
      updateUser: {},
    },
    states: {
      idle: {
        invoke: {
          src: "fetchUsers",
          onDone: {
            actions: "storeUsers",
            target: "waiting",
          },
        },
      },
      waiting: {
        on: {
          ON_CHANGE: {
            actions: assign({
              user: (context, event: any) => {
                return { ...context.user, ...event.data };
              },
            }),
          },
          ON_SUBMIT: {
            target: "submit",
          },
          ON_DELETE: {
            actions: assign({
              id: (context, event: any) => event.data,
            }),
            target: "delete",
          },
          ON_UPDATE: {
            target: "update",
          },
        },
      },

      update: {
        invoke: {
          src: "updateEmployee",
          onDone: {
            target: "idle",
          },
        },
      },
      delete: {
        invoke: {
          src: "deleteEmployee",
          onDone: {
            target: "idle",
          },
        },
      },
      submit: {
        invoke: {
          src: "addEmployee",
          onDone: {
            target: "idle",
          },
        },
      },
    },
  },
  {
    actions: {
      storeUsers: (context, event) => {
        assign((context.users = event.data.data));
        console.log(context.users);
      },
    },

    services: {
      updateEmployee: (context: any, event) => {
        return axios({
          method: "put",
          url:
            Setup.SERVER_URL() + "/employee/update/" + context.user.employeeId,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "multipart/form-data",
          },
          data: { ...context.user },
        }).then((data) => data);
      },

      deleteEmployee: (context) => {
        return axios({
          method: "delete",
          url: Setup.SERVER_URL() + "/employee/delete/" + context.id,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }).then((data) => data);
      },

      addEmployee: (context) => {
        return axios({
          method: "post",
          url: Setup.SERVER_URL() + "/employee/insert",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          data: { ...context.user, password: "default" },
        }).then((data) => data);
      },

      fetchUsers: () => {
        return axios({
          url: Setup.SERVER_URL() + "/employee/getall",
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }).then((data) => data);
      },
    },
  }
);

export default UserManagementMachine;
