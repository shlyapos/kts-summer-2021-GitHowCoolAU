import React from "react";

import "./RepoSearchPage.css"

import RepoItem, { RepoItemProps } from "@components/RepoItem";
import RepoTile from "@components/RepoTile";
import SearchButton from "@components/SearchButton";
import SearchIcon from "@components/SearchIcon";
import SearchInput from "@components/SearchInput";
import StarIcon from "@components/StarIcon";
import { gitHubApp } from "@root/root";
import { formatDate } from "@utils/DateProcessing"

type RepoListItem = {
    id: number,
    info: RepoItemProps
};

const RepoSearchPage = () => {
    const [currentInputValue, setInputValue] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [repoList, setRepoList] = React.useState<RepoListItem[]>([]);

    // Отслеживание изменений в поле ввода, при изменении содержимого очищается список репозиториев
    const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);

        if (repoList.length !== 0)
            repoList.length = 0;
    };

    const onLoad = () => setIsLoading(false);

    const onClickButtonHandler = async (e: React.MouseEvent) => {
        if (currentInputValue === "") return;

        const response = await gitHubApp.getRepositoriesByUsername(currentInputValue);
        console.log(response)
        if (response.success) {
            let currentRepoList: RepoListItem[] = [];

            for (let repoItem of response.data) {
                const newRepo: RepoListItem = {
                    id: repoItem.id,
                    info: {
                        name: repoItem.name,
                        author: repoItem.owner.login,
                        authorUrl: repoItem.owner.html_url,
                        starIcon: < StarIcon />,
                        stars: repoItem.stargazers_count,
                        update: formatDate(repoItem.updated_at),
                        avatarUrl: repoItem.owner.avatar_url
                    }
                }

                currentRepoList.push(newRepo);
            }

            setRepoList(currentRepoList);
        }
    }

    const onClickRepoTileHandler = () => { };

    return (
        <div className="git-repo-list">
            <SearchInput value={currentInputValue} placeholder={"Введите автора или организацию"} onChange={onChangeInputHandler} />
            <SearchButton isDisabled={false} children={<SearchIcon />} onClick={onClickButtonHandler} />

            {repoList.map((item) => (
                <RepoTile
                    key={item.id}
                    onClick={onClickRepoTileHandler}
                    item={<RepoItem
                        name={item.info.name}
                        author={item.info.author}
                        authorUrl={item.info.authorUrl}
                        avatarUrl={item.info.avatarUrl}
                        starIcon={item.info.starIcon}
                        stars={item.info.stars}
                        update={item.info.update}
                    />}
                />
            ))}
        </div>
    );
};

export default RepoSearchPage;