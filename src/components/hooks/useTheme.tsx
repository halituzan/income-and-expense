import { changeTheme, changeLanguage, selectTheme, selectLanguage } from "@/lib/features/theme";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const useTheme = () => {
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);
    const lang = useSelector(selectLanguage); 
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        dispatch(changeTheme(newTheme));
        localStorage.setItem("theme", newTheme); 
        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme);
    };
    const toggleLanguage = (newLang: "en" | "tr") => {
        dispatch(changeLanguage(newLang));
        localStorage.setItem("language", newLang);
        document.documentElement.setAttribute("lang", newLang);
    };
    useEffect(() => {
        document.documentElement.classList.add(theme);
    }, [theme]);

    useEffect(() => {
        document.documentElement.setAttribute("lang", lang);
    }, [lang]);

    return { theme, lang, toggleTheme, toggleLanguage };
};

export default useTheme;
