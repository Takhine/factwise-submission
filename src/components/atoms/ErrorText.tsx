import React, { PropsWithChildren } from "react";
import Typography from "./Typography";

interface ErrorTextProps { };

const ErrorText: React.FC<PropsWithChildren<ErrorTextProps>> = ({ children }) => {
    return (
        <Typography as="p" className="text-sm text-red-600 absolute -bottom-5">{children}</Typography>
    );
};

ErrorText.displayName = "ErrorText";

export default ErrorText;