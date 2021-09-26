import React from "react";

import ReposListStore from "@store/ReposListStore";
import { useLocalStore } from "@utils/useLocalStore";

type RepoListContextData = {
    repoListStore: undefined | ReposListStore,
};

const RepoListContextDataDefault: RepoListContextData = {
    repoListStore: undefined,
};

export const useRepoListContextData = (): RepoListContextData => {
    const [repoListStore] = React.useState(
        useLocalStore(() => new ReposListStore())
    );

    return React.useMemo(() => ({repoListStore}), [repoListStore]);
}

export const RepoListContext = React.createContext<RepoListContextData>(RepoListContextDataDefault);
export const useRepoListContext = () => React.useContext(RepoListContext);

export const RepoListContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const data = useRepoListContextData();
    
    return (
        <RepoListContext.Provider value={{repoListStore: data.repoListStore}}>
            {children}
        </RepoListContext.Provider>
    );
}