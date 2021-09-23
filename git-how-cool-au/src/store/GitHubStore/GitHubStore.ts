import ApiStore, { ApiResponse } from "@shared/store/ApiStore";
import { RequestParams, HTTPMethod } from "@shared/store/ApiStore";

import { IGitHubStore } from "./types";

export default class GitHubStore implements IGitHubStore {
    private apiStore: ApiStore = new ApiStore();

    async getUser(username: string): Promise<ApiResponse<any, any>> {
        const requestBody: RequestParams<string> = {
            method: HTTPMethod.get,
            endpoint: `users/${username}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: username
        };

        return await this.apiStore.request(requestBody);
    }

    async getRepo(username: string, page: number, perPage: number): Promise<ApiResponse<any, any>> {
        const requestBody: RequestParams<string> = {
            method: HTTPMethod.get,
            endpoint: `users/${username}/repos?page=${page}&per_page=${perPage}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: username
        };

        return await this.apiStore.request(requestBody);
    }

    async getRepoBranches(username: string, reponame: string): Promise<ApiResponse<any, any>> {
        const requestBody: RequestParams<string> = {
            method: HTTPMethod.get,
            endpoint: `repos/${username}/${reponame}/branches`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: `/${username}/${reponame}`
        };

        return await this.apiStore.request(requestBody);
    }
};