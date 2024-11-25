import BottomBar from "@/components/Mobile/BottomBar";
import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Poppins } from "next/font/google";
import "../../globals.css";
import 'react-toastify/dist/ReactToastify.css';
import StoreProvider from "./StoreProvider";
import { Icon } from "@iconify/react";
import { ToastContainer } from 'react-toastify';
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Income And Expense Web Application",
  description: "Web application that lets you track your income and expenses.",
};
export function generateViewport({ params }: any) {
  return {
    themeColor: "#475569"
  }
}

const LocaleLayout = async ({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) => {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={poppins.className + " bg-white dark:bg-primary/80"}>
        <div className='min-h-screen flex flex-col md:flex-row justify-between relative'>
          <NextIntlClientProvider messages={messages}>
            <StoreProvider>
              <aside className='hidden md:block'>
                <Sidebar />
              </aside>
              <main className='flex-1 w-full py-4 overflow-y-auto h-screen dark:bg-transparent'>
                {children}
              </main>
              <div className='z-50 mobile-navbar sticky bottom-0 w-full h-[60px] rounded-t-2xl bg-slate-100  dark:bg-slate-800 shadow-lg shadow-primary dark:shadow-white flex md:hidden items-center px-2'>
                <BottomBar />
              </div>
              <ToastContainer />
            </StoreProvider>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
};
export default LocaleLayout;
