"use client";

import navigation from "@/navigation";
import { NavigationProps } from "@/types";
import Link from "next/link";
import { useState } from "react";
import LanguageSwitcher from "../UI/LanguageSwitcher";
import ThemeSwitcher from "../UI/ThemeSwitcher";
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
        } p-4 bg-slate-100 dark:bg-primary shadow-xl min-h-screen sidebar flex flex-col justify-between transition-all duration-500`}
    >
      <div className='flex flex-col'>
        <div className='flex items-center justify-center w-full mb-5'>
          <Link
            href={"/"}
            className='text-xl font-bold flex items-center flex-1 text-primary dark:text-slate-50'
          >
            I
            <span
              className={`${openSidebar
                  ? "block animate-logoAnimate underline text-primary/90 dark:text-slate-200 text-sm mr-1"
                  : "hidden w-0"
                } transition-all`}
            >
              NCOME{" "}
            </span>
            A
            <span
              className={`${openSidebar
                  ? "block animate-logoAnimate underline text-primary/90 dark:text-slate-200 text-sm"
                  : "hidden w-0"
                } transition-all`}
            >
              ND
            </span>
            <span
              className={`${openSidebar
                  ? "block animate-logoAnimate underline text-primary/90 dark:text-slate-200 text-sm ml-1"
                  : "hidden w-0"
                } transition-all`}
            >
              E
            </span>
            X
            <span
              className={`${openSidebar
                  ? "block animate-logoAnimate underline text-primary/90 dark:text-slate-200 text-sm"
                  : "hidden w-0"
                } transition-all`}
            >
              PENSE
            </span>
          </Link>
        </div>
        <div className='flex flex-col items-start justify-between h-full self-stretch'>
          {navigation.map((item: NavigationProps) => {
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
      <div className='flex flex-col justify-start items-start'>
        <ThemeSwitcher open={openSidebar} />
        <LanguageSwitcher open={openSidebar} />
      </div>
    </div>
  );
};

export default Sidebar;
