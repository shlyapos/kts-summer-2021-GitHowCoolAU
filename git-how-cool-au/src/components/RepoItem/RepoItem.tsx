import React from "react";

import Avatar from "@components/Avatar";
import StarIcon from "@components/StarIcon";
import "./RepoItem.css";

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
        <div className="git-repo-tile__repo-item">
            <Avatar src={avatarUrl} letter={name[0]} alt={owner} />

            <div className="repo-item__repo-info">
                <p className="text-header repo-info__header">{name}</p>
                <div className="repo-info__org-link">
                    <a className="text org-link" href={ownerUrl} target="_blank" rel="noreferrer">{owner}</a>
                </div>

                <div className="repo-info__repo-add-info">
                    <div className="repo-add-info__star">
                        <StarIcon />
                    </div>

                    <p className="text repo-add-info__rating">{stars}</p>
                    <p className="text repo-add-info__update">{update}</p>
                </div>
            </div>
        </div>
    );
};

export default React.memo(RepoItem);