import React from "react";

import { RepoListItem } from "./types";

type RepoListContext = {
    list: null | RepoListItem[],
    isLoading: boolean,
    load: (state: boolean) => void,
    isAllLoad: boolean
};

const ReposListContext = React.createContext<RepoListContext>({
    list: null,
    isLoading: true,
    load: (state: boolean) => { },
    isAllLoad: false
});

export const useRepoListContext = () => React.useContext(ReposListContext);
export const RepoListProvider = ReposListContext.Provider;