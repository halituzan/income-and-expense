import React from "react";
import { Icon } from "@iconify/react";
import { useParams, usePathname, useRouter } from "next/navigation";

const VerticalMenuItems = ({ open, item }: any) => {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const { locale } = params
  const isCurrentPath = `/${locale}${item.path}`
  return (
    <button
      className={`my-1 p-2 rounded-md w-full flex justify-start items-center hover:font-bold hover:bg-primary/60 hover:text-white dark:text-white ${pathname === isCurrentPath
        ? "bg-primary text-white font-bold dark:bg-white dark:text-primary"
        : "bg-transparent text-primary dark:text-white"
        }`}
      onClick={() => {
        router.push(isCurrentPath);
      }}
    >
      <span className='mr-2'>
        <Icon icon={item.icon} fontSize={24} />
      </span>{" "}
      <p className="min-w-max">
        {(open) && item.label}
      </p>
    </button>
  );
};

export default VerticalMenuItems;
