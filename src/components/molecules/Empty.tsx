import React, { ReactNode } from "react";
import Typography from "../atoms/Typography";

interface EmptyProps {
    emptyText: string;
    cta?: ReactNode;
};

const Empty: React.FC<EmptyProps> = ({ emptyText, cta }) => {
    return (
        <div className="p-4 border border-slate-200 rounded-xl w-full h-40 flex flex-col gap-3 justify-center items-center">
            <Typography as="h4" className="text-slate-600 text-xl font-semibold">{emptyText}</Typography>
            {cta}
        </div>
    );
};

Empty.displayName = "Empty";

export default Empty;