import {
  GitHubRepoOwnerApi,
  GitHubRepoOwnerModel,
  normalizeGitHubRepoOwner,
} from "./GitHubRepoOwner";

export type GitHubRepoItemApi = {
  id: number;
  name: string;
  owner: GitHubRepoOwnerApi;
  stargazers_count: number;
  pushed_at: string;
};

export type GitHubRepoItemModel = {
  id: number;
  name: string;
  owner: GitHubRepoOwnerModel;
  stargazersCount: number;
  pushedAt: Date;
};

export const normalizeGitHubRepoItem = (
  from: GitHubRepoItemApi
): GitHubRepoItemModel => ({
  id: from.id,
  name: from.name,
  owner: normalizeGitHubRepoOwner(from.owner),
  stargazersCount: from.stargazers_count,
  pushedAt: new Date(from.pushed_at),
});
