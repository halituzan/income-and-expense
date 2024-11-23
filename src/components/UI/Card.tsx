import React from "react";

type CardProps = {
    children: React.ReactNode,
    shadow?: "none" | "sm" | "md" | "lg" | "xl" | "2xl",
    rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full",
    bg?: string,
    flex?: "col" | "row",
    p?: number
    textColor?: string

};

const Card = ({ children, shadow = "md", bg = "slate-100", rounded = "lg", p = 6 }: CardProps) => {

    return <div className={`flex flex-col md:flex-row items-center justify-center w-full shadow-${shadow} bg-${bg} dark:bg-primary p-${p} rounded-${rounded} `}>
        {children}
    </div>;
};

export default Card;
