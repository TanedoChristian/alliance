import { assign, createMachine } from "xstate";
import Ticket from "./interface";
import axios from "axios";

interface Context {
  ticket: Ticket[];
  updateTicket: any;
  description: string;
  category: string;
  file: File[]
  tableHeaders: any[];
}

const DashboardMachine = createMachine<Context>(
  {
    id: "dashboard",
    initial: "idle",
    context: {
      file: [],
      tableHeaders: [
        "",
        "Description",
        "Category",
        "Status",
        "Assignee",
        "Date Issued",
      ],

      ticket: [],
      updateTicket: {
        ticketId: 0,
        employee_id: 0,
        assignee_id: 0,
        status: "",
        category: "",
        date_issued: "",
        attachment: [],
      },
      description: "",
      category: "",
    },
    states: {
      idle: {
        invoke: {
          src: "fetchTicket",
          onDone: {
            actions: "storeData",
            target: "waiting",
          },
        },
      },
      waiting: {
        on: {
          ON_CHANGE_TICKET: {
            actions: assign({
              updateTicket: (context, event) => {
                return { ...context.updateTicket, ...event.data };
              },
            }),
            target: "idle",
          },

          ON_CHANGE_FILE: {
            actions: assign({
              file: (context,event) => event.data
            })
          },


          ON_UPDATE_TICKETS: {
            target: "updateTicket",
          },

          ON_DELETE: {
            actions: ["deleteTickets", "deleteTicketsToApi"],
            target: "waiting",
          },

          ON_CHANGE_DESCRIPTION: {
            actions: "handleChangeDescription",
            target: "waiting",
          },

          ON_UPDATE_CATEGORY: {
            actions: "handleChangeCategory",
            target: "waiting",
          },
          ON_SUBMIT: {
            actions: "createTicket",
            target: "idle",
          },
        },
      },
      updateTicket: {
        invoke: {
          src: "updateTicket",
          onDone: {
            target: "idle",
          },
        },
      },
    },
  },

  {
    actions: {
      handleChangeDescription: assign({
        description: (context, event) => event.data,
      }),

      createTicket: (context,event) => {
        axios({
          method: "post",
          url: "http://localhost:8080/spring-hibernate-jpa/ticket/create",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "multipart/form-data"
          },
          data: {
            assignee_id: 1,
            file: context.file,
            category: context.category,
            date_issued: "2023-03-05",
            description: context.description,
            employee_id: localStorage.getItem("employee_id"),
            status: 2,
          },
        }).then((data) => data);
      }, 

      handleChangeCategory: assign({
        category: (context, event) => event.data,
      }),

      storeData: (context, event) => {
        context.ticket = event.data;
        console.log(event.data);
      },

      deleteTickets: assign({
        ticket: (context, event) =>
          context.ticket.filter(
            (item: any) => !event.data.includes(item.ticketId)
          ),
      }),

      deleteTicketsToApi: (context, event) => {
        axios({
          method: "delete",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          url: "http://localhost:8080/spring-hibernate-jpa/ticket/delete",
          data: {
            ticketId: event.data,
          },
        }).then((data) => console.log(data));
      },
    },

    services: {
      updateTicket: (context, event) => {
        return axios({
          method: "put",
          url: `http://localhost:8080/spring-hibernate-jpa/ticket/update/${context.updateTicket.ticketId}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          data: {
            ...context.updateTicket,
            assignee_id: 2,
            employee_id: 3,
          },
        }).then((data) => data);
      },

      fetchTicket: () => {
        return axios
          .get("http://localhost:8080/spring-hibernate-jpa/ticket/gettable", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
          .then(({ data }) => data.data);
      },
    },
  }
);

export default DashboardMachine;
