import clsx from "clsx";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "src/shared/hooks/useClickOutside";
import { SelectContext } from "src/shared/hooks/useSelectContext";

interface SelectProps {
    children: ReactNode | ReactNode[];
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
};

const Select: React.FC<SelectProps> = React.forwardRef(({ children, value, placeholder, onChange }, ref) => {
    const [selectedOption, setSelectedOption] = useState(value?.toLowerCase() || "");
    const [showDropdown, setShowDropdown] = useState(false);
    const showDropdownHandler = () => setShowDropdown(!showDropdown);
    const selectPlaceholder = placeholder || "Choose an option";

    const selectContainerRef = useRef(null);

    const clickOutsideHandler = () => setShowDropdown(false);

    // custom hook to detect the click on the outside
    useOnClickOutside(selectContainerRef, clickOutsideHandler);


    const updateSelectedOption = (option: string) => {
        setSelectedOption(option);
        if(onChange) {
            onChange(option)
        }
        setShowDropdown(false);
    };

    useEffect(() => {
        if(value) {
            setSelectedOption(value?.toLowerCase())
        }
    },[value])

    return (
        <SelectContext.Provider
            value={{ selectedOption, changeSelectedOption: updateSelectedOption }}
        >
            <div className="rounded-xl inline-block relative" ref={selectContainerRef}>
                <div
                    className={clsx("p-2 border capitalize border-slate-300 rounded-xl cursor-pointer after:contents after:absolute after:top-4 after:border after:border-slate-300 ", {
                        "active": showDropdown
                    })}
                    onClick={showDropdownHandler}
                >
                    {selectedOption.length > 0 ? selectedOption : selectPlaceholder}
                </div>
                <ul
                    className={clsx("absolute rounded-xl bg-white mt-1.5 w-full border border-slate-300", {
                        "opacity-1 visible min-h-[50px]": showDropdown,
                        "opacity-0 invisible min-h-0": !showDropdown
                    })
                    }
                >
                    {children}
                </ul>
            </div>
        </SelectContext.Provider>
    );
});

Select.displayName = "Select";

export default Select;