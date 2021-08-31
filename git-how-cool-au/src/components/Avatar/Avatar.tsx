export type AvatarProps = {
    src?: string,
    letter: string,
    alt?: string
};

const Avatar: React.FC<AvatarProps> = ({ src, letter, alt }) => {
    return <div className="git-repo-tile__avatar">{letter}</div>;
};

export default Avatar;