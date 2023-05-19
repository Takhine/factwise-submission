import clsx from "clsx";
import React, { ReactNode } from "react";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    className,
    ...restProps
}) => {
    return (
        <button
            onClick={onClick}
            className={clsx("rounded border disabled:opacity-60 disabled:cursor-not-allowed border-slate-300 py-2 px-4", className)}
            {...restProps}
        >
            {children}
        </button>
    );
};

Button.displayName = "Button";

export default Button;