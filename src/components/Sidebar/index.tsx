"use client"

import React, { useState } from "react";
import navigation from "@/navigation";
import VerticalMenuItems from "./VerticalMenu/VerticalMenuItems";
import ThemeSwitcher from "../UI/ThemeSwitcher";
import LanguageSwitcher from "../UI/LanguageSwitcher";

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
        } p-4 bg-slate-100 dark:bg-primary shadow-xl min-h-screen sidebar flex flex-col justify-between transition-all duration-500`}
    >
      <div className="flex flex-col">
        <div className='flex items-center justify-center w-full mb-5'>
          <h2 className='text-xl font-bold flex-1'>Logo</h2>
        </div>
        <div className='flex flex-col items-start justify-between h-full self-stretch'>
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
      <div className="flex flex-col justify-start items-start">
        <ThemeSwitcher open={openSidebar} />
        <LanguageSwitcher open={openSidebar} />
      </div>

    </div>
  );
};

export default Sidebar;
