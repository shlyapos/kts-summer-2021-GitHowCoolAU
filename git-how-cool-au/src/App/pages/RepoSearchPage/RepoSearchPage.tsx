import React from "react";

import Loader from "@components/Loader";
import LoadIcon from "@components/LoadIcon";
import { RepoListProvider } from "@config/contexts/RepoListContext";
import { RepoListItem } from "@config/contexts/RepoListContext/types";
import { gitHubApp } from "@root/root";
import { ApiResponse } from "@shared/store/ApiStore";
import { formatDate } from "@utils/DateProcessing"
import { useHistory } from "react-router-dom";

import RepoBranchesDrawer from "./components/RepoBranchesDrawer/index";
import RepoList from "./components/RepoList";
import { ReposInfoResponseError, ReposInfoResponseSuccess } from "./types";


const RepoSearchPage: React.FC = () => {
    const stepPerPage = 10;
    const history = useHistory();

    const [currentInputValue, setInputValue] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [repoList, setRepoList] = React.useState<null | RepoListItem[]>(null);
    const [repoCurrentIndex, setRepoCurrentIndex] = React.useState(1);
    const [isAllLoad, setIsAllLoad] = React.useState(false);

    const [chosenRepo, setChosenRepo] = React.useState(false);

    const fetchRepos = async () => {
        if (currentInputValue !== '') {
            load(true);

            const response: ApiResponse<ReposInfoResponseSuccess[], ReposInfoResponseError> = await gitHubApp.getRepo(currentInputValue, repoCurrentIndex, stepPerPage);

            if (response.success) {
                // Проверка, все ли репозитории загружены
                if (response.data.length !== 0) {
                    let newRepoList: RepoListItem[] = repoList !== null ? repoList : [];

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
                    increaseRepoIndex();
                }
                else {
                    // В контексте поднимаем флаг об окончании загрузки, 
                    // чтобы InfiniteScroll не ожидал новых изменений
                    setIsLoading(true);
                }
            }
            else {
                prompt(response.data.message);
            }

            load(false);
        }
    }

    // Отслеживание изменений в поле ввода, при изменении содержимого очищается список репозиториев
    const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);

        if (repoList !== null) {
            setRepoCurrentIndex(1);
            setIsAllLoad(false);
            setRepoList(null);
        }
    };

    const load = (state: boolean) => setIsLoading(state);

    const increaseRepoIndex = () => setRepoCurrentIndex(repoCurrentIndex + 1);

    // События для chosenRepo
    const onClickRepoTileHandler = (owner: string, name: string) => {
        history.push(`/repos/${owner}/${name}`);
        setChosenRepo(true);
    }

    const onCloseRepoBranchesDrawer = () => {
        history.push('/repos');
        setChosenRepo(false);
    }

    return (
        <RepoListProvider value={{ list: repoList, isLoading: isLoading, load: load, isAllLoad: isAllLoad }}>
            {isLoading && <Loader><LoadIcon /></Loader>}

            <RepoList
                inputValue={currentInputValue}
                tileOnClick={onClickRepoTileHandler}
                searchOnClick={fetchRepos}
                onScroll={fetchRepos}
                onChangeInput={onChangeInputHandler}
            />
            <RepoBranchesDrawer visible={chosenRepo} onClose={onCloseRepoBranchesDrawer} />
        </RepoListProvider>
    );
};

export default RepoSearchPage;