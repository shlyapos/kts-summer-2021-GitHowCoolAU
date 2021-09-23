import React from "react";

import { gitHubApp } from "@root/root";
import { ApiResponse, ResponseError } from "@shared/store/ApiStore";
import { formatDate } from "@utils/DateProcessing";

import { RepoListItem } from "./types";

type RepoListContext = {
    list: null | RepoListItem[],
    isLoading: boolean,
    isAllLoad: boolean,
    load: (owner: string) => void
};


export type RepoResponse = {
    id: string,
    name: string,
    owner: {
        login: string,
        html_url: string,
        avatar_url: string,
    },
    stargazers_count: string,
    updated_at: string
};

const ReposListContext = React.createContext<RepoListContext>({
    list: null,
    isLoading: true,
    load: () => { },
    isAllLoad: false
});

export const useRepoListContext = () => React.useContext(ReposListContext);
export const RepoListProvider = ReposListContext.Provider;