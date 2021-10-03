import React from "react";

import ErrorWindow from "components/ErrorWindow";
import Loader from "components/Loader";
import LoadIcon from "components/LoadIcon";
import { RepoListContext, useRepoListContextData } from "config/contexts/RepoListContext";
import { Meta } from "utils/meta";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router";

import RepoBranchesDrawer from "./components/RepoBranchesDrawer";
import RepoList from "./components/RepoList";

const RepoSearchPage: React.FC = () => {
    const history = useHistory();

    const {repoListStore} = useRepoListContextData();

    const [currentInputValue, setInputValue] = React.useState('');
    const [chosenRepo, setChosenRepo] = React.useState(false);

    const onChangeInputHandler = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);

        if (repoListStore && repoListStore.list.length !== 0)
            repoListStore.destroy();
    }, 
    [repoListStore]);

    const searchOnClick = React.useCallback(async () => {
        if (repoListStore && currentInputValue) {
            await repoListStore.updateList({login: currentInputValue});
        }
    }, [repoListStore, currentInputValue]);

    const redirectToDrawer = React.useCallback((login: string, repo: string) => {
        history.push(`/repos/${login}/${repo}`);
        setChosenRepo(true);
    }, [history]);

    const redirectFromDrawer = React.useCallback(() => {
        history.push('/repos');
        setChosenRepo(false);
    }, [history]);

    return (
        <div>
            {repoListStore && repoListStore.meta === Meta.loading && <Loader><LoadIcon /></Loader>}
            {repoListStore && repoListStore.meta === Meta.error ? 
                <ErrorWindow /> :
                <RepoListContext.Provider value={{repoListStore: repoListStore}}>
                    <div>
                        <RepoList
                            inputValue={currentInputValue}
                            searchOnClick={searchOnClick}
                            onChangeInput={onChangeInputHandler} 
                            tileOnClick={redirectToDrawer}
                        />

                        <RepoBranchesDrawer visible={chosenRepo} onClose={redirectFromDrawer} />
                    </div>
                </RepoListContext.Provider>
            }
        </div>
    );
};

export default observer(RepoSearchPage);