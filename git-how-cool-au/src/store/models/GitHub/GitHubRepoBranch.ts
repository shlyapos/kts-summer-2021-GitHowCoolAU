export type GitHubRepoBranchApi = {
  name: string;
};

export type GitHubRepoBranchModel = {
  name: string;
};

export const normalizeGitHubRepoBranch = (
  from: GitHubRepoBranchApi
): GitHubRepoBranchModel => ({
  name: from.name,
});
