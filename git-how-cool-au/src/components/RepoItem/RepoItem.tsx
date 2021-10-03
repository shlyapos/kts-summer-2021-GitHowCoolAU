import React from "react";

import Avatar from "components/Avatar";
import StarIcon from "components/StarIcon";
import { GitHubRepoItemModel } from "store/models/GitHub";

import styles from "./RepoItem.module.scss";



const RepoItem: React.FC<GitHubRepoItemModel> = ({ name, owner, stargazersCount, pushedAt }) => {
    return (
        <div className={styles.repo_item}>
            <Avatar src={owner.avatarUrl} letter={name[0]} alt={owner.login} />

            <div className={styles.repo_info}>
                <p className={styles.info_header}>{name}</p>
                <div className={styles.info_org_link}>
                    <a className={styles.org_link} href={owner.htmlUrl} target="_blank" rel="noreferrer">{owner.login}</a>
                </div>

                <div className={styles.add_info}>
                    <div className={styles.stars}>
                        <StarIcon />
                    </div>

                    <p className={styles.rating}>{stargazersCount}</p >
                    <p className={styles.update}>{pushedAt.toDateString()}</p>
                </div >
            </div >
        </div >
    );
};

export default React.memo(RepoItem);