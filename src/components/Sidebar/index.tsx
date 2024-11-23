"use client";

import navigation from "@/navigation";
import { NavigationProps } from "@/types";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import useTheme from "../hooks/useTheme";
import LanguageSwitcher from "../UI/LanguageSwitcher";
import ThemeSwitcher from "../UI/ThemeSwitcher";
import VerticalMenuItems from "./VerticalMenu/VerticalMenuItems";
import Logo from "./Logo";
const Sidebar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { theme, lang } = useTheme();
  const router = useRouter()
  const params = useParams()
  const path = usePathname()

  const goSettings = () => {
    const segments = path.split("/").filter(Boolean)[0];
    const newPath = `/${segments}/settings`;
    router.push(newPath);
  };

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
          <Logo openSidebar={openSidebar} />
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

        <button
          onClick={goSettings}
          className={`flex items-center justify-start w-full p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors duration-200`}
          aria-label="Settings Button"
        >
          <Icon
            icon={"mdi:settings-outline"}
            className={`w-5 h-5 ${theme === "light" ? "text-primary" : "text-slate-100"}`}
          />
          {openSidebar && (
            <span className="ml-2 text-primary dark:text-white">
              {lang === "tr" ? "Ayarlar" : "Settings"}
            </span>
          )}
        </button>

      </div>
    </div>
  );
};

export default Sidebar;
