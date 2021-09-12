import styles from "./RepoTile.module.scss"

export type RepoTileProps = {
    onClick: (e: React.MouseEvent) => void;
    item: React.ReactNode;
};

const RepoTile: React.FC<RepoTileProps> = ({ onClick, item }) => {
    return (
        <div className={`${styles.git_repo_tile}`} onClick={onClick}>
            {item}
        </div>
    );
};

export default RepoTile;