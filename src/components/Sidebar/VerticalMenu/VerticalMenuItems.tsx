import { NavigationProps } from "@/types";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const VerticalMenuItems = ({ open, item }: { open: boolean, item: NavigationProps }) => {
  const t = useTranslations("Sidebar")
  const pathname = usePathname()
  const params = useParams()
  const { locale } = params
  const isCurrentPath = `/${locale}${item.path}`

  return (
    <Link
      className={`my-1 p-2 rounded-md w-full flex justify-start items-center hover:font-bold ${pathname === isCurrentPath
        ? "bg-primary text-white font-bold dark:bg-white dark:text-primary"
        : "bg-transparent text-primary dark:text-white"
        }`}
      href={isCurrentPath}
    >
      <span className='mr-2'>
        <Icon icon={item.icon} fontSize={24} />
      </span>{" "}
      <p className="min-w-max">
        {(open) && t(item.label)}
      </p>
    </Link>
  );
};

export default VerticalMenuItems;
