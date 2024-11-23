"use client"
import FastAction from "@/components/FastAction";
import HomePage from "@/components/Home";
import Modal from "@/components/UI/Modal";
import { Icon } from "@iconify/react";
import { useState } from "react";
export default function Home() {
  const [openAction, setOpenAction] = useState<boolean>(false);
  return (
    <main className=''>
      <HomePage />
      <button onClick={() => setOpenAction(!openAction)} className='fixed right-2 md:right-6 bottom-12 md:bottom-4 cursor-pointer bg-primary hover:bg-primary/80 rounded-full flex justify-center items-center h-10 min-w-10 group'>
        <Icon
          icon='mdi:interaction-double-tap'
          fontSize={30}
          color='white'
          className='group-hover:rotate-45 transition-all group-hover:ml-2'
        />
        <p className='px-2 z-40 text-white group-hover:flex group-hover:w-[100px] w-0 hidden transition-all delay-1000'>
          Hızlı İşlem
        </p>
      </button>

      <Modal open={openAction} title="Hızlı İşlem" width={600} height={500} close={() => setOpenAction(!openAction)} >
        <FastAction />
      </Modal>

    </main>
  );
}
