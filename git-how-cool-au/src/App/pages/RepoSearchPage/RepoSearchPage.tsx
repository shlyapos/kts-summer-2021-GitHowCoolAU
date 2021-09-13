import React from "react";

import "./RepoSearchPage.css"

import Loader from "@components/Loader";
import LoadIcon from "@components/LoadIcon";
import { RepoItemProps } from "@components/RepoItem";
import RepoTile from "@components/RepoTile";
import SearchButton from "@components/SearchButton";
import SearchIcon from "@components/SearchIcon";
import SearchInput from "@components/SearchInput";
import { gitHubApp } from "@root/root";
import { ApiResponse } from "@shared/store/ApiStore";
import { formatDate } from "@utils/DateProcessing"

import RepoBranchesDrawer from "./components/RepoBranchesDrawer/index";
import { RepoListItem, ReposInfoResponseError, ReposInfoResponseSuccess } from "./types";

const RepoSearchPage: React.FC = () => {
    const [currentInputValue, setInputValue] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [repoList, setRepoList] = React.useState<null | RepoListItem[]>(null);

    const [chosenRepo, setChosenRepo] = React.useState<null | RepoItemProps>(null);

    // Отслеживание изменений в поле ввода, при изменении содержимого очищается список репозиториев
    const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);

        if (repoList !== null)
            setRepoList(null);
    };

    // Обновление списка репозиториев при клике на кнопку поиска
    const onClickSearchButtonHandler = async (e: React.MouseEvent) => {
        if (currentInputValue !== '') {
            setIsLoading(true);

            const response: ApiResponse<ReposInfoResponseSuccess[], ReposInfoResponseError> = await gitHubApp.getRepo(currentInputValue);
            
            if (response.success) {
                let newRepoList: RepoListItem[] = [];

                response.data.map(item => newRepoList.push({
                    id: item.id,
                    props: {
                        name: item.name,
                        owner: item.owner.login,
                        ownerUrl: item.owner.html_url,
                        avatarUrl: item.owner.avatar_url,
                        stars: item.stargazers_count,
                        update: formatDate(item.updated_at)
                    }
                }));

                setRepoList(newRepoList);
            }

            setIsLoading(false);
        }
    };

    // События для chosenRepo
    const onClickRepoTileHandler = (repoItem: RepoItemProps) => setChosenRepo(repoItem);
    const onCloseRepoBranchesDrawer = () => setChosenRepo(null);

    return (
        <div>
            {isLoading && <Loader><LoadIcon /></Loader>}

            <div className="git-repo-list">
                <SearchInput value={currentInputValue} placeholder="Введите автора или организацию" onChange={onChangeInputHandler} />
                <SearchButton isDisabled={isLoading} onClick={onClickSearchButtonHandler}><SearchIcon /></SearchButton>

                {repoList?.length !== 0 && repoList?.map(item =>
                    <RepoTile key={item.id} onClick={(e: React.MouseEvent) => onClickRepoTileHandler(item.props)} item={item.props} />)
                }
            </div>

            <RepoBranchesDrawer visible={chosenRepo !== null} chosenRepo={chosenRepo} onClose={onCloseRepoBranchesDrawer} />
        </div>
    );
};

export default RepoSearchPage;