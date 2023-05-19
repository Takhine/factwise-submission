import React from "react";
import { emptyObject } from "src/shared/constants/empty";

type NamedChildrenSlots = {
    editView: React.ReactNode;
    readView: React.ReactNode;
};

interface EditToggleWrapperProps {
    isEditMode: boolean;
    children?: NamedChildrenSlots;
};

const EditToggleWrapper: React.FC<EditToggleWrapperProps> = ({
    isEditMode,
    children
}) => {
    const { editView, readView } = children || emptyObject;
    return (
        <>
            {isEditMode && editView}
            {!isEditMode && readView}
        </>
    );
};

EditToggleWrapper.displayName = "EditToggleWrapper";

export default EditToggleWrapper;