import Link from "next/link";
import React from "react";

type Props = { openSidebar: boolean };

const Logo = ({ openSidebar }: Props) => {
    return <Link
        href={"/"}
        className='text-xl font-bold flex items-center flex-1 text-primary dark:text-slate-50'
    >
        I
        <span
            className={`${openSidebar
                ? "block underline text-primary/90 dark:text-slate-200 text-sm mr-1"
                : "hidden w-0"
                } transition-all`}
        >
            NCOME{" "}
        </span>
        A
        <span
            className={`${openSidebar
                ? "block underline text-primary/90 dark:text-slate-200 text-sm"
                : "hidden w-0"
                } transition-all`}
        >
            ND
        </span>
        <span
            className={`${openSidebar
                ? "block underline text-primary/90 dark:text-slate-200 text-sm ml-1"
                : "hidden w-0"
                } transition-all`}
        >
            E
        </span>
        X
        <span
            className={`${openSidebar
                ? "block underline text-primary/90 dark:text-slate-200 text-sm"
                : "hidden w-0"
                } transition-all`}
        >
            PENSE
        </span>
    </Link>
};

export default Logo;
