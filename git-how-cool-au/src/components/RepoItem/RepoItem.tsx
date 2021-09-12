import Avatar from "@components/Avatar";


import styles from "./RepoItem.module.scss";

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
        <div className={`${styles.git_repo_tile__repo_item}`}>
            {avatarUrl ? <Avatar src={avatarUrl} letter={name[0]} /> : <Avatar letter={name[0]} />}

            <div className={`${styles.repo_item__repo_info}`}>
                <p className={`${styles.text_header} ${styles.repo_info__header}`}>{name}</p>
                <div className={`${styles.repo_info__org_link}`}>
                    <a className={`${styles.text} ${styles.org_link}`} href={authorUrl} target="_blank" rel="noreferrer">{author}</a>
                </div>

                <div className={`${styles.repo_info__repo_add_info}`}>
                    <div className={`${styles.repo_add_info__star}`}>{starIcon}</div>
                    <p className={`${styles.text} ${styles.repo_add_info__rating}`}>{stars}</p>

                    <p className={`${styles.text} ${styles.repo_add_info__update}`}>{update}</p>
                </div>
            </div>
        </div >
    );
};

export default RepoItem;