export type GitHubRepoOwnerApi = {
    login: string,
    avatar_url: string,
    html_url: string,
    name: string
};


export type GitHubRepoOwnerModel = {
    login: string,
    avatarUrl: string,
    htmlUrl: string,
    name: string
};


export const normalizeGitHubRepoOwner = (from: GitHubRepoOwnerApi): GitHubRepoOwnerModel => ({ 
    login: from.login, 
    avatarUrl: from.avatar_url,
    htmlUrl: from.html_url,
    name: from.name
});