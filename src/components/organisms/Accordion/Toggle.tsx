import clsx from "clsx";
import React, { MouseEvent, MouseEventHandler, PropsWithChildren, ReactNode } from "react";
import { useAccordionContext } from "src/shared/hooks/useAccordionContext";
import ChevronIcon from "src/shared/icons/ChevronIcon";

interface ToggleProps {
    onClick: () => void;
    eventKey: string;
    disableToggle?: boolean;
    children: ReactNode;
};

const useAccordionClick = (eventKey: string, onClick: (event: MouseEvent<HTMLDivElement>) => void) => {
    const { onToggle, activeEventKey } = useAccordionContext();
    return {handleClick: (event: MouseEvent<HTMLDivElement>) => {
        onToggle(eventKey === activeEventKey ? null : eventKey);
        if (onClick) {
            onClick(event);
        }
    }, isActive: eventKey === activeEventKey};
};

const Toggle: React.FC<ToggleProps> = ({
    onClick,
    disableToggle,
    eventKey,
    children
}) => {
    const {handleClick, isActive} = useAccordionClick(eventKey, onClick);

    return (
        <div onClick={(e) => !disableToggle && handleClick(e)} className="relative">{children}
            <div className={clsx("absolute right-8 bottom-10 transform duration-300 ease", {
                "rotate-180": isActive
            })}>
                <ChevronIcon color="#707070" />
            </div>
        </div>
    );
};

Toggle.displayName = "Toggle";

export default Toggle;