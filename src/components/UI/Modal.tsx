"use client"
import React from "react";
import { Icon } from "@iconify/react";
type Props = {
  width?: number;
  height?: number;
  close?: () => void;
  open: boolean;
  children: React.ReactNode;
  title: string;
};

const Modal = ({
  width = 400,
  height = 500,
  close,
  open,
  children,
  title,
}: Props) => {
  const windowHeight = window.innerHeight

  return (
    <div
      className={`fixed top-0 left-0 z-50 w-screen h-screen bg-primary/10 justify-center items-center transition-all delay-500 ${open ? "flex" : "hidden"
        }`}
    >
      <div
        className='bg-slate-100 dark:bg-primary w-[600px] p-4 rounded-lg shadow shadow-primary/50 dark:shadow-slate-500/50 h-96 animate-fadeInUp flex flex-col'
        style={{ width, minHeight: windowHeight < 570 ? windowHeight - 20 : height, overflowY: windowHeight < 570 ? "auto" : "hidden" }}
      >
        <div className='w-full flex justify-between items-center'>
          <h3 className='text-lg font-semibold text-primary dark:text-slate-100'>{title}</h3>
          <button
            onClick={close}
            className='bg-primary/10 hover:bg-primary dark:hover:bg-slate-800 p-1 rounded-full group dark:bg-slate-100'
          >
            <Icon
              icon={"iconamoon:close-bold"}
              className='text-primary-slate-100 dark:text-primary group-hover:text-slate-100 dark:group-hover:text-slate-100'
            />
          </button>
        </div>
        <div className='mt-4 flex-1'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
