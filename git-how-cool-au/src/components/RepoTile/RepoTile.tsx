import RepoItem from "components/RepoItem";
import React from "react";
import { GitHubRepoItemModel } from "store/models/GitHub";

import styles from "./RepoTile.module.scss";

export type RepoTileProps = {
    onClick: (e: React.MouseEvent) => void;
    item: GitHubRepoItemModel;
};

const RepoTile: React.FC<RepoTileProps> = ({ onClick, item }) => {
    return (
        <div className={styles.repo_tile} onClick={onClick}>
            <RepoItem id={item.id} name={item.name} owner={item.owner} stargazersCount={item.stargazersCount} pushedAt={item.pushedAt} />
        </div>
    );
};

export default RepoTile;