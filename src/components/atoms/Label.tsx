import React from "react";
import Typography from "./Typography";

type LabelProps = {} & React.PropsWithChildren;

const Label: React.FC<LabelProps> = ({ children }) => {
    return (
        <Typography as="label" className="text-sm text-slate-600">{children}</Typography>
    );
};

Label.displayName = "Label";

export default Label;