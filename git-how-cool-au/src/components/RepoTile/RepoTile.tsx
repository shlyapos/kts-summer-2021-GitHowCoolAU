import RepoItem, { RepoItemProps } from "@components/RepoItem";
import "./RepoTile.css"

export type RepoTileProps = {
    onClick: (e: React.MouseEvent) => void;
    item: RepoItemProps;
};

const RepoTile: React.FC<RepoTileProps> = ({ onClick, item }) => {
    return (
        <div className="git-repo-tile" onClick={onClick}>
            <RepoItem name={item.name} owner={item.owner} ownerUrl={item.ownerUrl} avatarUrl={item.avatarUrl} stars={item.stars} update={item.update} />
        </div>
    );
};

export default RepoTile;