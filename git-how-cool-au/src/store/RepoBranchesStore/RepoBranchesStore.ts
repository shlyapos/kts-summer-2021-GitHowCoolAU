import { GitHubRepoBranchApi, GitHubRepoBranchModel, normalizeGitHubRepoBranch } from "store/models/GitHub";
import { CollectionModel, getInitialCollectionModel } from "store/models/shared/collection";
import rootStore from "store/RootStore";
import { ApiResponse, HTTPMethod, ResponseError } from "store/RootStore/ApiStore";
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";
import { action, makeObservable, observable, runInAction } from "mobx";

import { GitHubGetBranchParams } from "./types";

type PrivateFields = '_list' | '_meta';

export default class RepoBranchesStore implements ILocalStore {
    private _list: CollectionModel<number, GitHubRepoBranchModel> = getInitialCollectionModel();
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<RepoBranchesStore, PrivateFields>(this, {
            _list: observable.ref,
            _meta: observable,

            updateBranchList: action,
            destroy: action
        })
    }

    get list(): GitHubRepoBranchModel[] {
        return this._list.order.map(id => this._list.entities[id]);
    }

    get meta(): Meta {
        return this._meta;
    }

    async updateBranchList(params: GitHubGetBranchParams): Promise<void> {
        this._list = getInitialCollectionModel();
        this._meta = Meta.loading;
        
        const response: ApiResponse<GitHubRepoBranchApi[], ResponseError> = await rootStore.apiRequest({
            method: HTTPMethod.get,
            endpoint: `repos/${params.owner}/${params.repo}/branches`,
            headers: { 'Content-Type': 'application/json' },
            data: {}
        })

        runInAction(() => {
            if (!response.success) {
                this._meta = Meta.error;
                return;
            }

            try {
                const tempList = getInitialCollectionModel();
                let index = 1;

                for (const item of  response.data) {
                    tempList.order.push(index);
                    tempList.entities[index] = normalizeGitHubRepoBranch(item);

                    index++;
                }

                this._list = tempList;
                this._meta = Meta.success;

                return;
            } catch (err) {
                this._meta = Meta.error;
                this._list = getInitialCollectionModel();
            }
        })
    }
    
    destroy(): void {
        this._list = getInitialCollectionModel();
    }
}