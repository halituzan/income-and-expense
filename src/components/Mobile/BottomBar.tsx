"use client";
import navigation from "@/navigation";
import { NavigationProps } from "@/types";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import FastActionButton from "../FastAction/FastActionButton";

type Props = {};

const BottomBar = (props: Props) => {
  const pathname = usePathname();
  const params = useParams();
  const { locale } = params;

  return (
    <div className='flex items-center w-full flex-1'>
      <FastActionButton />
      <div className='flex justify-evenly flex-1 w-full'>
        {navigation.map((item: NavigationProps) => {
          const isCurrentPath = `/${locale}${item.path}`;
          return (
            <Link
              key={item.id}
              href={isCurrentPath}
              className={`bg-slate-100 dark:bg-slate-800 min-w-[60px] min-h-[60px] flex justify-center items-center rounded-full ${pathname === isCurrentPath ? "animate-menuFadeUp -translate-y-8 border-4 border-white dark:border-primary" : ""}`}
            >
              <Icon
                icon={item.icon}
                fontSize={32}
                className='text-primary dark:text-slate-100'
              />
            </Link>
          );
        })}
        <Link
          href={`/${locale}/settings`}
          className={`bg-slate-100 dark:bg-slate-800 min-w-[60px] min-h-[60px] flex justify-center items-center rounded-full ${pathname === `/${locale}/settings` ? "animate-menuFadeUp -translate-y-8 border-4 border-white dark:border-primary" : ""}`}
        >
          <Icon
            icon={"mdi:settings-outline"}
            fontSize={32}
            className='text-primary dark:text-slate-100'
          />
        </Link>

      </div>
    </div>
  );
};

export default BottomBar;
