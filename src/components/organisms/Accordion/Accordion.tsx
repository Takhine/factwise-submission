import React, { PropsWithChildren, ReactNode, useMemo } from "react";
import Toggle from "./Toggle";
import Content from "./Content";
import { AccordionContext } from "src/shared/hooks/useAccordionContext";

interface CompoundAccordion {
    Toggle: React.FC<any>;
    Content: React.FC<any>;
    displayName: string;
};

interface AccordionProps {
    activeEventKey: string | null;
    onToggle: (key: string | null) => void;
};

/*
<Accordion>
 <Accordion.Toggle>{toggleContent}</Accordion.Toggle>
 <Accordion.Content>{accordionContent}</Accordion.Content>
</Accordion>
*/
const Accordion: React.FC<PropsWithChildren<AccordionProps>> & CompoundAccordion = ({
    children,
    activeEventKey,
    onToggle
}) => {
    const context = useMemo(() => {
        return { activeEventKey, onToggle }
    }, [activeEventKey, onToggle]);

    return <AccordionContext.Provider value={context}>
        {children}
    </AccordionContext.Provider>;
};

Accordion.displayName = "Accordion";

Accordion.Toggle = Toggle;
Accordion.Content = Content;

export {Accordion};