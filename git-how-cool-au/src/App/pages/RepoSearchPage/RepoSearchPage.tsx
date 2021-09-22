import React from "react";

import Loader from "@components/Loader";
import LoadIcon from "@components/LoadIcon";
import { RepoListProvider } from "@config/contexts/RepoListContext";
import { RepoListItem } from "@config/contexts/RepoListContext/types";
import { gitHubApp } from "@root/root";
import { ApiResponse, ResponseError } from "@shared/store/ApiStore";
import { formatDate } from "@utils/DateProcessing"
import { useHistory } from "react-router-dom";

import RepoBranchesDrawer from "./components/RepoBranchesDrawer/index";
import RepoList from "./components/RepoList";
import { RepoResponse } from "./types";


const RepoSearchPage: React.FC = () => {
    const stepPerPage = 10;

    const history = useHistory();

    const [currentInputValue, setInputValue] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [repoList, setRepoList] = React.useState<null | RepoListItem[]>(null);
    const [page, setPage] = React.useState(1);
    const [isAllLoad, setIsAllLoad] = React.useState(false);

    const [chosenRepo, setChosenRepo] = React.useState(false);

    const fetchRepos = async () => {
        if (!currentInputValue) return;

        setIsLoading(true);

        const response: ApiResponse<RepoResponse[], ResponseError> = await gitHubApp.getRepo(currentInputValue, page, stepPerPage);

        if (response.success) {
            if (!response.data.length) {
                setIsAllLoad(true);
                setIsLoading(false);
                return;
            }

            let newRepoList: RepoListItem[] = repoList ? repoList : [];

            setRepoList(newRepoList.concat(
                response.data.map((item) => {
                    return {
                        id: item.id,
                        props: {
                            name: item.name,
                            owner: item.owner.login,
                            ownerUrl: item.owner.html_url,
                            avatarUrl: item.owner.avatar_url,
                            stars: item.stargazers_count,
                            update: formatDate(item.updated_at)
                        }
                    }
                })
            ));

            setPage(page + 1);
        }
        else {
            alert(response.data.message);
        }

        setIsLoading(false);
    }

    // Отслеживание изменений в поле ввода, при изменении содержимого очищается список репозиториев
    const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);

        if (repoList) {
            setPage(1);
            setIsAllLoad(false);
            setRepoList(null);
        }
    };

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
        <RepoListProvider value={{ list: repoList, isLoading: isLoading, load: fetchRepos, isAllLoad: isAllLoad }}>
            {isLoading && <Loader><LoadIcon /></Loader>}

            <RepoList
                inputValue={currentInputValue}
                tileOnClick={onClickRepoTileHandler}
                onChangeInput={onChangeInputHandler}
            />
            <RepoBranchesDrawer visible={chosenRepo} onClose={onCloseRepoBranchesDrawer} />
        </RepoListProvider>
    );
};

export default RepoSearchPage;