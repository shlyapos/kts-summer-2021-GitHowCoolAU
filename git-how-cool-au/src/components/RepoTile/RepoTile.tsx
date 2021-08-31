import RepoItem from "../RepoItem";

export type RepoTileProps = {
    onClick: (e: React.MouseEvent) => void;
    item: React.ReactNode;
};

const RepoTile: React.FC<RepoTileProps> = ({ onClick, item }) => {
    return (
        <div className="git-repo-tile" onClick={onClick}>
            {item}
        </div>
    );
};

export default RepoTile;