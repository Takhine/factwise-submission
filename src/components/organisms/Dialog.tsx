import React, { ReactNode } from "react";

interface DialogProps {
    children?: ReactNode;
    isOpen: boolean;
    toggle: () => void;
};

const Dialog: React.FC<DialogProps> = (props) => {
    return (
        <>
            {props.isOpen && (
                <div className="z-50 w-screen h-screen fixed top-0 bg-black bg-opacity-60 flex justify-center items-center" onClick={props.toggle}>
                    <div onClick={(e) => e.stopPropagation()} className="block bg-white w-4/6 md:w-full max-w-lg p-1 rounded-lg">
                        {props.children}
                    </div>
                </div>
            )}
        </>
    );
};

Dialog.displayName = "Dialog";

export default Dialog;