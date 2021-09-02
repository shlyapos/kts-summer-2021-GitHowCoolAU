import Avatar from "@components/Avatar";
import "./RepoItem.css";

export type RepoItemProps = {
    name: string,
    author: string,
    authorUrl: string,
    avatarUrl: string,
    starIcon: React.ReactNode,
    stars: string,
    update: string
};

const RepoItem: React.FC<RepoItemProps> = ({ name, author, authorUrl, avatarUrl, starIcon, stars, update }) => {
    return (
        <div className="git-repo-tile__repo-item">
            {avatarUrl ? <Avatar src={avatarUrl} letter={name[0]} /> : <Avatar letter={name[0]} />}

            <div className="repo-item__repo-info">
                <p className="text-header repo-info__header">{name}</p>
                <a className="text repo-info__org-link" href={authorUrl} target="_blank">{author}</a>

                <div className="repo-info__repo-add-info">
                    {starIcon}
                    <p className="text repo-add-info__rating">{stars}</p>

                    <p className="text repo-add-info__update">{update}</p>
                </div>
            </div>
        </div>
    );
};

export default RepoItem;