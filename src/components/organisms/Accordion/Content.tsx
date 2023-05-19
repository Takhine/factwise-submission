import React, { PropsWithChildren } from "react";
import { useAccordionContext } from "src/shared/hooks/useAccordionContext";

interface ContentProps {
    eventKey: string;
};

const Content: React.FC<PropsWithChildren<ContentProps>> = ({ eventKey, children }) => {
    const { activeEventKey } = useAccordionContext();

    const isActive = activeEventKey === eventKey;

    if (isActive)
        return (
            <div>{children}</div>
        );

    return null
};

Content.displayName = "Content";

export default Content;