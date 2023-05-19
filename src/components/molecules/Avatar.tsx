import React from "react";

interface AvatarProps {
    src: string;
    alt: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => {
    return (
        <div className="overflow-hidden w-16 h-16 rounded-full border border-slate-200 flex">
            <img src={src} alt={alt} className="object-cover w-full h-auto" />
        </div>
    );
};

Avatar.displayName = "Avatar";

export default Avatar;