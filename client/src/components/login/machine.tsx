import React, { useEffect } from "react";
import { assign, createMachine } from "xstate";
import axios from "axios";
import { Context } from "./interface";
import Setup from "../../Setup";
import { error } from "console";
const testMachine = createMachine(
  {
    id: "test",
    initial: "idle",
    context: {
      loginUser: {
        email: "",
        password: "",
      },
      error: false,
    },
    states: {
      idle: {
        on: {
          HANDLE_PASSWORD: {
            actions: (context, event) => {
              context.loginUser = {
                ...context.loginUser,
                password: event.data,
              };
            },
          },

          HANDLE_EMAIL: {
            actions: (context, event) => {
              context.loginUser = { ...context.loginUser, email: event.data };
            },
          },

          HANDLE_SUBMIT: {
            target: "submit",
          },
        },
      },
      submit: {
        invoke: {
          src: "submitData",
          onDone: {
            actions: "validateLogin",
          },
          onError: {
            actions: assign({
              error: (context, event) => true,
            }),
            target: "idle",
          },
        },
      },
    },
  },
  {
    services: {
      submitData: (context: any, event: any) => {
        const formData = new FormData();
        formData.append("username", context.loginUser.email);
        formData.append("password", context.loginUser.password);
        formData.append("grant_type", "password");
        return axios({
          method: "POST",
          url: "http://localhost:8080/spring-hibernate-jpa/oauth/token",
          headers: {
            Authorization: "Basic Y2xpZW50OnNlY3JldA==",
            "Content-Type": "multipart/form-data",
          },
          data: {
            username: context.loginUser.email,
            password: context.loginUser.password,
            grant_type: "password",
          },
        }).then(({ data }) => data);
      },
    },

    actions: {
      validateLogin: (context, event) => {
        localStorage.setItem("access_token", event.data.access_token);
        localStorage.setItem("employee_id", event.data.employee_id);
        localStorage.setItem("profile_img", event.data.profile_img);
        localStorage.setItem("username", event.data.username);
        localStorage.setItem("type", event.data.type);
        window.location.href = "/dashboard";
      },
    },
  }
);

export default testMachine;
