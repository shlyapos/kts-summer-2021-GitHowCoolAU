import React from "react";

import "./RepoSearchPage.css"
import "./components/RepoBranchesDrawer"

import RepoItem, { RepoItemProps } from "@components/RepoItem";
import RepoTile from "@components/RepoTile";
import SearchButton from "@components/SearchButton";
import SearchIcon from "@components/SearchIcon";
import SearchInput from "@components/SearchInput";
import StarIcon from "@components/StarIcon";
import { gitHubApp } from "@root/root";
import { ApiResponse } from "@shared/store/ApiStore";
import { formatDate } from "@utils/DateProcessing"

import RepoBranchesDrawer from "./components/RepoBranchesDrawer";

type RepoListItem = {
    id: number,
    props: RepoItemProps
};

const RepoSearchPage = () => {
    const [currentInputValue, setInputValue] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [repoList, setRepoList] = React.useState<null | RepoListItem[]>(null);

    const [chosenRepo, setChosenRepo] = React.useState<null | RepoItemProps>(null);

    // Отслеживание изменений в поле ввода, при изменении содержимого очищается список репозиториев
    const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);

        if (repoList !== null)
            setRepoList(null);
    };

    // Обновление списка репозиториев при клике на кнопку поиска
    const onClicSearchButtonHandler = async (e: React.MouseEvent) => {
        if (currentInputValue !== '') {
            const response: ApiResponse<any, any> = await gitHubApp.getRepo(currentInputValue);

            if (response.success) {
                let newRepoList: RepoListItem[] = [];

                for (let repo of response.data) {
                    const newRepo: RepoListItem = {
                        id: repo.id,
                        props: {
                            name: repo.name,
                            author: repo.owner.login,
                            authorUrl: repo.owner.html_url,
                            avatarUrl: repo.owner.avatar_url,
                            starIcon: <StarIcon />,
                            stars: repo.stargazers_count,
                            update: formatDate(repo.updated_at)
                        }
                    };

                    newRepoList.push(newRepo);
                }

                setRepoList(newRepoList);
            }
        }
    };

    // События для chosenRepo
    const onClickRepoTileHandler = (repoItem: RepoItemProps) => setChosenRepo(repoItem);
    const onCloseRepoBranchesDrawer = () => setChosenRepo(null);

    // ???
    const onLoad = () => setIsLoading(false);

    return (
        <div>
            <div className="git-repo-list">
                <SearchInput value={currentInputValue} placeholder={"Введите автора или организацию"} onChange={onChangeInputHandler} />
                <SearchButton isDisabled={false} children={<SearchIcon />} onClick={onClicSearchButtonHandler} />

                {repoList && repoList.map(item =>
                    <RepoTile
                        key={item.id}
                        onClick={(e: React.MouseEvent) => onClickRepoTileHandler(item.props)}
                        item={
                            <RepoItem
                                name={item.props.name}
                                author={item.props.author}
                                authorUrl={item.props.authorUrl}
                                avatarUrl={item.props.avatarUrl}
                                starIcon={item.props.starIcon}
                                stars={item.props.stars}
                                update={item.props.update}
                            />}
                    />)}
            </div>

            {chosenRepo && <RepoBranchesDrawer selectedRepo={chosenRepo} onClose={onCloseRepoBranchesDrawer} />}
        </div>
    );
};

export default RepoSearchPage;