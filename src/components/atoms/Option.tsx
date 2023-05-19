import clsx from "clsx";
import React, { ReactNode } from "react";
import { useSelectContext } from "src/shared/hooks/useSelectContext";

interface OptionProps {
    children: ReactNode | ReactNode[];
    value: string;
    className?: string;
};

const Option: React.FC<OptionProps> = ({ children, className, value }) => {
    const { changeSelectedOption, selectedOption } = useSelectContext();

    return (
        <li className={clsx(className, {
            "bg-slate-50": selectedOption === value
        }, "p-2 list-none border-b border-slate-100 cursor-pointer last:border-b-0 last:rounded-b-xl first:rounded-t-xl hover:bg-slate-100")} onClick={() => changeSelectedOption(value.toLowerCase())}>
            {children}
        </li>
    );
};

Option.displayName = "Option";

export default Option;