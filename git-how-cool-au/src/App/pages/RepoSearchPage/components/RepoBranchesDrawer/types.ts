import { RepoItemProps } from "@components/RepoItem";

export type RepoBranchesDrawerProps = {
    visible: boolean,
    chosenRepo: null | RepoItemProps,
    onClose: () => void
};

export type RepoBranchesResponseSuccess = {
    name: string
};

export type RepoBranchesResponseError = {
    message: string
};

export type RepoBranchListItem = {
    id: number,
    name: string
};