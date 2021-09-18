import React from "react";

import Avatar from "@components/Avatar";
import StarIcon from "@components/StarIcon";

import styles from "./RepoItem.module.scss";

export type RepoItemProps = {
    name: string,
    owner: string,
    ownerUrl: string,
    avatarUrl: string,
    stars: string,
    update: string
};

const RepoItem: React.FC<RepoItemProps> = ({ name, owner, ownerUrl, avatarUrl, stars, update }) => {
    return (
        <div className={`${styles.repo_item}`}>
            <Avatar src={avatarUrl} letter={name[0]} alt={owner} />

            <div className={`${styles.repo_info}`}>
                <p className={`${styles.info_header}`}>{name}</p>
                <div className={`${styles.info_org_link}`}>
                    <a className={`${styles.org_link}`} href={ownerUrl} target="_blank" rel="noreferrer">{owner}</a>
                </div>

                <div className={`${styles.add_info}`}>
                    <div className={`${styles.stars}`}>
                        <StarIcon />
                    </div>

                    <p className={`${styles.rating}`}>{stars}</p>
                    <p className={`${styles.update}`}>{update}</p>
                </div>
            </div>
        </div>
    );
};

export default React.memo(RepoItem);