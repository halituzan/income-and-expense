import { changeTheme, selectTheme } from "@/lib/features/theme";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const useTheme = () => {
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        dispatch(changeTheme(newTheme));
        localStorage.setItem("theme", newTheme);

        // Update HTML class
        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme);
    };

    useEffect(() => {
        // Initialize the theme class on mount
        document.documentElement.classList.add(theme);
    }, [theme]);

    return { theme, toggleTheme };
};

export default useTheme;
