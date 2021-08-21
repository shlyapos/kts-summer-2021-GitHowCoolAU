import { IGitHubStore } from "./types";

import ApiStore from "@ApiStore/index";
import { RequestParams, HTTPMethod } from "src/shared/store/ApiStore/types";

export default class GitHubStore implements IGitHubStore {
    private apiStore: ApiStore = new ApiStore();

    getRepositoriesByUsername(username: string): Promise<any> {
        const requestBody: RequestParams<string> = {
            method: HTTPMethod.get,
            endpoint: `users/${username}/repos`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: username
        };

        return this.apiStore.request(requestBody);
    }
};