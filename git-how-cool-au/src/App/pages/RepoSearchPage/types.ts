import { RepoItemProps } from "@components/RepoItem";

export type RepoListItem = {
    id: string,
    props: RepoItemProps
};

export type ReposInfoResponseSuccess = {
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

export type ReposInfoResponseError = {
    message: string
};

export type RepoListContext = {
    list: null | RepoListItem[],
    isLoading: boolean,
    load: (state: boolean) => void,
    isAllLoad: boolean
};