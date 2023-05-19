import clsx from "clsx";
import React from "react";
import ErrorText from "./ErrorText";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    ref?: React.ForwardedRef<HTMLTextAreaElement>;
    error?: string;
};

const Textarea: React.FC<TextareaProps> = React.forwardRef(({ className, error, ...restProps }, ref) => {
    return (
        <div className="relative">
        <textarea
            ref={ref}
            className={clsx("border w-full border-slate-300 rounded-xl resize-none p-2", className)}
            {...restProps}
        />
        {error && <ErrorText>{error}</ErrorText>}

        </div>

    );
});

Textarea.displayName = "Textarea";

export default Textarea;