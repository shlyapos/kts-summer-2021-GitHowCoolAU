import { RepoItemProps } from "@components/RepoItem";

export type RepoListItem = {
    id: string,
    props: RepoItemProps
};

export type RepoListContextType = {
    list: null | RepoListItem[],
    isLoading: boolean,
    isAllLoaded: boolean
};