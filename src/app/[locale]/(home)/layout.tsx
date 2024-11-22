import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Sidebar from "@/components/Sidebar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Income And Expense Web Application",
  description: "Web application that lets you track your income and expenses.",
};

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
      <body className={poppins.className}>
        <div className='min-h-screen flex flex-col md:flex-row justify-between relative'>
          <NextIntlClientProvider messages={messages}>
            <aside className="hidden md:block">
              <Sidebar />
            </aside>
            <main className='flex-1 w-full py-4 overflow-y-auto h-screen'>
              {children}
            </main>
            <div className="mobile-navbar sticky bottom-0 w-full h-10 bg-red-500 shadow-sm flex md:hidden justify-center">
              <div>
                asd
              </div>
              <div>
                asd
              </div>
            </div>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
};
export default LocaleLayout;
