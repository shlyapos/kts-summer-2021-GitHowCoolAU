import { RepoItemProps } from "@components/RepoItem";

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

export type RepoListItem = {
    id: string,
    props: RepoItemProps
};

export type RepoListContextType = {
    list: null | RepoListItem[],
    isLoading: boolean,
    isAllLoaded: boolean
};