import { createContext, useContext } from "react";

const AccordionContext = createContext<{
    activeEventKey?: string | null;
    onToggle: (key: string | null) => void;
}>({
    activeEventKey: "",
    onToggle: (key: string | null) => { }
});;

const useAccordionContext = () => {
    const context = useContext(AccordionContext);
    if (!context) {
        throw new Error(
            'Accordion components are compound component. Must be used inside Accordion.'
        );
    }
    return context;
};

export { useAccordionContext, AccordionContext };