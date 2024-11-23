"use client"
import { Icon } from "@iconify/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import useTheme from '../hooks/useTheme';
const LanguageSwitcher = ({ open }: any) => {
    const { theme, lang, toggleLanguage } = useTheme();
    const path = usePathname()
    const router = useRouter()
    const params = useParams()

    const updateLanguage = (newLang: "en" | "tr") => {
        const segments = path.split("/").filter(Boolean);
        segments[0] = newLang;
        console.log("segments", segments);

        const newPath = `/${segments.join("/")}`;
        router.push(newPath);
        toggleLanguage(newLang);
    };
    console.log("lang", lang);

    return (
        <button
            onClick={() => updateLanguage(params.locale === "en" ? "tr" : "en")}
            className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-primary/50 transition-colors duration-200"
            aria-label="Toggle language"
        >
            <Icon
                icon={"flowbite:language-outline"}
                className={`w-5 h-5 ${theme === "light" ? "text-primary" : "text-slate-100"}`}
            />
            {open && (
                <span className="ml-2 text-primary dark:text-white">
                    {lang === "tr" ? "English" : "Türkçe"}
                </span>
            )}
        </button>
    );
};

export default LanguageSwitcher;