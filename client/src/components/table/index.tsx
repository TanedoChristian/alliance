import React from "react";

const Table = (props: any) => {
  return (
    <table className="items-center  w-full border-collapse table-fixed ">
      <thead
        className="sticky top-0  text-black font-medium shadow-sm w-full tracking-wide "
        
      >
        <tr>
          {props.headers.map((item: any) => (
            <th className="px-6 tracking-wide border border-solid  py-3 text-xs  border-l-0 border-r-0 font-semibold text-left">
              {item}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="h-full">{props.children}</tbody>
    </table>
  );
};

export default Table;
