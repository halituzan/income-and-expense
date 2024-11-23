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
  height = 400,
  close,
  open,
  children,
  title,
}: Props) => {
  return (
    <div
      className={`fixed top-0 left-0 z-50 w-screen h-screen bg-primary/10 justify-center items-center transition-all delay-500 ${
        open ? "flex" : "hidden"
      }`}
    >
      <div
        className='bg-white w-[600px] p-4 rounded-lg shadow-lg h-96 animate-fadeInUp flex flex-col'
        style={{ width, minHeight: height, height: "auto" }}
      >
        <div className='w-full flex justify-between items-center'>
          <h3 className='text-lg font-semibold'>{title}</h3>
          <button
            onClick={close}
            className='bg-primary/10 group hover:bg-primary p-1 rounded-full'
          >
            <Icon
              icon={"iconamoon:close-bold"}
              className='text-primary group-hover:text-white'
            />
          </button>
        </div>
        <div className='mt-4 flex-1'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;