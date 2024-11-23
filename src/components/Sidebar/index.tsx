"use client"

import React, { useState } from "react";
import navigation from "@/navigation";
import VerticalMenuItems from "./VerticalMenu/VerticalMenuItems";

const Sidebar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setOpenSidebar(true);
      }}
      onMouseLeave={() => {
        setOpenSidebar(false);
      }}
      className={`${openSidebar ? "w-[300px]" : "w-[75px]"
        } p-4 bg-white shadow-xl min-h-screen sidebar flex flex-col transition-all duration-500`}
    >
      <div className='flex items-center justify-center w-full mb-5'>
        <h2 className='text-xl font-bold flex-1'>Logo</h2>
      </div>
      <div className='flex flex-col items-start '>
        {navigation.map((item) => {
          return (
            <VerticalMenuItems
              key={item.path}
              item={item}
              open={openSidebar}
            />
          );
        })}
      </div>

    </div>
  );
};

export default Sidebar;
