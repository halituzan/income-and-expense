import { Icon } from "@iconify/react";
import useTheme from '../hooks/useTheme';
const ThemeSwitcher = ({ open }: any) => {
    const { theme, toggleTheme } = useTheme();
    return (
        <button
            onClick={toggleTheme}
            className="flex items-center justify-center p-2 rounded-lg bg-white dark:bg-primary hover:bg-gray-200 dark:hover:bg-primary/50 transition-colors duration-200"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <Icon icon={"meteocons:sun-hot-fill"} className="w-5 h-5" />
            ) : (
                <Icon icon={"meteocons:moonset-fill"} className="w-5 h-5 " />
            )}
            {
                open && <span className="ml-2 text-primary dark:text-white">
                    {theme === 'light' ? 'Light' : 'Dark'}
                </span>
            }

        </button>
    );
};

export default ThemeSwitcher;