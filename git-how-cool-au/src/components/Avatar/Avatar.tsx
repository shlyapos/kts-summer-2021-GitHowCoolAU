import "./Avatar.css"

export type AvatarProps = {
    src?: string,
    letter: string,
    alt?: string
};

const Avatar: React.FC<AvatarProps> = ({ src, letter, alt }) => {
    return (
        <>
            {src ?
                <img className="git-repo-tile__avatar" src={src} alt={alt} /> :
                <div className="git-repo-tile__avatar">{letter.toUpperCase()}</div>}
        </>
    );
};

export default Avatar;