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
import Modal from "../UI/Modal";
import FastAction from "../FastAction";
import { useTranslations } from "next-intl";
const Sidebar = () => {
  const t = useTranslations("Home");
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openAction, setOpenAction] = useState<boolean>(false);
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
    <>

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

      <button onClick={() => setOpenAction(!openAction)} className='fixed right-2 md:right-6 bottom-[70px] md:bottom-4 cursor-pointer bg-primary hover:bg-primary/80 rounded-full flex justify-center items-center h-10 min-w-10 group dark:bg-slate-100 dark:hover:bg-slate-200'>
        <Icon
          icon='mdi:interaction-double-tap'
          fontSize={30}
          className='group-hover:rotate-45 transition-all group-hover:ml-2 text-slate-100 dark:text-primary'
        />
        <p className='px-2 z-40 text-white dark:text-primary group-hover:flex group-hover:w-[150px] w-0 hidden transition-all delay-1000'>
          {t("speedAction")}
        </p>
      </button>

      <Modal open={openAction} title={t("speedAction")} width={600} height={500} close={() => setOpenAction(!openAction)} >
        <FastAction />
      </Modal>

    </>

  );
};

export default Sidebar;
