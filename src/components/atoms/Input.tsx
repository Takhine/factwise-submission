import clsx from "clsx";
import React from "react";
import ErrorText from "./ErrorText";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    ref?: React.ForwardedRef<HTMLInputElement>;
    error?: string;
};

const Input: React.FC<InputProps> = React.forwardRef(({ className, error, ...restProps }, ref) => {
    return (
        <div className="relative">
            <input
                ref={ref}
                className={clsx("border border-slate-300 rounded-xl p-2", className)}
                {...restProps}
            />
            {error && <ErrorText>{error}</ErrorText>}
        </div>

    );
});

Input.displayName = "Input";

export default Input;