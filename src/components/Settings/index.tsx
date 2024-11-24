"use client";
import getNotificationSettings from "@/services/Notification/getNotificationSettings";
import setNotificationSettings from "@/services/Notification/setNotificationSettings";
import { useEffect, useState } from "react";
import Card from "../UI/Card";
import LanguageSwitcher from "../UI/LanguageSwitcher";
import ThemeSwitcher from "../UI/ThemeSwitcher";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

type Props = {};

const SettingsPage = (props: Props) => {
  const t = useTranslations("Settings")
  const [notificationData, setNotificationData] = useState<any>({});
  const [mounted, setMounted] = useState<boolean>(false);
  const params = useParams()
  const openNotification = (isOpenNotification: boolean) => {
    setMounted(!mounted)
    setNotificationSettings("isOpenNotification", isOpenNotification);
    setNotificationData({ ...notificationData, isOpenNotification })
  };
  const changeHandler = (e: any) => {
    setMounted(!mounted)
    if (e.target.name === "currency") {
      setNotificationSettings(e.target.name, e.target.value);
    } else {
      setNotificationSettings(e.target.name, parseInt(e.target.value));
    }

    setNotificationData({ ...notificationData, [e.target.name]: e.target.value })
  };
  useEffect(() => {
    const data = getNotificationSettings();
    setNotificationData(data);
  }, [mounted]);
  useEffect(() => {

    const data = getNotificationSettings();
    if (!data.currency) {
      if (params.locale === "en") {
        setNotificationSettings("currency", "USD");
      } else {
        setNotificationSettings("currency", "TRY");
      }

    }
    if (!data.percent) {
      setNotificationSettings("categoryPercent", 80);
    }
    console.log("data.isOpenNotification", data.isOpenNotification);

    if (data.isOpenNotification !== true && data.isOpenNotification !== false) {
      setNotificationSettings("isOpenNotification", true);
    }
  }, []);

  return (
    <div className='flex flex-col max-w-6xl mx-auto px-4'>
      <div className='flex flex-col items-end justify-end gap-2 w-full'>
        <div className='w-24 flex items-center gap-2 justify-end'>
          <ThemeSwitcher open={true} />
          <LanguageSwitcher open={true} />
        </div>
        <Card>
          <div className='w-full flex flex-col justify-start'>
            <h2 className='mb-4 text-2xl text-primary dark:text-slate-100'>
              {t("title")}
            </h2>
            <div>
              <label className='inline-flex items-center cursor-pointer'>
                <input
                  type='checkbox'
                  checked={notificationData?.isOpenNotification}
                  className='sr-only peer'
                  onChange={(e) => openNotification(e.currentTarget.checked)}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-100 dark:peer-focus:ring-slate-100 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
                <span className='ms-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
                  {t("openNotification")}
                </span>
              </label>
            </div>
            {/* <div className='w-[300px] my-3'>
              <label
                htmlFor='categoryAmount'
                className='block text-sm font-medium text-gray-700 dark:text-slate-100 mb-2'
              >
                Kategori Uyarı Limiti
              </label>
              <input
                type='number'
                id='categoryAmount'
                name='categoryAmount'
                value={notificationData.categoryAmount}
                onChange={changeHandler}
                placeholder='Kategori uyarı limiti..'
                className='p-2 h-12 block w-full rounded-md border border-primary shadow-sm bg-slate-50 dark:bg-slate-400 outline-none focus:outline-none text-primary dark:text-white placeholder:text-slate-100 dark:disabled:bg-slate-700 disabled:cursor-not-allowed'
                required
                readOnly={!notificationData.isOpenNotification}
                disabled={!notificationData.isOpenNotification}
              />
            </div>
            <div className='w-[300px] my-3'>
              <label
                htmlFor='weeklyAmount'
                className='block text-sm font-medium text-gray-700 dark:text-slate-100 mb-2'
              >
                Haftalık Uyarı Limiti
              </label>
              <input
                type='number'
                id='weeklyAmount'
                name='weeklyAmount'
                value={notificationData.weeklyAmount}
                onChange={changeHandler}
                placeholder='Haftalık uyarı limiti..'
                className='p-2 h-12 block w-full rounded-md border border-primary shadow-sm bg-slate-50 dark:bg-slate-400 outline-none focus:outline-none text-primary dark:text-white placeholder:text-slate-100 dark:disabled:bg-slate-700 disabled:cursor-not-allowed'
                required
                readOnly={!notificationData.isOpenNotification}
                disabled={!notificationData.isOpenNotification}
              />
            </div>
            <div className='w-[300px] my-3'>
              <label
                htmlFor='monthlyAmount'
                className='block text-sm font-medium text-gray-700 dark:text-slate-100 mb-2'
              >
                Aylık Uyarı Limiti
              </label>
              <input
                type='number'
                id='monthlyAmount'
                name='monthlyAmount'
                value={notificationData.monthlyAmount}
                onChange={changeHandler}
                placeholder='Aylık uyarı limiti..'
                className='p-2 h-12 block w-full rounded-md border border-primary shadow-sm bg-slate-50 dark:bg-slate-400 outline-none focus:outline-none text-primary dark:text-white placeholder:text-slate-100 dark:disabled:bg-slate-700 disabled:cursor-not-allowed'
                required
                readOnly={!notificationData.isOpenNotification}
                disabled={!notificationData.isOpenNotification}
              />
            </div> */}

            <div className='w-[300px] my-3'>
              <label
                htmlFor='categoryPercent'
                className='block text-sm font-medium text-gray-700 dark:text-slate-100 mb-2'
              >
                {t("categoryAlertPercent")}
              </label>
              <input
                type='number'
                id='categoryPercent'
                name='categoryPercent'
                value={notificationData.categoryPercent}
                onChange={changeHandler}
                placeholder='80'
                defaultValue={80}
                min={10}
                max={100}
                className='p-2 h-12 block w-full rounded-md border border-primary shadow-sm bg-slate-50 dark:bg-slate-400 outline-none focus:outline-none text-primary dark:text-white placeholder:text-slate-100 dark:disabled:bg-slate-700 disabled:cursor-not-allowed'
                required
                readOnly={!notificationData.isOpenNotification}
                disabled={!notificationData.isOpenNotification}
              />
            </div>
            <div className='w-[300px] my-3'>
              <label
                htmlFor='currency'
                className='block text-sm font-medium text-gray-700 dark:text-slate-100 mb-2'
              >
                {t("currency")}
              </label>
              <select
                id='currency'
                name='currency'
                value={notificationData.currency}
                onChange={changeHandler}
                className='p-2 h-12 block w-full rounded-md border border-primary shadow-sm bg-slate-50 dark:bg-primary/80 outline-none focus:outline-none text-primary dark:text-slate-100'
                disabled={!notificationData.isOpenNotification}
              >
                <option value='TRY'>₺ - TL</option>
                <option value='USD'>$ - USD</option>
              </select>
            </div>

          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
