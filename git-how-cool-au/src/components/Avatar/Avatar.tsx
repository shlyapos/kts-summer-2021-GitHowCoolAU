import styles from "./Avatar.module.scss"

export type AvatarProps = {
    src?: string,
    letter: string,
    alt?: string
};

const Avatar: React.FC<AvatarProps> = ({ src, letter, alt }) => {
    return (
        <>
            {src ?
                <img className={`${styles.git_repo_tile__avatar}`} src={src} alt={alt} /> :
                <div className={`${styles.git_repo_tile__avatar}`}>{letter.toUpperCase()}</div>}
        </>
    );
};

export default Avatar;