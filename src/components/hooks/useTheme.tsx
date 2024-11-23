import { changeTheme, changeLanguage, selectTheme, selectLanguage } from "@/lib/features/theme";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const useTheme = () => {
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme); // Temayı alır
    const lang = useSelector(selectLanguage); // Dili alır

    // Temayı değiştir
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        dispatch(changeTheme(newTheme)); // Redux'ta temayı günceller
        localStorage.setItem("theme", newTheme); // Temayı localStorage'a kaydeder

        // HTML'de tema sınıfını günceller
        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme);
    };

    // Dili değiştir
    const toggleLanguage = (newLang: "en" | "tr") => {
        dispatch(changeLanguage(newLang)); // Redux'ta dili günceller
        localStorage.setItem("language", newLang); // Dili localStorage'a kaydeder

        // HTML'de dil sınıfını günceller
        document.documentElement.setAttribute("lang", newLang);
    };

    useEffect(() => {
        // Sayfa yüklendiğinde tema ve dili HTML'ye uygula
        document.documentElement.classList.add(theme);
        document.documentElement.setAttribute("lang", lang);
    }, [theme, lang]);

    return { theme, lang, toggleTheme, toggleLanguage };
};

export default useTheme;
