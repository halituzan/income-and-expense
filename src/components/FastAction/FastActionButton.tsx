"use client"
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Modal from "../UI/Modal";
import FastAction from "./FastAction";
import { useTranslations } from "next-intl";
type Props = {};

const FastActionButton = (props: Props) => {
    const t = useTranslations("Home");
    const [openAction, setOpenAction] = useState<boolean>(false);
    return <div>
        <button onClick={() => setOpenAction(!openAction)} className='fixed right-2 md:right-6 bottom-[100px] md:bottom-4 cursor-pointer bg-primary hover:bg-primary/80 rounded-full flex justify-center items-center h-10 min-w-10 group dark:bg-slate-100 dark:hover:bg-slate-200 z-50'>
            <Icon
                icon='mdi:interaction-double-tap'
                fontSize={30}
                className='group-hover:rotate-45 transition-all group-hover:ml-2 text-slate-100 dark:text-primary'
            />
            <p className='px-2 z-40 text-white dark:text-primary group-hover:flex group-hover:w-[150px] w-0 hidden transition-all delay-1000'>
                {t("speedAction")}
            </p>
        </button>

        <Modal open={openAction} title={t("speedAction")} width={600} height={600} close={() => setOpenAction(!openAction)} >
            <FastAction />
        </Modal>
    </div>;
};

export default FastActionButton;
