import React, { ReactNode } from "react";
import Label from "../atoms/Label";
import Typography from "../atoms/Typography";
import clsx from "clsx";

interface UserInfoProps {
    label: string;
    text: string;
    input?: ReactNode;
    textClassName?: string;
};

const UserInfo: React.FC<UserInfoProps> = ({ label, text, input, textClassName }) => {
    return (
        <div className="flex flex-col gap-1">
            <Label>{label}</Label>
            {input ? input : <Typography as="h4" className={clsx("text-base", textClassName)}>{text}</Typography>}
        </div>
    );
};

UserInfo.displayName = "UserInfo";

export default UserInfo;