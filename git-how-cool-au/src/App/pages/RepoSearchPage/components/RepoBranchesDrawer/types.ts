import { RepoItemProps } from "@components/RepoItem";
import React from "react";

export type RepoBranchesDrawerProps = {
    visible: boolean,
    onClose: () => void
};

export type RepoBranchesResponseSuccess = {
    name: string
};

export type ResponseError = {
    message: string
};

export type RepoOwner = {
    login: string,
    avatar_url: string,
    html_url: string,
    name: string
};

export type RepoBranchListItem = {
    id: number,
    name: string
};