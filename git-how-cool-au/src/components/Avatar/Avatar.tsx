import React from "react";
import "./Avatar.css"

export type AvatarProps = {
    src?: string,
    letter: string,
    alt?: string
};

const Avatar: React.FC<AvatarProps> = ({ src='none', letter, alt='user' }) => {
    return <div className="git-repo-tile__avatar" title={alt} style={{backgroundImage: `url(${src})`}}>{src === 'none' && letter.toUpperCase()}</div>
};

export default React.memo(Avatar);