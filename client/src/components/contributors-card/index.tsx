import React from "react";

const ContributorsCard = (props: any) => {
  return (
    <a
      href="#"
      className=" overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 lg:w-[45%] w-full shadow-md mt-7"
    >
      <div className="sm:flex sm:justify-between sm:gap-3 flex justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
            {props.name}
          </h3>

          <p className="mt-1 text-xs font-medium text-gray-600">
            {props.title}
          </p>
        </div>

        <div className=" sm:block sm:shrink-0">
          <img
            alt="Contributors Card"
            src={props.img}
            className="h-16 w-16 rounded-full object-cover shadow-sm"
          />
        </div>
      </div>

      <div className="mt-4">
        <p className="max-w-[40ch] text-sm text-gray-500 italic">
          "{props.description}"
        </p>
      </div>
    </a>
  );
};

export default ContributorsCard;
