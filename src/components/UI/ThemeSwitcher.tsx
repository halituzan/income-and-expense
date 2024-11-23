import { Icon } from "@iconify/react";
import useTheme from '../hooks/useTheme';
const ThemeSwitcher = ({ open }: any) => {
    const { theme, toggleTheme } = useTheme();
    return (
        <button
            onClick={toggleTheme}
            className="flex items-center justify-center p-2 rounded-lg  hover:bg-gray-200 dark:hover:bg-primary/50 transition-colors duration-200"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <Icon icon={"line-md:sun-rising-twotone-loop"} className="w-5 h-5 text-primary" />
            ) : (
                <Icon icon={"line-md:moon-rising-alt-loop"} className="w-5 h-5 text-slate-100" />
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